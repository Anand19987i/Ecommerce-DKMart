import React, { useEffect, useState } from "react";
import axios from "axios";
import { ORDER_API_END_POINT, PRODUCT_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AdminNav from "./AdminNav";
import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [monthlySales, setMonthlySales] = useState([]);
    const [categorySales, setCategorySales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch Orders
                const orderResponse = await axios.get(`${ORDER_API_END_POINT}/orders`, { withCredentials: true });
                if (orderResponse.data.success) {
                    setOrders(orderResponse.data.orders);
                    
                    // Calculate Total Revenue
                    const revenue = orderResponse.data.orders.reduce((total, order) => total + order.totalPrice, 0);
                    setTotalRevenue(revenue);

                    // Calculate Monthly Sales
                    const salesData = {};
                    orderResponse.data.orders.forEach(order => {
                        const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
                        salesData[month] = (salesData[month] || 0) + order.totalPrice;
                    });
                    setMonthlySales(Object.entries(salesData).map(([month, revenue]) => ({ month, revenue })));
                }

                // Fetch Users
                const userResponse = await axios.get(`${USER_API_END_POINT}/get/users`, { withCredentials: true });
                if (userResponse.data.success) {
                    setTotalUsers(userResponse.data.users.length);
                }

                // Fetch Products
                const productResponse = await axios.get(`${PRODUCT_API_END_POINT}/products`, { withCredentials: true });
                if (productResponse.data.success) {
                    setTotalProducts(productResponse.data.products.length);

                    // Calculate Category Sales
                    const categoryData = {};
                    productResponse.data.products.forEach(product => {
                        categoryData[product.productType] = (categoryData[product.productType] || 0) + 1;
                    });
                    setCategorySales(Object.entries(categoryData).map(([category, sales]) => ({ category, sales })));
                }
                
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    
    return (
        <div className="bg-gray-100 min-h-screen">
            <AdminNav />
            <div className="p-6 max-w-7xl mx-auto">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <DashboardCard icon={<ShoppingCart className="text-blue-500 w-10 h-10" />} title="Total Orders" value={orders.length} />
                    <DashboardCard icon={<DollarSign className="text-green-500 w-10 h-10" />} title="Revenue" value={`₹${totalRevenue}`} />
                    <DashboardCard icon={<Users className="text-purple-500 w-10 h-10" />} title="Total Users" value={totalUsers} />
                    <DashboardCard icon={<Package className="text-yellow-500 w-10 h-10" />} title="Products" value={totalProducts} />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DashboardChart title="Monthly Revenue" data={monthlySales} dataKey="revenue" color="#82ca9d" />
                            <DashboardChart title="Category Sales" data={categorySales} dataKey="sales" color="#8884d8" />
                        </div>

                        {/* Recent Orders Table */}
                        <div className="bg-white p-6 rounded-lg shadow mt-6">
                            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Order ID</th>
                                        <th className="border border-gray-300 px-4 py-2">Customer</th>
                                        <th className="border border-gray-300 px-4 py-2">Amount</th>
                                        <th className="border border-gray-300 px-4 py-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50">
                                            <td className="border border-gray-300 px-4 py-2">{order._id.slice(-8)}</td>
                                            <td className="border border-gray-300 px-4 py-2">{order.userId?.name}</td>
                                            <td className="border border-gray-300 px-4 py-2">₹{order.totalPrice}</td>
                                            <td className={`border border-gray-300 px-4 py-2 font-semibold ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        {icon}
        <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const DashboardChart = ({ title, data, dataKey, color }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke={color} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const getStatusColor = (status) => {
    if (status === "Pending") return "text-yellow-600";
    if (status === "Delivered") return "text-green-600";
    if (status === "Cancelled") return "text-red-600";
    return "text-gray-600";
};

export default Dashboard;
