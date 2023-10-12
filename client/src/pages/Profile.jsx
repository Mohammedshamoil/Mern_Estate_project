import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          id="username"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border  border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
        />

        <input
          type="email"
          id="email"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          aria-describedby="helper-text-explanation"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
        />
        <button
          type="button"
          class=" uppercase text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-lg text-lg px-5 py-3 text-center mr-2 mb-2"
        >
        Update
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Sign out</span>
      </div>
    </div>
  );
}

export default Profile;
