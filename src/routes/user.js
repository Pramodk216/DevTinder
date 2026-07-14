const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body

    try{
        const allowedFields = ["firstName", "lastName", "gender", "age", "about", "skills"];

        const isValidUpdateFields = Object.keys(data).every(field => allowedFields.includes(field));

        if(!isValidUpdateFields){
            return res.status(400).send("Invalid update fields");
        }
        if(data.skills.length > 10){
            return res.status(400).send("Skills must be less than 10");
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        console.log(updatedUser);
        res.status(200).send("User updated successfully");
    }catch(err){
        res.status(400).send("User update failed:" + err);
    }
})


userRouter.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.status(200).send("User deleted successfully");
    }catch(err){
        res.status(400).send("User deletion failed:", err);
    }
})


module.exports = userRouter;