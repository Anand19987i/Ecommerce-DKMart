import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

const LoginWithEmail = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle User Login
  const handleLogin = async () => {
    setError(""); // Reset errors

    if (!userDetails.email || !userDetails.password) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${USER_API_END_POINT}/login`, userDetails, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Login Response:", response.data.user);
      if (response.data.success) {
        dispatch(setUser(response.data.user))
        navigate("/"); // Redirect after successful login
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-t-4 border-green-500">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to DK<span className="text-green-500">Mart</span>
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <button
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginWithEmail;
