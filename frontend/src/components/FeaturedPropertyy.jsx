import React from "react";
import useFetch from "../hooks/useFetch";

const FeaturedPropertyy = () => {
  const { data, loading } = useFetch(
    "https://hbs-a2w9.onrender.com/api/hotels?featured=true"
  );
  console.log(data);
  return (
    <div className="mx-5 md:mx-[10%] mt-8"> {/* Adjust margins for responsiveness */}
      <h2 className="text-2xl md:text-3xl font-bold mb-5">Homes guests love</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 cursor-pointer">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data.map((item) => (
              <div
                className="images flex flex-col gap-5 mt-5"
                key={item._id}
              >
                <div className="Box bg-white drop-shadow-xl rounded-lg w-full">
                  <img
                    className="rounded-t-xl h-[250px] w-full object-cover"
                    src={item.photos[0]}
                    alt={item.name}
                  />
                  <div className="p-4 relative">
                    <h3 className="font-bold text-lg md:text-xl">
                      {item.name}
                    </h3>
                    <h6 className="text-slate-500 text-sm md:text-base">
                      {item.city}
                    </h6>
                    <div className="mt-3 mb-10">
                      <span className="rating p-1 text-xs md:text-sm rounded-t-md rounded-br-md mr-3 bg-blue-800 text-white">
                        {item.rating}
                      </span>
                      <span className="text-slate-600 text-sm">
                        <b>Fabulous</b> . 2,604 reviews
                      </span>
                    </div>
                    <span className="absolute right-4 bottom-4 text-sm md:text-base">
                      Starting from <b className="text-lg">{item.cheapestPrice}</b>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedPropertyy;
