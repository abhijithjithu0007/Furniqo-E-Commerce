import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Products from './Products';
import Users from './Users';
import DashBoard from './DashBoard';
import ContextAdmin from './ContextAdmin';
import UserDetails from './UserDetails';


const Admin = () => {
  return (
    <ContextAdmin>
      <div>
        <div className="flex h-screen">
          <SideBar />
          <div className="w-full p-8 bg-[#193351]">
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users/:id" element={<UserDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </ContextAdmin>  
  );
}

export default Admin;
