const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            minlength: 3,
            maxlength: 50,
        },
        lastname: {
            type: String,
            required: [true, 'Please provide a lastname'],
            minlength: 3,
            maxlength: 50,
        },
        cellphone_number: {
            type: String,
            required: [true, 'Please provie a cellphone number'],
            minlength: 10,
            maxlength: 13
        },
        username: {
            type: String,  
            unique: true,
            required: [true, 'Please provide username'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            require: true,
            unique: true,
            required: [true, 'please provide email'],
            validate:{
                validator: validator.isEmail,
                message: 'Please provide a valid email',
            }
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            minlength: 6,
        },
        role:{
            type: String,
            enum:['admin', 'user', 'influencer'],
            default: 'user',
        },
        img: {
            type: String,
        }
    },
    {timestamps: true}
);

//this is a pre create for password
UserSchema.pre('save', async function(){
    
    //this helps us to not create new password hashed if it not modified.
    if(!this.isModified('password')){
        return
    } 
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("User", UserSchema);