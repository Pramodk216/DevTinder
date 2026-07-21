const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authAdmin = async(req, res, next) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            return res.status(401).send("No token provided");
        }
        const decoded = await jwt.verify(token, "MY_WEB_TOKEN_SECRET");
        const {_id} = decoded;
        const user = await User.findById(_id);
        req.user = user;
        next();
    }catch(err){
        return res.status(401).send("Error" + err);
    }
}

module.exports = {
    authAdmin
};