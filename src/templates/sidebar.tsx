// app.tsx
import React, { useState } from 'react';

const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string>('Calendar');
  return (
    <>
        <aside className="w-1/6">
            <div className="top-bar p-2  md:p-10 pb-8">
            <h2 className="text-2xl font-semibold">
                <img alt="" className='w-full' src="/logo.svg" />
            </h2>
            </div>
            <ul className="space-y-2">
            {['Calendar', 'Inbox', 'Notes', 'Todo List', 'Settings'].map((item, index) => (
                <li key={index}>
                <a
                    href="#"
                    className={`flex items-center py-5 px-6 transition-colors duration-200
                    ${activeItem === item ? 'bg-[#4F35F3]/20 font-bold text-[#4F35F3] border-r-4 border-[#4F35F3]' : 'text-[#65676D]'}
                    hover:bg-[#4F35F3]/20`}
                    onClick={() => setActiveItem(item)}
                >
                    <img alt="" src={`/menu-${item}.svg`} className='mr-3 w-9'/>
                    <span className='hidden md:flex'>{item}</span>
                </a>
                </li>
            ))}
            </ul>
        </aside>
   </>
   )}
export default Sidebar;
