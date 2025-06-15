import React from "react";
import service from "../services/config";
import { useDispatch, useSelector } from "react-redux";
import { voteCandidate } from "../store/candidateSlice";
import { votedUser } from "../store/userSlice";

function VotingCard({ candidate }) {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const handleVote = async (candidateId) => {
    if(confirm("Are you sure? Once voted, it cannot be changed.")){
      try {
        const response = await service.voteCandidate(candidateId);
        if (response) {
          dispatch(votedUser(userData.id));
          dispatch(voteCandidate(candidateId));
          alert(response);
        }
      } catch (error) {
        alert("Voting failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition duration-300 
        w-full sm:w-[45%] lg:w-[30%] mx-auto">
      <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-500">
        <img src={candidate?.partyLogo} alt={`${candidate?.party} logo`} />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-700">{candidate?.name}</h2>
        <p className="text-gray-600 text-lg">{candidate?.party}</p>
      </div>
      <button
        onClick={() => handleVote(candidate.id)}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
      >
        Vote Now
      </button>
    </div>
  );
}

export default VotingCard;
