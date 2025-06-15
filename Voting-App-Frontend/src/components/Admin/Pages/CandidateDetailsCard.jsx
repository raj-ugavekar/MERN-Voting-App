import React from "react";
import service from "../../../services/config";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeCandidate } from "../../../store/candidateSlice";

function CandidateDeatilsCard({candidate , onEdit, onClick}){

  const dispatch = useDispatch();
  async function onDelete(candidateId){
    if (confirm('Are you sure? want to delete the candidate')) {
      try {
        const data = await service.deleteCandidate(candidateId);
        if (data) {
          dispatch(removeCandidate(candidateId));
          alert(data);
        }
      } catch (err) {
        alert("Failed to delete Candidate");
      }
    }
  }

    return (
            <div className="bg-white p-6 h-80 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 w-full sm:w-[45%] lg:w-[30%] mx-auto outline outline-[0.1rem] outline-gray-500 -outline-offset-8 hover:outline-offset-0 relative" >
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => onEdit(candidate)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => onDelete(candidate.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
              <div className="cursor-pointer"  onClick={onClick}>
                <div className="flex items-center justify-center size-44 mx-auto bg-blue-100 text-blue-500">
                  <img src="/unknownprofile.png"  alt="" />
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold text-gray-700">{candidate?.name}</h2>
                  <p className="text-gray-600 text-lg">{candidate?.party}</p>
                </div>
              </div>
            </div>
          );

}

export default CandidateDeatilsCard;