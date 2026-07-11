const express = require('express');

const app = express();

app.use("/", (req, res, next) => {
    console.log("Root Route handler");
    next();
})

app.use("/user", (req, res, next) => {
    console.log("First Route handler");
    next();
    // res.send("Response");
})

app.use("/user", (req, res, next) => {
    console.log("Second Route handler");
    next();
})

app.use("/user", (req, res, next) => {
    console.log("Second Route handler");
    res.send("3rd Response");
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});