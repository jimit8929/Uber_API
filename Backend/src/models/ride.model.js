import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },

  captain:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"captain",
    required:true,
  },

  pickup:{
    type:String,
    required:true,
  },

  destination : {
    type:String,
    required:true,
  },

  fare:{
    type:Number,
    required:true,
  },

  status:{
    type:String,
    enum:["pending" , "accepted" , "cancelled" , "completed" , "ongoing"],
  },

  duration:{
    type:Number,
  },

  distance:{
    type:Number,
  },

  paymentId:{
    type:String,
  },

  orderId:{
    type:String,
  },

  signature:{
    type:String,
  },

  otp:{
    type:String,
    select:false,
    required:true
  }

},{timestamps:true});


const rideModel = mongoose.model("ride" , rideSchema);

export default rideModel;