import React, { useEffect } from "react";
import service from "../services/config";
import VotingCard from "./VotingCard";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCandidates } from "../store/candidateSlice";
import LoadingSpinner from "./LoadingSpinner";

function Voting() {

  const candidatesData = useSelector((state)=> state.candidate.candidates);

  const dispatch = useDispatch();

  useEffect(() => {
    try{
      service.getCandidates().then((data) => {
        if (data) {
          dispatch(setInitialCandidates(data));
        }
      });
    }catch(error){
      alert("Internal Server Error. Refresh Again");
    }
  }, []);

  return (
    <section className="min-h-[57vh] md:min-h-[76vh] bg-gray-100 py-10 px-4">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 mb-12">
        CAST YOUR VOTE!
      </h1>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {candidatesData.length > 0 ? (
          candidatesData.map((candidate) => (
            <VotingCard key={candidate.id} candidate={candidate} />
          ))
        ) : (
          <LoadingSpinner className="min-h-[174px]"/>
        )}
      </div>
    </section>
  );
}

export default Voting;
