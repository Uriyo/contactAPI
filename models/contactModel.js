const mongoose=require('mongoose');

const contactSchema= mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        require:[true,"Please add contact name"],
    },
    email:{
        type:String,
        require:[true,"Please provide the email"],
    },
    Phone:{
        type:String,
        require:[true,"Please provide the contact"],
    },  
},
 {
    timestamps:true,
 }

);

module.exports=mongoose.model("Contact",contactSchema);