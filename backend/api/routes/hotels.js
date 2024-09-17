import express from 'express';
import { countbyCity, countbyType, deleteHotel, getHotel, getHotelRoom, getHotels, newHotel, updateHotel } from '../controllers/Hotel.js';

const router = express.Router();

// Create a new hotel
router.post('/',newHotel);

//update hotel
router.put('/:id' , updateHotel);

  //delete hotel
router.delete("/:id" , deleteHotel);

//get hotel
router.get('/find/:id', getHotel);

//get all hotel
router.get('/', getHotels);
router.get('/countbyCity', countbyCity);
router.get('/countbyType', countbyType);
router.get('/rooms/:id', getHotelRoom);

export default router;
