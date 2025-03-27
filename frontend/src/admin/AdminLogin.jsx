import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (adminToken) {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(`${USER_API_END_POINT}/admin`, { name, password }, { withCredentials: true });
            if (response.data.success) {
                localStorage.setItem("adminToken", response.data.token);
                navigate("/admin/dashboard");
            }
            console.log(response.data);
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
