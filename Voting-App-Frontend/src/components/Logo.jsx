import React from "react";

function Logo({ className = '', width = '' }) {
  return <img src="/WL0.png" className={` ${className}`} width={width} alt="Logo" />;
}

export default Logo;
