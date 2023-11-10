import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./Components/Header";
import PrivateRoute from "./Components/privateRoute";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route  element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/create-listing" element={<CreateListing/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
