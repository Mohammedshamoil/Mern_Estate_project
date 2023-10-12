import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">shammu</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 rounded-lg flex p-3 items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-lg focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch className=" text-slate-600 "></FaSearch>
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden  text-lg font-bold sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden  text-lg font-bold  sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-8 w-8 object-cover ring-2 p-1 ring-gray-300 dark:ring-gray-500" src={currentUser.avatar} alt="profile" />
              // <div className="relative">
              //   <img
              //     className="w-8 h-8 rounded-full"
              //     src={currentUser.avatar}
              //     alt="profile"
              //   />
              //   <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              // </div>
            ) : (
              <li className="text-lg font-bold  text-slate-700 hover:underline cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
