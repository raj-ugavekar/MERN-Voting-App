import React from "react";

const InputBox = ({ label, placeholder = "", type = "text", className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <input
        className={`w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${className}`}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default InputBox;
