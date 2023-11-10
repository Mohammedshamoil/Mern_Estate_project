import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  // getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutUserFailure,
  signoutUserStart,
  signoutUserSuccess,
} from "../redux/user/userSlice";

import {Link} from "react-router-dom"
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [fileuploadError, SetFileuploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatesuccess, setUpdatedSucess] = useState(false);
  const dispatch = useDispatch();
  // console.log(formData);
  // console.log(formData);
  // console.log(fileperc);
  // // console.log(file);
  // console.log(fileuploadError);
  // firebase image upload
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('images/.*')
  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);
  const handleFileupload = (file) => {
    //  app from FirebaseError.js
    // const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    //get percentage
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("upload is" + progress + "% done");
        setFilePerc(Math.round(progress));
      },
      (error) => {
        SetFileuploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({ ...formData, avatar: downloadURL })
          // console.log('File available at', downloadURL)
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdatedSucess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSingOut = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        // dispatch(signoutUserFailure(data.message));
        dispatch(deleteUserFailure(data.message));
        console.log(data.message);
        return;
      }
      // dispatch(signoutUserSuccess(data))
      dispatch(deleteUserSuccess(data));

    } catch (error) {
      // dispatch(signoutUserFailure(data.message))
      dispatch(deleteUserFailure(error.message));

    }
  };

  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm text-center">
          {fileuploadError ? (
            <span className="text-red-400">error Image Upload</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          id="username"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          // defaultValue={currentUser.password}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          // type="button"
          className=" uppercase text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-lg text-lg px-5 py-3 text-center mr-2 mb-2"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {/* creating Listing */}

        <Link  className="bg-green-800  font-bold text-white uppercase rounded-lg text-center px-5 py-3 hover:opacity-95 mr-2 mb-2" to={"/create-listing"}>
          Create Listing
        </Link>


      </form>
      <div className="flex justify-between mt-5 ">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer font-semibold"
        >
          Delete Account
        </span>
        <span
          onClick={handleSingOut}
          className="text-red-700 cursor-pointer font-semibold"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5 font-bold"> {error ? error : ""}</p>
      <p className="text-green-700 font-bold">
        {updatesuccess ? "User is updated successfully" : ""}{" "}
      </p>
    </div>
  );
}

export default Profile;
