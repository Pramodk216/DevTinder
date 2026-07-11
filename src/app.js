const express = require('express');

const app = express();

app.use("/user", (req, res, next) => {
    console.log("First Route handler");
    next();
    // res.send("Response");
}, [(req, res, next) => {
    console.log("Second Route handler");
    next();
    // res.send("2nd response");
}, (req, res, next) => {
    console.log("Third Route handler");
    next();
    // res.send("3rd response");
}], (req, res, next) => {
    console.log("Fourth Route handler");
    next();
    // res.send("4th response");
}, (req, res, next) => {
    console.log("Fifth Route handler");
    res.send("5th Response");
   
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});