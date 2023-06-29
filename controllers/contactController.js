const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@desc get all contacts 
//@route get /api/contacts
//@access private

const getContacts= asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc create new contacts 
//@route post /api/contacts
//@access private
const createContact=asyncHandler(async (req,res)=>{
    console.log("the body is",req.body);
    const{name,email,phone}=req.body;
    if(!name ||!email ||!phone){
        res.status(400);
        throw new Error ("All entries are mandatory");
    }

    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//@desc get contact
//@route get /api/contacts/:id
//@access private
const getContact= asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
//@desc delete  contacts 
//@route delete /api/contacts/:id
//@access private
const deleteContact= asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to delete contacts of other users");
    }
    
    await contact.deleteOne({_id:req.params.id});
    res.status(201).json(contact);
});
//@desc update  contacts 
//@route put /api/contacts/:id
//@access private

const updateContact= asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id);
    console.log(contact);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update contacts of other users");
    }

    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true }
    );

    res.status(200).json(updatedContact);
});
module.exports={
    getContact,
    createContact,
    updateContact,
    getContacts,
    deleteContact
};