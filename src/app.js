const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {

    console.log(req.body);

    
   const user = new User(req.body);

   try{
    await user.save();
    res.send("User created successfully");
   }catch(err){
    res.status(400).send("User creation failed:" + err);
   }
});


app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try{
        const users = await User.find({ email: userEmail });

        if(users.length === 0){
            return res.status(404).send("User not found");
        }else{
          res.send(users);
        }
    }catch(err){
        res.status(400).send("User fetching failed:" + err);
    }
})


app.get("/feed", async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.status(400).send("User fetching failed:" + err);
    }
})

app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body

    try{
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


app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.status(200).send("User deleted successfully");
    }catch(err){
        res.status(400).send("User deletion failed:", err);
    }
})

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log("MongoDB connection failed");
});