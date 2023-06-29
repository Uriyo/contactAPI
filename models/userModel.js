const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please add contact name"],
    },
    email:{
        type:String,
        require:[true,"Please provide the email"],
        unique:[true,"Email already taken"]
    },
    password:{
        type:String,
        require:[true,"Please provide the password"],
    },  
}, 
{
    timestamps: true,
}
);
module.exports= mongoose.model("User",userSchema);