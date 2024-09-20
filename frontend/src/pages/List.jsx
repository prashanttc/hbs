import ReplayIcon from '@mui/icons-material/Replay';
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Searchitem from "../components/Searchitem";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import useFetch from "../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [option, setOption] = useState(location.state.option);
  const [openDate, setOpenDate] = useState(false);
  const { data, loading, error, reFetch } = useFetch(
    `https://hbs-a2w9.onrender.com/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999999}`
  );

  const handleclick = () => {
    reFetch(); // Call reFetch only on button click
  };

  const handleOption = (name) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: option[name], // Keep using the correct state update logic
      };
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Search Box */}
          <div className="searchbox bg-gray-900 text-white rounded-3xl p-6 md:w-[25vw] md:sticky md:top-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">Search</h1>
            <div className="mb-6">
              <label className="text-xl font-semibold">Destination:</label>
              <input
                className="h-12 w-full mt-2 rounded-md pl-4 placeholder:text-black text-lg text-black"
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
              />
            </div>
            <div className="mb-6">
              <label className="text-xl font-semibold">Check-in Date:</label>
              <div className="h-12 mt-2 flex items-center w-full bg-white rounded-md">
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="cursor-pointer font-semibold text-lg text-black pl-4"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
                </span>
              </div>
              {openDate && (
                <DateRange
                  className="w-full md:w-[24vw]"
                  moveRangeOnFirstSelection={false}
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  range={date}
                />
              )}
            </div>
            <div>
              <h2 className="text-xl text-slate-900 font-bold mb-6">Options</h2>
              <div className="flex justify-between items-center mb-4">
                <label className="text-white font-semibold">Min Price</label>
                <input
                  min={1}
                  className="h-10 w-[40%] md:w-[50%] pl-2 cursor-pointer rounded-sm placeholder:text-black text-black"
                  type="number"
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <label className="text-white font-semibold">Max Price</label>
                <input
                  min={1}
                  className="h-10 w-[40%] md:w-[50%] pl-2 cursor-pointer text-black rounded-sm placeholder:text-black"
                  type="number"
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleclick}
                className="w-full bg-blue-700 text-white text-lg font-semibold h-12 rounded-lg mt-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
          {loading ? (
              <p>Loading...</p>
            ) : data.length === 0 ? ( // Check if no hotels are found
              <p className='text-2xl mt-[10%] ml-[10%]'>No hotels found for the selected destination<ReplayIcon/></p>
            ) : (
              data.map((item) => <Searchitem item={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
