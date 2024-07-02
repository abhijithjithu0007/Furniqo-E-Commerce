import React from 'react'
import { Routes,Route } from 'react-router-dom'
import SideBar from './SideBar'
import Products from './Products'
import Users from './Users'
import DashBoard from './DashBoard'


const Admin = () => {
  return (
    <div>
      <div className="flex h-screen">
      <SideBar />
      <div className="w-4/5 p-8 bg-gray-100">
        <Routes>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </div>
    </div>
    </div>
  )
}

export default Admin
