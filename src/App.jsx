import React from 'react';
import RouterApp from './routing/RouterApp';
import { Toaster } from 'react-hot-toast';


export default function App() {

  return (
    <div>
        <RouterApp />
        <Toaster />
    </div>
  );
}
