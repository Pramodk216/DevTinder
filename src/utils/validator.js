const validator = require('validator');

const validateSignUpData = (req) => {
    if(!req.body.email || !req.body.password || !req.body.firstName){
        throw new Error('Missing required fields');
    }
    if(!validator.isEmail(req.body.email)){
        throw new Error('Invalid email');
    }
    if(!validator.isStrongPassword(req.body.password)   ){
        throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character');
    }
}

const validateEditdata = (req) => {

    const allowedEditFields = ["firstName", "lastName", "email", "age","gender", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every(key => allowedEditFields.includes(key));
    return isEditAllowed; 
}


const validatePassword = (req) => {

    const allowedEditFields = ["password"];

    const isEditAllowed = Object.keys(req.body).some(key => allowedEditFields.includes(key));
    return isEditAllowed; 
}

module.exports = { validateSignUpData, validateEditdata, validatePassword };