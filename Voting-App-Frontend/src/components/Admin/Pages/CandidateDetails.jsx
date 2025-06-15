import React, { useEffect, useState } from "react";
import CandidateDetailsCard from "./CandidateDetailsCard";
import AddCandidateForm from "./AddCandidateForm";
import service from "../../../services/config";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCandidates } from "../../../store/candidateSlice";
import CandidateDetailsPopUpModal from "./CandidateDetailsPopUpModal";
import LoadingSpinner from "../../LoadingSpinner";

function CandidateDetails() {

  const dispatch = useDispatch();

  const candidates = useSelector((state) => state.candidate.candidates);

  const [search, setSearch] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);

  const [newCandidate, setNewCandidate] = useState({ name: "", party: "", age: "" });

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    service.getCandidates().then((data) => {
      if (data) {
        dispatch(setInitialCandidates(data));
      }
    });
  }, []);

  useEffect(()=>{
    if(candidates){
      setFilteredCandidates(candidates);
    }
  },[candidates])

  function searchCandidate(){
    setFilteredCandidates(
      candidates.filter((candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  const loadEditCandidate = (candidate) => {
    setNewCandidate({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setSelectedCandidateId(candidate.id);
  };

  const clearForm = () => {
    setNewCandidate({ name: "", party: "", age: "" });
    setIsModalOpen(false);
    setIsEditing(false);
  }

  const openCandidateDetails = (candidate) =>{
    setSelectedCandidate(candidate);
    setIsDetailsPopupOpen(true);
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col justify-between items-center gap-4 mb-8 md:mb-12 ">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">CANDIDATES</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search candidate..."
            className="border rounded-md px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-4 justify-center mt-4 md:mt-0">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => searchCandidate()}
          >
            Search
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            + Add Candidate
          </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <CandidateDetailsCard key={candidate.id} onEdit={loadEditCandidate} candidate={candidate} onClick={() => openCandidateDetails(candidate)} />
          ))
        ) : (
          <LoadingSpinner className="min-h-[174px]"/>
        )}
      </div>
      <AddCandidateForm
        isOpen={isModalOpen}
        onClose={clearForm}
        newCandidate={newCandidate}
        isEditing={isEditing}
        selectedCandidateId ={selectedCandidateId}
      />

    <CandidateDetailsPopUpModal 
        isOpen={isDetailsPopupOpen} 
        onClose={() => setIsDetailsPopupOpen(false)} 
        candidate={selectedCandidate} 
      />
    </section>
  );
}

export default CandidateDetails;
