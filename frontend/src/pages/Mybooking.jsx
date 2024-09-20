import React, { useContext, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch user bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = user.details._id;
        const response = await axios.get(
          `https://hbs-a2w9.onrender.com/api/bookings/${userId}`
        );
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle cancellation of booking
  const handleCancelBooking = async (bookingId) => {
      try {
      await axios.delete(`https://hbs-a2w9.onrender.com/api/bookings/${bookingId}`);
      setBookings((prevBookings) => 
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      Swal.fire({
        title: "Success!",
        text: "booking has been cancelled succesfully.",
        icon: "success",
        timer: 2000, // 3 seconds
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking.");
    }
  };

  const columns = [
    { field: "_id", headerName: "Booking ID", width: 200 },
    { field: "hotelname", headerName: "Hotel Name", width: 150 },
    { field: "roomId", headerName: "Room", width: 120 },
    { field: "startdate", headerName: "Check-In", width: 150 },
    { field: "endate", headerName: "Check-Out", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <button
          className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:via-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 justify-items-center flex items-center mt-1 h-10"
          onClick={() => handleCancelBooking(params.row._id)}
        >
          Cancel Booking
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Bookings</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <DataGrid
          rows={bookings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={(row) => row._id}
          className="datagrid"
        />
      </div>
    </div>
  );
};

export default Mybooking;
