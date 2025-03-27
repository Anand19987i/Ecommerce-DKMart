import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout  = async () => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/logout`, { withCrendentials: true});
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* Overlay Background (Click to Close) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-50 shadow-lg z-50 p-4 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-2xl font-bold cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✖
        </button>

        {/* Sidebar Content */}
        <div className="mt-10">
          <Link to={`/profile/${user?.name}/${user?._id}`}><p className="p-3  border-b border-gray-300 cursor-pointer">Edit Profile</p></Link>
          <Link to={`/orders/${user?.name}/${user?._id}`}><p className="p-3  border-b border-gray-300 cursor-pointer">Your Orders</p></Link>
          <p onClick={logout} className="p-3 border-b border-gray-300 cursor-pointer">Sign Out</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
