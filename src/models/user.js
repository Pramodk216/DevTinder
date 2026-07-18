const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(password){
            if(!validator.isStrongPassword(password)){
                throw new Error("Invalid password");
            }
        },
    },
    age: {
        type: Number,
        min: 18,
        max: 150,
    },
    gender: {
        type: String,
        validate(type){
            if(["male", "female", "other"].includes(type)){
                return true;
            }
            throw new Error("Gender must be male, female or other");
        }
    },

    about: {
        type: String,
        default: "This is me.",
    },
    skills: {
        type: [String],
    }
}, {
    timestamps: true,
});

userSchema.methods.getJWT = async function(){
    const user = this;
    return jwt.sign({ _id: user._id}, "MY_WEB_TOKEN_SECRET", { expiresIn: "1h" });
}


userSchema.methods.validatePassword = async function(userEnteredPassword){
    const user = this;
    return await bcrypt.compare(userEnteredPassword, user.password);
}


module.exports = mongoose.model("User", userSchema);