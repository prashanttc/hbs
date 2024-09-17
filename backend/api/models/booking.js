import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
  hotelname: {
    type: String
  },
  roomname: {
    type: String,
  },
  roomId: {
    type: [String],
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  endate: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Booking", BookingSchema);
