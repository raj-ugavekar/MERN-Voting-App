import React from "react";

function UserDetailsPopUpModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full h-80 border border-gray-200 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition text-lg"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center border-b pb-2">
          User Details
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-32 h-32 overflow-hidden border border-gray-300 shadow-md flex-shrink-0">
            <img src="/unknownprofile.png" alt="Candidate" className="w-full h-full object-cover" />
          </div>
          <div className="text-sm md:text-base text-gray-700 space-y-2 mt-3">
          <p className="flex md:items-center gap-2">Name:<span>{user?.name}</span></p>
            <p className="flex md:items-center gap-2">Email:<span>{user?.email}</span></p>
            <p className="flex md:items-center gap-2">Aadhar Number:<span>{user?.aadharCardNumber}</span></p>
            <p className="flex md:items-center gap-2">Mobile:<span>{user?.mobile}</span></p>
            <p className="flex md:items-center gap-2">Age:<span>{user?.age} years</span></p>
            <p className="flex md:items-center gap-2">Address:<span>{user?.address}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsPopUpModal;
