import React from "react";
import useFetch from "../hooks/useFetch";

const Property = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/api/hotels/countbyType"
  );
  const images = [
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=",
    "https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=",
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
    "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=",
    "https://r-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o="
  ];

  return (
    <div className="mx-5 md:mx-[10%] mt-10">
      <h2 className="text-2xl md:text-4xl font-bold mb-5">
        Browse by property type
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {data &&
              images.map((img, i) => (
                <div className="imageBox" key={i}>
                  <img
                    className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
                    src={img}
                    alt={data[i]?.type}
                  />
                  <h2 className="mt-3 font-bold text-lg md:text-xl">
                    {data[i]?.type}
                  </h2>
                  <div className="flex gap-2">
                    <h1 className="font-md text-lg md:text-xl">
                      {data[i]?.count}
                    </h1>
                    <h1 className="font-md text-lg md:text-xl">
                      {data[i]?.type}
                    </h1>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Property;
