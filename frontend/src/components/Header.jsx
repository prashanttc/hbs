import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import {AuthContext} from"../context/AuthContext.jsx"
import { format } from "date-fns";
import {
  faBed,
  faPlane,
  faTaxi,
  faCar,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../context/SearchContext.jsx";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Header = ({ type }) => {
  const{user} = useContext(AuthContext)
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const HandleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, date, option } });
    navigate("/hotels", { state: { destination, date, option } });
  };

  return (
    <div>
      <div className="headerListText w-full relative bg-gray-900 text-white pb-[10vw] p-10 sm:pb-[6vw] sm:px-[10%]">
        <ul className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full sm:w-[70vw] justify-center sm:justify-start hover:cursor-pointer">
          <li className="flex gap-3 p-2 sm:p-3 items-center justify-center border-2 text-lg sm:text-xl px-3 sm:px-5 rounded-[100px] border-white">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </li>
          <li className="flex gap-3 p-2 sm:p-3 items-center justify-center text-lg sm:text-xl px-3 sm:px-5 hidden md:block">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </li>
          <li className="flex gap-3 p-2 sm:p-3 items-center justify-center text-lg sm:text-xl px-3 sm:px-5  hidden md:block">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </li>
          <li className="flex gap-3 p-2 sm:p-3 items-center justify-center text-lg sm:text-xl px-3 sm:px-5  hidden md:block">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </li>
          <li className="flex gap-3 p-2 sm:p-3 items-center justify-center text-lg sm:text-xl px-3 sm:px-5 hidden md:block">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airports Taxi</span>
          </li>
        </ul>

        {type !== "list" && type !== "hotel" && (
          <>
            <div className="mt-10 sm:mt-20 text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl mb-5 sm:mb-10 font-semibold">
                A Lifetime of Discounts? It's Genius.
              </h1>
              <p className="text-xl sm:text-2xl mb-5">
                Get rewarded for your travels - unlock instant savings of 10% or
                more with a free anywhere account.
              </p>
            {!user &&(
                <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2"
                >
                  Sign In
                </button>
              </Link>
            )}
            </div>

            <div className="searchbox flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-10 border-2 border-yellow-400 items-center px-5 sm:px-[5vw] bg-white py-3 sm:py-5 w-[90%] sm:w-[80%] m-auto mt-8 sm:mt-16 rounded-lg">
              <div className="where flex items-center gap-2 cursor-pointer">
                <FontAwesomeIcon
                  className="text-slate-600 text-xl"
                  icon={faBed}
                />
                <input
                  className="border-none w-full sm:w-auto placeholder:text-slate-900 text-slate-950 focus:outline-none"
                  type="text"
                  onChange={(e) => setDestination(e.target.value.toLocaleLowerCase())}
                  placeholder="Where are you going?"
                />
              </div>  
              <div className="date flex items-center gap-2 cursor-pointer relative">
                <FontAwesomeIcon
                  className="text-slate-600 text-xl"
                  icon={faCalendarDays}
                />
                <span className="text-slate-900" onClick={() => setOpenDate(!openDate)}>
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    className="absolute z-10 top-12 left-0 sm:left-auto sm:bottom-auto"
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              <div className="person flex items-center gap-2 cursor-pointer relative">
                <FontAwesomeIcon
                  className="text-slate-600 text-xl"
                  icon={faPerson}
                />
                <span className="text-slate-950" onClick={() => setOpenOptions(!openOptions)}>
                  {`${option.adult} adult · ${option.children} children · ${option.room} room`}
                </span>
                {openOptions && (
                  <div className="absolute z-10 bg-white text-slate-900 p-5 rounded-lg shadow-md mt-2">
                    <div className="flex justify-between items-center mb-4">
                      <span>Adult</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={option.adult <= 1}
                          className="border-2 disabled:cursor-not-allowed px-2 border-blue-300"
                          onClick={() => HandleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span>{option.adult}</span>
                        <button
                          className="border-2 px-2 border-blue-300"
                          onClick={() => HandleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span>Children</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={option.children <= 0}
                          className="border-2 disabled:cursor-not-allowed px-2 border-blue-300"
                          onClick={() => HandleOption("children", "d")}
                        >
                          -
                        </button>
                        <span>{option.children}</span>
                        <button
                          className="border-2 px-2 border-blue-300"
                          onClick={() => HandleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Room</span>
                      <div className="flex items-center gap-2">
                        <button
                          disabled={option.room <= 1}
                          className="border-2 disabled:cursor-not-allowed px-2 border-blue-300"
                          onClick={() => HandleOption("room", "d")}
                        >
                          -
                        </button>
                        <span>{option.room}</span>
                        <button
                          className="border-2 px-2 border-blue-300"
                          onClick={() => HandleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={!destination.trim()}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-2"
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
