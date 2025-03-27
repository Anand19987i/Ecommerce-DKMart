import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Camera } from "lucide-react";
import { setUserDetail } from "../redux/authSlice";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    avatar: null,
    avatarPreview: "/default-pic.avif",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${USER_API_END_POINT}/profile/${user?.name}/${user?._id}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setUserDetails(response.data.userDetail);
          dispatch(setUserDetail(response.data.userDetail));
          setFormData({
            name: response.data.userDetail.name,
            email: response.data.userDetail.email,
            mobile: response.data.userDetail.mobile,
            address: response.data.userDetail.address,
            avatarPreview: response.data.userDetail.avatar || "/default-pic.avif",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchUserDetails();
  }, [user]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload (Avatar)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("_id", user?._id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("address", formData.address);
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar);

    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/edit/${user?.name}/${user?._id}`,
        formDataToSend,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserDetails(response.data.userDetail);
        dispatch(setUserDetail(response.data.userDetail));
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {editMode ? "Edit Your Profile" : "Your Profile"}
        </h2>

        {/* ✅ Profile Picture Section */}
        <div className="flex flex-col items-center relative">
          <label htmlFor="avatar-upload" className="relative cursor-pointer">
            <img
              src={formData.avatarPreview}
              
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            />
           
            {editMode && (
              <div className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full shadow-md">
                <Camera className="w-5 h-5 text-white" />
              </div>
            )}

          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* ✅ Profile Information */}
        {!editMode ? (
          <div className="mt-6 text-gray-700 space-y-4">
            <p className="flex justify-between border-b pb-2">
              <span className="font-medium">Name:</span>
              <span>{userDetails?.name}</span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-medium">Email:</span>
              <span>{userDetails?.email}</span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-medium">Mobile:</span>
              <span>{userDetails?.mobile}</span>
            </p>
            <p className="flex justify-between border-b pb-2">
              <span className="font-medium">Address:</span>
              <span>{userDetails?.address}</span>
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={() => setEditMode(false)}
              type="button"
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
