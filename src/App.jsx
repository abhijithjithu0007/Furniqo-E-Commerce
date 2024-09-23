import React from 'react';
import RouterApp from '../src/Router/RouterApp'
import { Toaster } from 'react-hot-toast';


export default function App() {

  return (
    <div>
      <RouterApp />
      <Toaster />
    </div>
  );
}
