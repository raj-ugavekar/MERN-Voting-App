import React from 'react';

function VoteDetailsCard({ voteCount }) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition duration-300 
        w-full sm:w-[45%] lg:w-[30%] mx-auto">
      <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-500">
        <img src={voteCount?.partyLogo} alt={`${voteCount?.party} logo`}  />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold text-gray-900">{voteCount?.count} Votes</h2>
        <p className="text-gray-600 text-lg">{voteCount?.party}</p>
      </div>
    </div>
  );
}

export default VoteDetailsCard;
