// app.tsx
import React, { useState } from 'react';
import  Tooltip from '../components/Tooltip'
const Main: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
  return (
    <>
        <main className="flex-1 p-8 pt-4 ">
        <div className="top-bar p-6 px-0 flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center">
            3 August 2024

        <div className="ml-4 flex gap-3">
            <button className="rounded-full py-1 px-1 border">
                <img alt="" src="/arrow-l.svg" />
            </button>
            <button className="rounded-full py-1 px-1 border">
                <img alt="" src="/arrow-r.svg" />
            </button>
        </div>

        </h1>
        
        <div className="ml-4 flex gap-3">
            <button className="rounded-md py-1 px-6 border flex items-center gap-3">
                <img alt="" src="/search.svg" />
                Filters
            </button>
        </div>
        </div>

        <div className="flex gap-4">
        {/* To do Section */}
        <div className="p-4 bg-white rounded-lg w-full" style={{ background: '#f5f5f5' }}>
            <div className="flex justify-between mb-4">
            <h2 className="text-lg font-normal" style={{ fontSize: '17px' }}>
                To do 
                <span className="text-lg font-normal ml-2" style={{
                background: '#e2e2e2',
                padding: '4px 8px',
                borderRadius: '5px',
                fontSize: '16px'
                }}>
                4
                </span>
            </h2>
            <button className="text-xl font-normal">+</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4" draggable="true">
            <div className="flex items-center mb-4">
                <span className="py-1 px-2" style={{
                background: '#EBFAE2',
                color: '#4F9C20',
                borderRadius: '7px',
                fontSize: '14px',
                fontWeight: 500
                }}>
                HIGH
                </span>
            </div>
            <h2 className="text-xl font-bold mb-2">Task 2</h2>
            <p className="text-gray-700 mb-2">Description 2</p>
            <p className="text-gray-500 mb-2 flex justify-between">
                <span className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" fill="#4CAF50"></path>
                    <rect width="24" height="24" rx="12" fill="none"></rect>
                </svg>
                2024-09-01
                </span>
                <span>3:45 AM</span>
            </p>
            </div>
        </div>

        {/* In Progress Section */}
        <div className="p-4 bg-white rounded-lg w-full" style={{ background: '#f5f5f5' }}>
            <div className="flex justify-between mb-4">
            <h2 className="text-lg font-normal" style={{ fontSize: '17px' }}>
                In progress
                <span className="text-lg font-normal ml-2" style={{
                background: '#e2e2e2',
                padding: '4px 8px',
                borderRadius: '5px',
                fontSize: '16px'
                }}>
                4
                </span>
            </h2>
            <button className="text-xl font-normal">+</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4" draggable="true">
            <div className="flex items-center mb-4">
                <span className="py-1 px-2" style={{
                background: '#FDF2F2',
                color: '#EC5962',
                borderRadius: '7px',
                fontSize: '14px',
                fontWeight: 500
                }}>
                LOW
                </span>
            </div>
            <h2 className="text-xl font-bold mb-2">Task 2</h2>
            <p className="text-gray-700 mb-2">Description 2</p>
            <p className="text-gray-500 mb-2 flex justify-between">
                <span className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" fill="#4CAF50"></path>
                    <rect width="24" height="24" rx="12" fill="none"></rect>
                </svg>
                2024-09-01
                </span>
                <span>3:45 AM</span>
            </p>
            </div>
        </div>

        {/* Completed Section */}
        <div className="p-4 bg-white rounded-lg w-full" style={{ background: '#f5f5f5' }}>
            <div className="flex justify-between mb-4">
            <h2 className="text-lg font-normal" style={{ fontSize: '17px' }}>
                Completed
            </h2>
            <button className="text-xl font-normal">+</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4" draggable="true">
            <div className="flex items-center mb-4">
                <span className="py-1 px-2" style={{
                background: '#EEF3FF',
                color: '#3069FE',
                borderRadius: '7px',
                fontSize: '14px',
                fontWeight: 500
                }}>
                MEDIUM
                </span>
            </div>
            <h2 className="text-xl font-bold mb-2 flex justify-between">
                Task 2

            <Tooltip
                    tooltipContent={
                    <div className="flex justify-between mt-0 flex-col">
                        <button className="text-left  text-gray-400 px-4 py-2 rounded">
                        Edit
                        </button>
                        <button className="text-left text-red-500  px-4 py-2 rounded">
                        Delete
                        </button>
                    </div>
                    }
                >
                    <button className="border text-black px-3 py-3 pt-0 font-bold rounded-lg">...</button>
            </Tooltip>
            </h2>
            <p className="text-gray-700 mb-2">Description 2</p>
            <p className="text-gray-500 mb-2 flex justify-between">
                <span className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 16l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" fill="#4CAF50"></path>
                    <rect width="24" height="24" rx="12" fill="none"></rect>
                </svg>
                2024-09-01
                </span>
                <span>3:45 AM</span>
            </p>
            </div>
        </div>
        </div>
        </main>
   </>
   )}
export default Main;