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

module.exports = { validateSignUpData };