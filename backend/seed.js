import mongoose from "mongoose";
import dotenv from "dotenv";
import College from "./models/College.js";
import data from "./data/colleges.json" assert { type: "json" };

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");

    await College.deleteMany(); // clear old data
    await College.insertMany(data);

    console.log("Data inserted successfully");
    process.exit();
  })
  .catch(err => console.log(err));