import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSetImgMutation, useUpdateMutation } from "../slices/userApiSlice";
import { setCredential } from "../slices/authSlices";
import { toast } from "react-toastify";
import { storage } from "./firebase/ConfiG";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Profile() {

  const [imagePreview, setImagePreview] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile] = useUpdateMutation();
  const dispatch = useDispatch();
  const [useProfileSetting] = useSetImgMutation()

  const { userInfo } = useSelector((state) => state.auth);


  const navigate = useNavigate();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setMobile(userInfo.mobile);
    setImagePreview(userInfo.profileImg)
  }, [navigate, userInfo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input field

    if (file) {
      const reader = new FileReader(); // Create a new FileReader object

      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the result of reading the file as the image preview
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    // Regular expression for password validation (at least 6 characters with at least one special character)

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    const mobileRegex = /^(?![0-5])\d{10}$/;
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

    // Check if any field is empty
    if (!name || !mobile || !email) {
      toast.error("All fields should be filled");
    } else if (!name.match(nameRegex)) {
      toast.error("Name cannot contain consecutive spaces");
    } else if (!mobile.match(mobileRegex)) {
      toast.error("Enter a valid mobile number");
    } else if (!email.match(emailRegex)) {
      toast.error("Invalid email address");
    } else if (password && !password.match(passwordRegex)) {
      toast.error(
        "Password must be at least 6 characters and contain at least one special character"
      );
    } else if (password && password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          mobile,
        }).unwrap();
        dispatch(setCredential(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const saveimage = async () => {
    try {
      // Get the file from the imagePreview
      const file = await fetch(imagePreview).then((res) => res.blob());

      // Generate a unique filename for the image
      const fileName = `${userInfo._id}_${Date.now()}.jpg`; // Example: "userID_timestamp.jpg"

      // Create a storage reference with the generated filename
      const storageRef = ref(storage, `/images/${fileName}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      try {
        console.log(downloadURL, userInfo._id);
        const res = await useProfileSetting({
            url : downloadURL,
            id : userInfo._id
        }).unwrap()
        dispatch(setCredential(res));
        toast.success('Image added successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle errors here
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <h1 className="mb-5 text-3xl  font-bold mt-24 absolute">Profile</h1>
      </div>
      <div className="flex justify-center h-svh items-center">
        <div className=" w-3/5 flex rounded-md border-2 shadow-md max-md:grid max-md:w-4/5 max-sm:w-full  bg-white">
          <div className="w-1/2 grid items-center justify-center">
            <div className="flex">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <img
                onClick={handleClick}
                className="h-60 w-60 rounded-full max-md:ml-20"
                src={imagePreview}
                alt="Profile"
              />
            </div>
              <button onClick={saveimage}  className="h-10 ml-20 w-20 hover:bg-green-500 bg-black rounded-lg text-white hover:scale-105">
                save
              </button>
          </div>
          <div className="md:w-1/2 grid gap-5 p-5">
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                value={name}
                className="rounded-md w-full border border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
              />
            </div>
            <div>
              <input
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile"
                type="text"
                value={mobile}
                className="rounded-md w-full border border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
              />
            </div>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                value={email}
                className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter New Password"
                type="password"
                className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
              />
            </div>
            <div>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                type="password"
                className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
              />
            </div>
            <div>
              <button
                onClick={submitUpdateHandler}
                data-ripple-light="true"
                type="button"
                className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
