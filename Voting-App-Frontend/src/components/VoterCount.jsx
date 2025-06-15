import React, { useEffect } from "react";
import service from "../services/config";
import VoterCountCard from "./VoterCountCard";
import { useDispatch, useSelector } from "react-redux";
import { setIntialVoteCounts } from "../store/candidateSlice";
import LoadingSpinner from "./LoadingSpinner";

function VoterCount() {

  const dispatch = useDispatch();

  const votesData = useSelector((state)=> state.candidate.voteCounts);
  const authStatus = useSelector((state)=> state.auth.status);

  useEffect(() => {
    try{
      service.getVoteCount().then((response) => {
        if (response) {
          dispatch(setIntialVoteCounts(response));
        }
      });
    }catch(error){
      alert("Internal Server Error. Refresh Again");
    }
  }, []);

  return (
    <section className={ `${authStatus ? 'min-h-[57vh] md:min-h-[76vh]' : 'min-h-screen' }  bg-gray-100 py-10 px-4`}>
      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-700 mb-12">
        <span className="text-red-600">LIVE</span> VOTING COUNT
      </h1>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {votesData.length > 0 ? (
          votesData.map((voteCount) => (
            <VoterCountCard key={voteCount.party} voteCount={voteCount} />
          ))
        ) : (
          <LoadingSpinner className="min-h-[174px]"/>
        )}
      </div>
    </section>
  );
}

export default VoterCount;
