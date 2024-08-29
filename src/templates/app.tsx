// app.tsx
import React, { useState } from 'react';
import  Sidebar from './sidebar'
import  App  from '../App';

const Template: React.FC = () => {

  return (
    <>
    <div className="flex h-screen">
    <Sidebar />
    <App />
    </div>
    </>
  );
};

export default Template;
