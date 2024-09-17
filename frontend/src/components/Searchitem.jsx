import React from 'react';
import { Link } from 'react-router-dom';

const Searchitem = ({ item }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-4">
      <div className="border-2 mb-5 border-slate-700/50 p-5 gap-5 md:gap-10 flex flex-col md:flex-row rounded-lg cursor-pointer">
        <img
          className="rounded-xl w-full h-[200px] object-cover md:w-[27%] md:h-[15vw]"
          src={item.photos[0]}
          alt=""
        />
        <div className="w-full md:w-[40%] flex flex-col">
          <h1 className="font-bold text-blue-500 mb-3 text-2xl md:text-3xl">{item.name}</h1>
          <span className="text-md font-semibold text-slate-500">{item.distance}</span>
          <span className="text-md font-semibold ml-5 text-slate-500">{item.city}</span>
          <div className="bg-green-700 mt-3 text-white h-8 items-center rounded-lg flex justify-center px-3 md:px-5">
            Free Airport Taxi
          </div>
          <h4 className="font-md mt-3 text-md">{item.title}</h4>
          <h4 className="font-bold mt-3 text-green-700 text-md">Free Cancellation</h4>
          <h4 className="font-md mt-3 text-green-600 text-md">
            You can cancel later, so lock in this great price today!
          </h4>
        </div>
        <div className="w-full md:w-[30%] flex flex-col items-start md:items-end mt-4 md:mt-0">
          <div className="flex gap-4 md:gap-[10vw] justify-between w-full">
            <h1 className="font-bold text-slate-600 text-xl md:text-2xl">Excellent</h1>
            <span className="rating p-2 text-md rounded-t-md rounded-br-md bg-blue-800 text-white">
              {item.rating}
            </span>
          </div>
          <div className="mt-4 flex flex-col items-start md:items-end w-full">
            <span className="font-bold text-xl md:text-2xl">₹{item.cheapestPrice}</span>
            <p className="text-md text-slate-600 mt-2">Includes taxes and fees</p>
            <Link to={`/hotels/${item._id}`}>
              <button className="bg-blue-800 text-white text-lg font-semibold h-10 mt-2 px-3 md:px-5 rounded-lg">
                See Availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchitem;
