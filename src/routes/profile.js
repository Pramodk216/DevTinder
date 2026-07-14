const express = require("express");
const {authAdmin} = require("../middlewares/auth")

const profileRouter = express.Router();

profileRouter.get("/profile", authAdmin,  async (req, res) => {
    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send("Error" + err);
    }   
})


module.exports = profileRouter;