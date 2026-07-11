const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.post("/signup", async (req, res) => {
    
   const user = new User({
    firstName: "Iron",
    lastName: "Man",
    email: "ironman@gmail.com",
    password: "ironman@123",
    age: 40,
    gender: "Male"
   })

   try{
    await user.save();
    res.send("User created successfully");
   }catch(err){
    res.status(400).send("User creation failed:", err);
   }
});

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.log("MongoDB connection failed");
});