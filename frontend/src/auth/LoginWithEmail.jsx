import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import OtpInput from 'react-otp-input';

const LoginWithEmail = () => {
    const [step, setStep] = useState(1); // 1 = email input, 2 = OTP input
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSendOtp = async () => {
        setError("");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${USER_API_END_POINT}/send-otp`, { email });
            
            if (response.data.success) {
                setToken(response.data.token);
                setStep(2);
                setSuccess(`OTP sent to ${email}`);
            } else {
                setError(response.data.message || "Failed to send OTP");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error sending OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError("");
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${USER_API_END_POINT}/verify-otp`, {
                otp,
                token,
                email
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                localStorage.setItem('token', response.data.token);
                navigate("/");
            } else {
                setError(response.data.message || "OTP verification failed");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full border-t-4 border-blue-500">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    {step === 1 ? "Login to DKMart" : "Verify OTP"}
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

                {step === 1 ? (
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Sending...
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <p className="text-gray-600 text-center">
                            Enter the 6-digit code sent to <span className="font-semibold">{email}</span>
                        </p>
                        
                        <div className="flex justify-center">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input 
                                        {...props} 
                                        className="otp-input"
                                        style={{
                                            width: '3rem',
                                            height: '3rem',
                                            margin: '0 0.5rem',
                                            fontSize: '1.5rem',
                                            textAlign: 'center',
                                            borderRadius: '4px',
                                            border: '1px solid #d1d5db',
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <button
                            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                            }`}
                            onClick={handleVerifyOtp}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Verifying...
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-600">
                            Didn't receive code?{' '}
                            <button 
                                onClick={handleSendOtp} 
                                className="text-blue-500 hover:underline focus:outline-none"
                                disabled={loading}
                            >
                                Resend OTP
                            </button>
                        </p>
                    </div>
                )}

                <p className="text-center text-sm text-gray-600 mt-6">
                    {step === 1 ? (
                        <>
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <button 
                            onClick={() => setStep(1)} 
                            className="text-blue-500 hover:underline focus:outline-none"
                        >
                            Back to email
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};

export default LoginWithEmail;