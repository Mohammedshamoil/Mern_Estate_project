import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sigInStart,
  siginFailure,
  siginSuccess,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";

function Signin() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(sigInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(siginFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(siginSuccess(data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(siginFailure(error.message));
    }
  };

  return (
    
    <div className="p-3 sm:mt-64 
    border shadow-lg hover:shadow-lg transition-shadow border-white rounded-lg border-shadow max-w-xl  mx-auto  ">
      <h1 className="text-3xl text-center font-semibold my-7 ">Log <span className="text-green-600">In</span> </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-4 text-lg rounded-lg  "
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border  p-4 text-lg rounded-lg "
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white  p-4 text-lg  rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading ..." : "Sign in"}
        </button>
        <OAuth></OAuth>
      </form>

      <div className="flex gap-2 mt-5 ">
        <p className="text-lg"> Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 text-lg">{error}</p>}
    </div>
  );
}

export default Signin;
