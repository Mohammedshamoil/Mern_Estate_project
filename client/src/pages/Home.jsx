import React, { useEffect, useState } from "react";
import homeLogo from "../assets/home_logo.svg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import Listingitems from "../Components/Listingitems";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // console.log(saleListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  SwiperCore.use([Navigation]);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
        <div className=" flex sm:flex-row  flex-col justify-center items-center gap-5">
          <div className="left gap-3 ">
            {/* left */}
            <h1 className="text-slate-700 font-bold text-3xl sm:text-6xl ">
              Find your next <span className="text-slate-500">perfect</span>
              <br />
              place with ease
            </h1>
            <p className=" mt-4 text-gray-400 text-xs sm:text-lg">
              R-Estate is the best place to find your next perfect place to
              live.
              <br />
              We have a wide range of properties for you to choose from.
            </p>
          </div>
          {/* right */}
          <div className=" right animate-pulse">
            <img src={homeLogo} alt="home logo" />
          </div>
          {/* search */}
        </div>
        <div className="">
          <Link
            to={"/search"}
            className="text-sm sm:text-lg text-blue-800 font-bold hover:underline"
          >
            Let's get started...
          </Link>
        </div>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((list,id) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${list.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="sm:h-[700px] h-[400px]"
                key={id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="  text-center sm:text-4xl text-2xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className=" flex justify-end sm:text-lg text-sm text-blue-800 hover:underline "
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing,id) => (
                <Listingitems listing={listing} key={id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="  text-center sm:text-4xl text-2xl font-semibold text-slate-700">
                Recent places for sale
              </h2>
              <Link
                className=" flex justify-end sm:text-lg text-sm text-blue-800 hover:underline "
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing,id) => (
                <Listingitems listing={listing} key={id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-4">
              <h2 className="  text-center sm:text-4xl text-2xl font-semibold text-slate-700">
                Recent places for rent
              </h2>
              <Link
                className=" flex justify-end sm:text-lg text-sm text-blue-800 hover:underline "
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing,_id) => (
                <Listingitems listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
