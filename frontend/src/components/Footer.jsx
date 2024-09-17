import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="mx-5 md:mx-[10%] mt-10 text-xs text-slate-600">
        <p>
          Countries. Regions. Cities. Districts. Airports. Hotels. Places of
          interest. Holiday Homes. Apartments. Resorts. Villas. Hostels. B&Bs.
          Guest Houses. Unique places to stay. All destinations All flight
          destinations. All car hire locations. All holiday destinations.
          Discover. Reviews. Discover monthly stays.
        </p>
      </div>

      <div className="bg-slate-100 mt-5 pt-5 px-5 md:px-[10vw]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 border-b-2 border-slate-400/55 cursor-pointer pb-10">
          {/* Support */}
          <div>
            <h1 className="font-bold mb-5">Support</h1>
            <div className="flex flex-col gap-2">
              <span className="hover:underline decoration-solid">
                Coronavirus (COVID-19)
              </span>
              <span className="hover:underline decoration-solid">FAQs</span>
              <span className="hover:underline decoration-solid">
                Manage your trips
              </span>
              <span className="hover:underline decoration-solid">
                Contact Customer Service
              </span>
              <span className="hover:underline decoration-solid">
                Safety resource centre
              </span>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h1 className="font-bold mb-5">Discover</h1>
            <div className="flex flex-col gap-2">
              <span className="hover:underline decoration-solid">
                Genius loyalty programme
              </span>
              <span className="hover:underline decoration-solid">
                Seasonal and holiday deals
              </span>
              <span className="hover:underline decoration-solid">
                Travel articles
              </span>
              <span className="hover:underline decoration-solid">
                Booking.com for Business
              </span>
              <span className="hover:underline decoration-solid">
                Traveller Review Awards
              </span>
              <span className="hover:underline decoration-solid">Car hire</span>
              <span className="hover:underline decoration-solid">
                Flight finder
              </span>
              <span className="hover:underline decoration-solid">
                Restaurant reservations
              </span>
            </div>
          </div>

          {/* Terms and Settings */}
          <div>
            <h1 className="font-bold mb-5">Terms and settings</h1>
            <div className="flex flex-col gap-2">
              <span className="hover:underline decoration-solid">
                Privacy & cookies
              </span>
              <span className="hover:underline decoration-solid">
                Terms and conditions
              </span>
              <span className="hover:underline decoration-solid">
                Manage your trips
              </span>
              <span className="hover:underline decoration-solid">
                Grievance officer
              </span>
              <span className="hover:underline decoration-solid">
                Modern Slavery Statement
              </span>
              <span className="hover:underline decoration-solid">
                Human Rights Statement
              </span>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h1 className="font-bold mb-5">Partners</h1>
            <div className="flex flex-col gap-2">
              <span className="hover:underline decoration-solid">
                Extranet login
              </span>
              <span className="hover:underline decoration-solid">
                Partner help
              </span>
              <span className="hover:underline decoration-solid">
                List your property
              </span>
              <span className="hover:underline decoration-solid">
                Become an affiliate
              </span>
            </div>
          </div>

          {/* About */}
          <div>
            <h1 className="font-bold mb-5">About</h1>
            <div className="flex flex-col gap-2">
              <span className="hover:underline decoration-solid">
                About Booking.com
              </span>
              <span className="hover:underline decoration-solid">
                How we work
              </span>
              <span className="hover:underline decoration-solid">
                Sustainability
              </span>
              <span className="hover:underline decoration-solid">
                Press centre
              </span>
              <span className="hover:underline decoration-solid">Careers</span>
              <span className="hover:underline decoration-solid">
                Corporate contact
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm mt-10 text-center text-slate-500 w-[90%] md:w-[50%] lg:w-[30%]">
            Booking.com is part of Booking Holdings Inc., the world leader in
            online travel and related services. Copyright © 1996–2024
            Booking.com™. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
