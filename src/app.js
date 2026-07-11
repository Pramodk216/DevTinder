const express = require('express');

const app = express();


//  '/ab*c' will match '/abc', only thing between ab and c is matched
//  /.*fly$/  any route that ends with fly
// /a/  any route that contains a
// /ab?c/  b is opional
// /ab+c/  b is required and can be repeated
// //a(bc)?c  bc is optional
app.get(/a(bc)?d/,  (req,res) => {
    res.send("Advanced route");
})

app.get('/user/:id/:status',  (req,res) => {
    console.log(req.params.id);
    console.log(req.params.status);
    console.log(req.query);
    res.send("Advanced route");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});