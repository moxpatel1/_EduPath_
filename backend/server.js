const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://patelmox25_db_user:Mox_04%402006%40@acpc-cluster.56kqyx6.mongodb.net/acpc")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.get("/", (req,res)=>{
    res.send("ACPC Predictor Backend Running");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});