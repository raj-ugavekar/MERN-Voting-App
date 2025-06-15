import React from "react";
import { useNavigate } from "react-router-dom";

function FrontPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-[57vh] md:min-h-[76vh] flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-4 sm:mb-6 text-center">
        Welcome to the Voting App
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-3xl">
        Cast your vote securely and transparently. Your voice matters!  
        Join us in making the voting process 
        <span className="font-semibold"> efficient, fair, and digital. </span>
      </p>
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base sm:text-lg font-medium transition w-full sm:w-auto"
          onClick={() => navigate("/voting")}
        >
          Vote Now
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md text-base sm:text-lg font-medium transition w-full sm:w-auto"
          onClick={() => navigate("/votecount")}
        >
          View Results
        </button>
      </div>
    </section>
  );
}

export default FrontPage;
