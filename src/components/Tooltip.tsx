import React, { useState } from 'react';

const Tooltip: React.FC<{ children: React.ReactNode; tooltipContent: React.ReactNode }> = ({ children, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      {/* Trigger Element */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        // onMouseLeave={() => setIsOpen(false)}
        className="cursor-pointer"
      >
        {children}
      </div>

      {/* Tooltip Popup */}
      {isOpen && (
        <div className="absolute z-10 mt-[110px] bg-white border border-gray-300 rounded-lg shadow-lg w-max">
          <div className="p-1">{tooltipContent}</div>
        </div>
      )}

      {/* Tooltip Arrow */}
      {isOpen && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
      )}
    </div>
  );
};

export default Tooltip;