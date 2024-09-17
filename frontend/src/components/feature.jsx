import React from 'react';
import useFetch from '../hooks/useFetch.js';


const Feature = () => {
  const { data, loading } = useFetch(
    "https://hbs-a2w9.onrender.com/api/hotels/countbyCity?cities=indore,goa,mumbai,pune,delhi"
  );

  return (
    <div className="mx-5 md:mx-[10%] mt-10 md:mt-[8vw]"> {/* Adjust margins and spacing for responsiveness */}
      <h2 className="text-2xl md:text-4xl font-bold mb-5">Explore India</h2>
      <p className="text-lg md:text-xl text-slate-600 mb-5">
        These popular destinations have a lot to offer
      </p>
      {loading ? (
        "Loading, please wait..."
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {/* Indore */}
          <div className="imageBox">
            <img
              className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
              src="https://q-xx.bstatic.com/xdata/images/region/170x136/49646.jpg?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="
              alt="Indore"
            />
            <h2 className="mt-3 font-bold text-lg md:text-xl">Indore</h2>
            <span className="text-slate-600 text-base md:text-lg">{data[0]} Properties</span>
          </div>

          {/* Goa */}
          <div className="imageBox">
            <img
              className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
              src="https://q-xx.bstatic.com/xdata/images/city/170x136/684615.jpg?k=c842e0a2bf64c6b425f683b2025585e4e073562cd308beb5e0b5c89bab170846&o="
              alt="Goa"
            />
            <h2 className="mt-3 font-bold text-lg md:text-xl">Goa</h2>
            <span className="text-slate-600 text-base md:text-lg">{data[1]} Properties</span>
          </div>

          {/* Mumbai */}
          <div className="imageBox">
            <img
              className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
              src="https://q-xx.bstatic.com/xdata/images/city/170x136/684548.jpg?k=6105f1862b8bfa3f98596dc79e917903739517b4d99302d8b38c2723d34bc362&o="
              alt="Mumbai"
            />
            <h2 className="mt-3 font-bold text-lg md:text-xl">Mumbai</h2>
            <span className="text-slate-600 text-base md:text-lg">{data[2]} Properties</span>
          </div>

          {/* Pune */}
          <div className="imageBox">
            <img
              className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
              src="https://q-xx.bstatic.com/xdata/images/region/170x136/69967.jpg?k=2e683234884f1caa334734e2ee99dd2036f55c3c413f65702d965eca167619a4&o="
              alt="Pune"
            />
            <h2 className="mt-3 font-bold text-lg md:text-xl">Pune</h2>
            <span className="text-slate-600 text-base md:text-lg">{data[3]} Properties</span>
          </div>

          {/* Delhi */}
          <div className="imageBox">
            <img
              className="w-full h-[150px] sm:h-[20vw] md:h-[15vw] lg:h-[10vw] object-cover rounded-xl"
              src="https://q-xx.bstatic.com/xdata/images/city/170x136/684573.jpg?k=81b297662f5c8f9562b0193a71a30b71d56e516eb327d4249db68bc8e9bcf3b8&o="
              alt="Delhi"
            />
            <h2 className="mt-3 font-bold text-lg md:text-xl">Delhi</h2>
            <span className="text-slate-600 text-base md:text-lg">{data[4]} Properties</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feature;
