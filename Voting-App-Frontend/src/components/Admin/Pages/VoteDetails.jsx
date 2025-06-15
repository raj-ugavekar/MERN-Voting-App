import React, { useEffect, useState } from 'react';
import service from '../../../services/config';
import VoteDetailsCard from './VoteDetailsCard';
import { useDispatch, useSelector } from 'react-redux';
import { setIntialVoteCounts } from '../../../store/candidateSlice';
import LoadingSpinner from '../../LoadingSpinner';

function VoteDetails() {
  const dispatch = useDispatch();

  const votesData = useSelector((state)=> state.candidate.voteCounts);

  useEffect(() => {
    try{
      service.getVoteCount().then((response) => {
        if (response) {
          dispatch(setIntialVoteCounts(response));
        }
      });
    }catch(error){
      alert("Failed to load vote counts. Please try again.");
    }
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        LIVE VOTE COUNT
      </h1>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {votesData.length > 0 ? (
          votesData.map((voteCount) => (
            <VoteDetailsCard key={voteCount.party} voteCount={voteCount} />
          ))
        ) : (
          <LoadingSpinner className="min-h-[174px]" />
        )}
      </div>
    </div>
  );
}

export default VoteDetails;
