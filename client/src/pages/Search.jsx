import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-9 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className=" flex items-center gap-2">
            <label className="whitespace-nowrap text-xl font-bold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search...."
              className="border rounded-lg p-3 w-full text-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="text-xl font-bold">Type:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span className="text-xl font-semibold">Rent && Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span className="text-lg font-semibold " >Rent </span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="text-xl font-semibold"> Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span className="text-xl font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="text-xl font-bold">Amenities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span className="text-xl font-semibold">Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span className="text-xl font-semibold">Furnished </span>
            </div>
          </div>
          <div className=" flex items-center gap-2">
            <label className="text-xl font-bold" >Sort:</label>
            <select  id="sort_order" className="border rounded-lg p-3">
                <option >Price high to low</option>
                <option >Price low to high</option>
                <option >Latest</option>
                <option >Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-5xl font-semibold border-b p-3 text-slate-700 mt-5">Listing results</h1>
      </div>
    </div> 
  );
}

export default Search;
