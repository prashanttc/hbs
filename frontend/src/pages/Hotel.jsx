import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reserve from "../components/Reserve";
import SimpleImageSlider from "react-simple-image-slider";
import useFetch from "../hooks/useFetch";
import {
  faLocationDot,
  faHeart,
  faCircleXmark,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { data, loading, error } = useFetch(
    `https://hbs-a2w9.onrender.com/api/hotels/find/${id}`
  );
  const navigate = useNavigate();

  const { date, option } = useContext(SearchContext);
  const startDate = date?.[0]?.startDate;
  const endDate = date?.[0]?.endDate;

  const { user } = useContext(AuthContext);

  const MILLISECOND_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / MILLISECOND_PER_DAY);
  }

  const days = startDate && endDate ? dayDifference(endDate, startDate) : 0;

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="hotel" />
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="container mx-auto px-4 md:px-8 py-4">
            {/* Hotel Info */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:gap-8 mb-6">
                <div className="md:w-3/4">
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{data.name}</h1>
                  <h3 className="text-md md:text-lg mt-2 flex items-center text-gray-600">
                    <FontAwesomeIcon className="text-xl mr-2" icon={faLocationDot} />
                    {data.address}
                  </h3>
                </div>
                <div className="flex flex-col md:items-center gap-4 mt-4 md:mt-0">
                  <div className="flex gap-2">
                    <FontAwesomeIcon className="text-3xl text-red-600 cursor-pointer hover:text-red-800 transition-colors" icon={faHeart} />
                    <FontAwesomeIcon className="text-3xl text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" icon={faShareNodes} />
                  </div>
                  <button
                    className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleClick}
                  >
                    Reserve Your Stay
                  </button>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="w-full mb-8">
                <div className="flex overflow-x-auto snap-x gap-4">
                  {data.photos?.map((photo, index) => (
                    <div key={index} className="flex-shrink-0 snap-start w-full md:w-1/2 lg:w-1/3">
                      <img
                        onClick={() => setOpenPhoto(!openPhoto)}
                        className="object-cover w-full h-60 md:h-80 lg:h-96 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                        src={photo}
                        alt={`Hotel Photo ${index}`}
                      />
                    </div>
                  ))}

                  {openPhoto && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                      <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        <SimpleImageSlider
                          width={800}
                          height={450}
                          images={data.photos}
                          showBullets={true}
                          showNavs={true}
                        />
                        <FontAwesomeIcon
                          className="absolute top-4 right-4 text-3xl text-black cursor-pointer"
                          onClick={() => setOpenPhoto(!openPhoto)}
                          icon={faCircleXmark}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Property Highlights */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 text-lg text-gray-800">
                {data.desc}
              </div>
              <div className="w-full md:w-1/4 bg-blue-50 p-6 rounded-xl shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Property Highlights</h1>
                <h2 className="text-lg mb-4 font-bold text-gray-700">Perfect for a {days}-night stay!</h2>
                <div className="flex items-center mb-4 text-gray-600">
                  <FontAwesomeIcon className="text-xl mr-2" icon={faLocationDot} />
                  <span>
                    Situated in the best-rated area in {data.city}, this property has an excellent location score of {data.rating}.
                  </span>
                </div>
                <h2 className="font-bold text-lg mb-2 text-gray-700">Apartment with:</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Garden view</li>
                  <li>Terrace</li>
                  <li>Free parking</li>
                </ul>
                <h1 className="text-xl font-bold mt-4 text-gray-800">₹{days * option.room * data.cheapestPrice}</h1>
                <button
                  className="mt-4 w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleClick}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} hotelname={data.name}/>}
    </div>
  );
};

export default Hotel;
