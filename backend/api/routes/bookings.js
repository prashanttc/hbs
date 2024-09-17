import express from"express";
import { NewBooking ,mybooking , cancelbooking, getbookings} from "../controllers/Booking.js";

const router = express.Router()

router.post("/",NewBooking)
router.get("/:userId",mybooking)
router.get("/",getbookings)
router.delete("/:id", cancelbooking)

export default router;