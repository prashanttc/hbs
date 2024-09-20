import User from '../models/user.js';

import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Adjust the import based on your file structure

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async( req, res, next)=>{
        try {
           await User.findByIdAndDelete(
            req.params.id,
          );
          res.status(200).json("User has been deleted");
        } catch (err) {
          next(err)
        }
}
export const getUser = async( req, res, next)=>{
    try {
        const user = await User.findById(
          req.params.id,
        );
        res.status(200).json(user);
      } catch (err) {
       next(err)
      }
}
export const getUsers = async( req, res, next)=>{
    try {
        const users = await User.find()
        res.status(200).json(users);
      } catch (err) {
        next(err)
      }
}