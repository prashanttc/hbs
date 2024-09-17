import express from 'express';
import {createRoom , updateRoom , getRooms , getRoom , deleteRoom, updateRoomavailability} from "../controllers/Room.js"


const router = express.Router();

// Create a new room
router.post('/:hotelid' ,createRoom);

//update room
router.put('/:id' , updateRoom);
router.put('/availability/:id' , updateRoomavailability);

  //delete room
router.delete("/:id" , deleteRoom);

//get room
router.get('/:id', getRoom);

//get all room
router.get('/', getRooms);

export default router;
