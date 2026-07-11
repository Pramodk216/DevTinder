const express = require('express');
const { authAdmin, authUser } = require('./middlewares/auth');

const app = express();

app.use("/admin", authAdmin);



app.post("/user/login", (req, res, next)=>{
    console.log("User login");
    res.send("User is logged in");
});

app.get("/user/data", authUser, (req, res, next)=> {
    console.log("User data");
    res.send("Get all User Data");
});

app.get("/admin/getAllData", (req, res, next) => {
    console.log("getAllData Route handler");
    res.send("Get all data");
})

app.delete("/admin/deleteUser", (req, res, next) => {
    console.log("deleteUser Route handler");
    res.send("Delete a user");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});