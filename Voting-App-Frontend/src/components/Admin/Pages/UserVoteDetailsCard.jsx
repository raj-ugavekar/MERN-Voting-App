import React from 'react'
import { FaUsers } from 'react-icons/fa'

function UserVoteDetailsCard({ count,label }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition duration-300 
        w-full sm:w-[45%] lg:w-[30%] mx-auto">
      { label==='Voted Count' ? <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-green-100 text-green-500">
      <FaUsers size={24} />
      </div> : label === 'Non-voted Count' ? <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-100 text-red-500">
      <FaUsers size={24}/>
      </div> : <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-500">
      <FaUsers size={24} />
      </div> }
      <div className="text-center mt-4">
        <h2 className="text-3xl font-bold text-gray-900">{count}</h2>
        <p className="text-gray-600 text-lg">{label}</p>
      </div>
    </div>
  )
}

export default UserVoteDetailsCard