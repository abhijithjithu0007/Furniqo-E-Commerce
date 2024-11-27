import React, { useContext, useEffect, useState } from "react";
import { FaUsers, FaClipboardList, FaBoxOpen } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Admincontext } from "../Context/ContextAdmin";
import { useLoad } from "../Context/LoadingContext";
import axiosInstance from "../axiosInstance";

const pieData = [
  { name: "Outdoor", value: 1 },
  { name: "Living Room", value: 8 },
  { name: "Office", value: 4 },
  { name: "Bed Room", value: 3 },
  { name: "Dining Room", value: 3 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#F87171", "#6366F1"];

const lineData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 400 },
  { name: "May", value: 600 },
  { name: "Jun", value: 700 },
];

const DashBoard = () => {
  const [pro, setPro] = useState([]);
  const { startLoad, stopLoad } = useLoad(useContext);
  const [revenue, setRevenue] = useState();
  const { usersData } = useContext(Admincontext);

  useEffect(() => {
    const fetData = async () => {
      startLoad();
      try {
        const resp = await axiosInstance.get(`/api/user/allproducts`);
        setPro(resp.data);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoad();
      }
    };
    fetData();
  }, []);

  useEffect(() => {
    const revenueData = async () => {
      try {
        const resp = await axiosInstance.get(`/api/admin/total-revenue`, {
          withCredentials: true,
        });
        setRevenue(resp.data[0].totalRevenue);
      } catch (error) {
        console.log(error);
      }
    };
    revenueData();
  }, []);

  return (
    <div className="p-8 bg-gray-800 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <FaUsers className="text-4xl text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">Users</h2>
          <p className="text-gray-300">Total: {usersData.length}</p>
        </div>
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <FaClipboardList className="text-4xl text-green-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">Orders</h2>
          <p className="text-gray-300">Total : 12</p>
        </div>
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <FaBoxOpen className="text-4xl text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">Products</h2>
          <p className="text-gray-300">Total : {pro.length}</p>
        </div>
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <RiMoneyRupeeCircleFill className="text-4xl text-red-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">Revenue</h2>
          <p className="text-gray-300">Revenue : ₹ {revenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        <div className="bg-gray-900 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Furniture Categories
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Company Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#F3F4F6" />
              <YAxis stroke="#F3F4F6" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
