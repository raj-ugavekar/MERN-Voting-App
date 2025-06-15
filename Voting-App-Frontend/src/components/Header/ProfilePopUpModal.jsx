import React from "react";
import LogoutBtn from "./LogoutBtn";
import { FaEdit, FaUser } from "react-icons/fa";

function ProfilePopUpModal({ isOpen, userData , onChangePassword , onEdit }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-14 -right-4 md:right-4 bg-white shadow-xl rounded-lg w-80 p-5 border border-gray-200 transition-transform transform scale-100 duration-300 ease-in-out">
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
          <FaUser size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{userData?.name}</h3>
        <button
        onClick={() => onEdit(userData)}
        className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full shadow-md transition"
        >
          <FaEdit size={14} />
        </button>
      </div>
      <div className="text-sm text-gray-700 space-y-2 mt-3">
        <p className="flex items-center gap-2">Email:<span>{userData?.email}</span></p>
        <p className="flex items-center gap-2">Aadhar Number:<span>{userData?.aadharCardNumber}</span></p>
        <p className="flex items-center gap-2">Mobile:<span>{userData?.mobile}</span></p>
        <p className="flex items-center gap-2">Age:<span>{userData?.age} years</span></p>
        <p className="flex items-center gap-2">Address:<span>{userData?.address}</span></p>
      </div>
      <div className="mt-4 pt-3 border-t text-center">
      <button
      className="inline-block text-blue-600 hover:text-gray-900 transition duration-200"
      onClick={onChangePassword}
    >
      Update Password
    </button>  |  <LogoutBtn className="text-red-600" />
      </div>
    </div>
  );
}

export default ProfilePopUpModal;
