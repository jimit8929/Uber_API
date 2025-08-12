// services/user.services.js
import userModel from "../models/user.model.js";

export const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("ALL fields are required");
  }

  const user = await userModel.create({
    fullname: { firstname, lastname }, // <<< important: create fullname subdoc
    email,
    password
  });

  return user;
};
