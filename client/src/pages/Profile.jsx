import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fileperc, setFilePerc] = useState(0);
  const [fileuploadError, SetFileuploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
    const storage = getStorage(app);
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
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={ formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-28 w-28 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm text-center">
          {fileuploadError?
          <span className="text-red-400">
            error Image Upload
          </span>:
          fileperc >0 && fileperc<100 ?
          <span className="text-slate-700">
            {`Uploading ${fileperc}`}
          </span>:
          fileperc===100?
          <span className="text-green-700">
            image uploaded successfully 
          </span>:
          ""

          }
        </p>
        <input
          type="text"
          id="username"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
        />

        <input
          type="email"
          id="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
        />
        <button
          type="button"
          className=" uppercase text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-bold rounded-lg text-lg px-5 py-3 text-center mr-2 mb-2"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 ">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Profile;
