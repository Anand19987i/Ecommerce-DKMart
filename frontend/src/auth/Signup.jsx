import React, { useState } from "react";
import axios from "axios";
import { sendOTP, verifyOTP } from "./Firebase";
import { USER_API_END_POINT } from "../utils/constant";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Send OTP to User
  const handleSendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      alert("Please enter phone number with country code (e.g., +919876543210)");
      return;
    }

    try {
      setLoading(true);
      const result = await sendOTP(phoneNumber);
      setConfirmationResult(result);
      console.log("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP & Register User
  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      const result = await verifyOTP(confirmationResult, otp);
      console.log("OTP Verified!", result.user);
      alert("OTP Verified Successfully!");

      // Send user details to backend after OTP verification
      const response = await axios.post(`${USER_API_END_POINT}/signup`, {
        ...userDetails,
        mobile: phoneNumber,
        otp: result.user.accessToken, // Send Firebase Token
      });

    } catch (error) {
      console.error("Invalid OTP", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Signup with OTP</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userDetails.confirmPassword}
            onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
          />
        </div>

        <div className="mt-4 space-y-4">
          {!confirmationResult ? (
            <>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-lg transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
              <button
                className={`w-full bg-green-500 text-white font-semibold py-3 rounded-lg transition duration-300 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                }`}
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP & Signup"}
              </button>
            </>
          )}
        </div>

        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default Signup;
