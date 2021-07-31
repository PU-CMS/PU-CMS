const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyparser.urlencoded());
app.use(bodyparser.urlencoded({
    extended:true
}))
const home = fs.readFileSync('index.html')
const complaint = fs.readFileSync('./complaint.html')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pucms', { useNewUrlParser: true, useUnifiedTopology: true });


//Defining mongoose schema
const complaintSchema = new mongoose.Schema({
    roll: String,
    name: String,
    department: String,
    gender: String,
    post: String,
    subject: String,
    details: String,
    success: Boolean
});

const complaints = mongoose.model('complaints', complaintSchema);
app.get("/", (req, res)=>{ 
    res.end(home);
});

app.get("/complaint", (req, res)=>{ 
    res.end(complaint);
});
app.post("/complaint", (req, res)=>{ 
    var myData = new complaints(req.body);
    console.log(myData)
    console.log(req.body)
    myData.save().then(()=>{
        res.send("This item has been saved into Database")
    })
    // res.end(complaint);
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});