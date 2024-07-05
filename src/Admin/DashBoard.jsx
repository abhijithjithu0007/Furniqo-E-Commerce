import React from 'react';
import { FaUsers, FaClipboardList, FaBoxOpen } from 'react-icons/fa';
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
  ResponsiveContainer
} from 'recharts';


const pieData = [
  { name: 'Fashion', value: 60 },
  { name: 'Toys', value: 30 },
  { name: 'Footwear', value: 50 },
  { name: 'Books', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const lineData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 400 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 700 },
];

const DashBoard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaUsers className="text-4xl text-indigo-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Users</h2>
          <p className="text-gray-700">Total: 1500</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaClipboardList className="text-4xl text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Orders</h2>
          <p className="text-gray-700">Total: 320</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <FaBoxOpen className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Products</h2>
          <p className="text-gray-700">Total: 45</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Production</h2>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Company Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={lineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DashBoard;
