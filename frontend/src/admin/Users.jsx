import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { USER_API_END_POINT } from "../utils/constant";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/get/users`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setUsers(response.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen ">
            <AdminNav />

            <div className="p-6 max-w-screen">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-left">
                                    <th className="border border-gray-300 px-4 py-2">ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Mobile No.</th>
                                    <th className="border border-gray-300 px-4 py-2">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
                                        <td className="border border-gray-300 px-4 py-2">{user.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;
