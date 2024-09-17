import Hotel from "../models/hotel.js";
import Room from "../models/room.js";

export const newHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatehotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatehotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  try {
    // Construct price filter conditionally
    let priceFilter = {};
    if (min || max) {
      priceFilter = {
        cheapestPrice: {
          ...(min && { $gt: min }),
          ...(max && { $lt: max }),
        },
      };
    }

    const hotels = await Hotel.find({
      ...others,
      ...priceFilter,
    });

    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countbyCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countbyType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "cabin", count: cabinCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
