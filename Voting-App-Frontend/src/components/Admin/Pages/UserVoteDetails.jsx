import React, { useEffect, useState } from 'react';
import service from '../../../services/config';
import UserVoteDetailsCard from './UserVoteDetailsCard';

function UserVoteDetails() {
  const [votedCount, setVotedCount] = useState(0);
  const [unvotedCount, setUnvotedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    service.getUsers().then((data) => {
      if (data) {
        const voters = data.filter(user => user.role === "voter");
        setTotalCount(voters.length);
        const votedUsers = voters.filter(user => user.isVoted === true);
        setVotedCount(votedUsers.length);
        setUnvotedCount(voters.length - votedUsers.length);
      }
    });
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        USERS VOTE SUMMARY
      </h1>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        <UserVoteDetailsCard count={totalCount} label="Total Voters" />
        <UserVoteDetailsCard count={votedCount} label="Voted Count" />
        <UserVoteDetailsCard count={unvotedCount} label="Non-voted Count" />
      </div>
    </div>
  );
}

export default UserVoteDetails;
