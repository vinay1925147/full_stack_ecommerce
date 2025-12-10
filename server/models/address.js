import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({

    userId: String,
    name: String,
    city: String,
    pincode:String,
    phone:String,
    address:String
},{timeStamps :true});
const Address = mongoose.model("Address" , addressSchema)