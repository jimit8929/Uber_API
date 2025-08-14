import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const captainSchema = new mongoose.Schema({
  fullname : {
    firstname : {
      type:String,
      required: true,
      minlength: [3 , "Firstname should be atleast 3 characters long"],
    },

    lastname : {
      type:String,
      required: true,
      minlength: [3 , "Lastname should be atleast 3 characters long"],
    }
  },

  email:{
    type:String,
    required: true,
    unique:true,
    lowercase:true,
    match:[/^\S+@\S+\.\S+$/, "Invalid email address"],
    minlength:[5 , "Email should be atleast 5 characters long"],
  },

  password : {
    type:String,
    required: true,
    select:false, //to not return password in responses
  },

  socketId : {
    type:String,
  },

  status:{
    type:String,
    enum : ["active" , "inactive"],
    default : "inactive",
  },

  vehicles : {
    color: {
      type : String,
      required : true,
      minlength : [3 , "Color should be atleast 3 characters long"]
    },
    plate : {
      type : String,
      required: true,
      minlength : [3 , "Plate should be atleast 3 characters long"]
    },
    capacity : {
      type:Number,
      required : true,
      minlength : [1 , "capacity should be atleast 1 characters long"]
    },
    vehicleType : {
      type : String,
      required:true,
      enum : ["car" , "motorcycle" , "auto"],
    },
  },

  location: {
    ltd:{
      type : Number,
    },
    lng:{
      type : Number,
    }
  }
})

captainSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id : this._id} , process.env.JWT_SECRET , {expiresIn: "24h"});
  return token;
}

captainSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password);
}

captainSchema.statics.hashPassword = async function(password){
  return bcrypt.hash(password , 10);
}


const captainModel = mongoose.model("captain" , captainSchema);

export default captainModel;