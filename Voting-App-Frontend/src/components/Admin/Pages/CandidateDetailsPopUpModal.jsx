import React from "react";

function CandidateDetailsPopUpModal({ isOpen, onClose, candidate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full h-60 border border-gray-200 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center border-b pb-2">
          Candidate Details
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-28 h-28 overflow-hidden border border-gray-300 shadow-md flex-shrink-0">
            <img src="/unknownprofile.png" alt="Candidate" className="w-full h-full object-cover" />
          </div>
          <div className="text-sm md:text-base text-gray-700 space-y-2 mt-3">
          <p className="flex items-center gap-2">Name:<span>{candidate?.name}</span></p>
            <p className="flex items-center gap-2">Party:<span>{candidate?.party}</span></p>
            <p className="flex items-center gap-2">Age:<span>{candidate?.age} years</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetailsPopUpModal;
