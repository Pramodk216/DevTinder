const express = require("express");
const {authAdmin} = require("../middlewares/auth")
const { validateEditdata, validatePassword} = require("../utils/validator");
const validator = require("validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", authAdmin,  async (req, res) => {
    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send("Error" + err);
    }   
})
profileRouter.patch("/profile/edit", authAdmin,  async (req, res) => {
    try{

        if(validateEditdata(req)){
            const loggedInUser = req.user;

            Object.keys(req.body).forEach( key => loggedInUser[key] = req.body[key]);

            await loggedInUser.save();

            res.send(`${loggedInUser.firstName} profile is updated now`);
        }else{
            throw new Error("One or more fields are not Valid");
        }
    }catch(err){
        res.status(400).send("Error" + err);
    }   
})

profileRouter.post("/profile/password", authAdmin,  async (req, res) => {
    try{

        if(validatePassword(req)){
            const newPassword = req.body.password;
            
            if(validator.isStrongPassword(newPassword)){
                const loggedInUser = req.user;

                const passwordHash = await bcrypt.hash(newPassword, 10);

                loggedInUser.password = passwordHash;

                await loggedInUser.save();

                res.send(`${loggedInUser.firstName} password is updated now`);
            }else{
                throw new Error("password is weak");
            }
        }else{
            throw new Error("password filed is missing");
        }
    }catch(err){
        res.status(400).send("Error" + err);
    }   
})


module.exports = profileRouter;