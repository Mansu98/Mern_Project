const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const mernCollection = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:[3, "Minimum 3 letters required"] 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please Enter a Valid Email Address");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[8, "Minimum 8 characters required"] 
    },
    cpassword:{
        type:String,
        required:true,
        trim:true,
        minlength:[8, "Minimum 8 characters required"] 
    }



})

mernCollection.pre("save", async function(next){
    if(this.isModified("password")){
       
        
        console.log(`Without Hashing Password: ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`With Hashing Password: ${this.password}`);

        this.cpassword = undefined;

    }
next();
})

const MernCollection = new mongoose.model("MernCollection", mernCollection);
module.exports = MernCollection;

