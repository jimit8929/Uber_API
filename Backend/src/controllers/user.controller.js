
import {validationResult} from "express-validator";
import userModel from "../models/user.model.js"
import { createUser } from "../services/user.services.js";

export const registerUser = async (req , res) => {
   console.log("register route hit");
  try{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }

    const {fullname , email , password} = req.body;
    if (!fullname || !fullname.firstname || !fullname.lastname) {
      return res.status(400).json({ message: "fullname.firstname and fullname.lastname are required" });
    }


    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
      return res.status(400).json({message : "User already Exists"});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstname : fullname.firstname,
      lastname : fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({user , token});
  }
  catch(error){
    console.log(error);
    res.status(500).json({message : error.message});
  }
}


