import React from "react";
import {  useNavigate } from "react-router-dom";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { siginSuccess } from "../redux/user/userSlice";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleclick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(siginSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleclick}
      type="button"
      className="bg-red-700 p-3 text-white    rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}

export default OAuth;
