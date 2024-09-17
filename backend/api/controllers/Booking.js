import Booking from "../models/booking.js";
import Room from "../models/room.js";

export const NewBooking = async (req, res, next) => {
  try {
    const NewBooking = new Booking(req.body);
    const savedBooking = await NewBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

export const mybooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find({userId:req.params.userId})
    res.status(200).json(bookings)
  } catch (err) {
    next(err);
  }
};

export const cancelbooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    const { roomId, startdate, endate } = booking; // Assuming booking contains roomIds
    const datesToRemove = getDatesInRange(startdate, endate);

    await Promise.all(
      roomId.map(async (roomId) => {
        const room = await Room.findOne({ "roomNumbers._id": roomId });
        if (!room) {
          return res.status(404).send(`Room with ID ${roomId} not found`);
        }
        const roomNumber = room.roomNumbers.id(roomId);
        if (!roomNumber) {
          return res.status(404).send(`Room number ${roomId} not found in the room`);
        }

        // Remove dates from unavailableDates
        roomNumber.unavailableDates = roomNumber.unavailableDates.filter(
          (date) => !datesToRemove.includes(date)
        );

        await room.save();
      })
    );

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).send("Booking cancelled and dates updated");
  } catch (err) {
    next(err);
  }
};

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const date = new Date(start.getTime());
  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).toISOString().split('T')[0]); // Store as string
    date.setDate(date.getDate() + 1); // Move to the next day
  }
  return dates;
};

export const getbookings = async (req, res, next) => {
  try {
    const booking = await Booking.find();
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};