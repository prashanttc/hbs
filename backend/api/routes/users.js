import express from 'express';
import { getUser, getUsers, deleteUser, updateUser } from '../controllers/User.js';
const router = express.Router();


//update hotel
router.put('/:id' , updateUser);

  //delete hotel
router.delete("/:id" , deleteUser);

//get hotel
router.get('/:id' , getUser);

//get all hotel
router.get('/', getUsers);
export default router;
