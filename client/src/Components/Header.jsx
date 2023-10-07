import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-around items-center">
        <Link to="/">
          <h1 className="font-bold text-sm md:text-xl sm:flex  sm:flex-wrap ">
            <span className="text-slate-500">shammu</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg flex p-3 items-center   ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-lg focus:outline-none"
          />
          <FaSearch className=" text-slate-500 "></FaSearch>
        </form>
        <ul className="flex md:gap-4">
          <Link to="/">
            <li className="hidden  text-lg sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden  text-lg sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-lg text-slate-700 hover:underline cursor-pointer">
              Signin
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
