import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../context/SearchContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import "./reserve.css";
import Swal from "sweetalert2";
import useFetch from "../hooks/useFetch.js";

const Reserve = ({ setOpen, hotelId , hotelname}) => {
  const { data, loading, error } = useFetch(
    `https://hbs-a2w9.onrender.com/api/hotels/rooms/${hotelId}`
  );
  const { date } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const getdatesinrange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
  
    while (date <= end) {
      dates.push(new Date(date).toISOString().split('T')[0]); // Store the date as a string in ISO format
      date.setDate(date.getDate() + 1); // Move to the next day
    }
    return dates;
  };
  const alldates = getdatesinrange(date[0].startDate, date[0].endDate);
  const isavail = (roomNumbers) => {

    const isfound = roomNumbers.unavailableDates.some(date =>
      alldates.includes(new Date(date).toISOString().split('T')[0])
    );
    return !isfound;
  };

  const [selectedRoom, setSelectedRoom] = useState([]);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRoom.map(async (roomId) => {
          const res = await axios.put(
            `https://hbs-a2w9.onrender.com/api/rooms/availability/${roomId}`,
            {
              dates: alldates,
              
            },
          );
          return res.data;
        })
      );

      const bookingdetails = {
        userId: user.details._id,
        hotelId,
        hotelname:hotelname,
        roomId: selectedRoom,
        startdate: date[0].startDate,
        endate: date[0].endDate,
        username: user.details.username
      };
     
      await axios.post(
        "https://hbs-a2w9.onrender.com/api/bookings",
        bookingdetails
      );

      Swal.fire({
        title: "Success!",
        text: "Room has been booked succesfully.",
        icon: "success",
        timer: 2000, // 3 seconds
        showConfirmButton: false,
      });
      setOpen(false);
      navigate("/");
    } catch (err) {
      console.log(err); 
      Swal.fire({
        title: "Error!",
        text: "There was a problem with your booking. Please try again.",
        icon: "error",
        timer: 3000,
      });
    }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRoom(
      checked
        ? [...selectedRoom, value]
        : selectedRoom.filter((item) => item !== value)
    );
  };
  return (
    <div className="reserve">
      <div className="rcontainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="text-3xl rClose cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <span>Select your room:</span>
        {data.length > 0 ? (
          data.map((item) => (
            <div className="ritem" key={item._id}>
              <div className="info2 w-[70%]">
                <div className="riteminfo">
                  <div className="rtitle font-bold text-md">{item.title}</div>
                  <div className="rdesc">{item.desc}</div>
                  <div className="rmax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rprice">
                    price: <b>{item.price}</b>
                  </div>
                </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumbers) => (
                  <div className="room">
                    <label>{roomNumbers.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumbers._id}
                      onChange={handleSelect}
                      disabled={!isavail(roomNumbers)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>No rooms available</div>
        )}
        <button className="rButton" onClick={handleClick}>
          Reserve now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
