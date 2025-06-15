import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" bg-gray-100 text-gray-700 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-around">
        <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center space-x-2">
          <Logo className="w-16" />
          <span className="text-lg font-semibold">Election Commission of India</span>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/votecount" className="hover:text-blue-600">Vote Count</Link>
          <a href="" className="hover:text-blue-600">Privacy Policy</a>
        </div>
        <p className="text-sm text-gray-600 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
