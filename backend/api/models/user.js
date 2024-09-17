import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    Unique:true
    
  },
  email: {
    type: String,
    required: true,
    
  },
  phone: {
    type: Number,
    required: true,

  },
  country: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
