const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 50,
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
});


module.exports = mongoose.model("User", userSchema);