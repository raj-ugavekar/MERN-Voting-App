import React, { useEffect, useState } from "react";
import InputBox from "../../InputBox";
import service from "../../../services/config";
import { addCandidate, editCandidate } from "../../../store/candidateSlice";
import { useDispatch } from "react-redux";

function AddCandidateForm({ isOpen, onClose, newCandidate, isEditing, selectedCandidateId }) {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    age: ""
  });
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && newCandidate) {
      setFormData({
        name: newCandidate.name,
        party: newCandidate.party,
        age: newCandidate.age,
      });
    } else {
      setFormData({ name: "", party: "", age: "" });
    }
  }, [newCandidate, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateData =()=>{
    if(formData.name == ''){
          alert("Please enter your Candidate Name.");
          return;
    }
    if(formData.party == ''){
          alert("Please enter your Candidate Party.");
          return;
    }
    if(formData.age == ''){
          alert("Please enter Candidate Age.");
          return;
    }
  }

  const handleAddCandidate = () => {
    validateData();
    setLoading(true);
    if (formData.name && formData.party && formData.age) {
    if(confirm("Are you sure? want to add Candidate.")){
        service.addCandidate(formData).then((candiateData)=>{
          if(candiateData){
            setFormData({ name: "", party: "", age: "" });
            dispatch(addCandidate(candiateData));
            alert("Candidate Added Successfully");
            onClose();
          }
        })
        .finally(() => {
          setLoading(false);
        });
      }
    }
  };

  const handleEditCandidate = () => {
  validateData();
  setLoading(true);
    if (formData.name && formData.party && formData.age) {
      if(confirm("Are you sure? want to update candidate details.")){
        service.updateCandidate(selectedCandidateId , formData).then((candiateData)=>{
          if(candiateData){
            setFormData({ name: "", party: "", age: "" });
            dispatch(editCandidate(candiateData));
            alert("Candidate Updated Successfully");
            onClose();
          }
        })
        .finally(() => {
        setLoading(false);
      });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{isEditing ? "Edit Candidate" : "Add New Candidate"}</h2>
        <div className="flex flex-col gap-2">
          <InputBox
            type="text"
            name="name"                  
            placeholder="Candidate Name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name="party"                    
            placeholder="Party Name"
            value={formData.party}
            onChange={handleChange}
          />
          <InputBox
            type="number"
            name="age"               
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md" disabled={loading} onClick={onClose}>
            Cancel
          </button>
          {isEditing ? <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleEditCandidate}
            disabled={loading}
          >
            {loading ? 'Updating Candidate': 'Update'}
          </button> : <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleAddCandidate}
            disabled={loading}
          >
            {loading ? 'Adding Candidate': 'Add'}
          </button> }
        </div>
      </div>
    </div>
  );
}

export default AddCandidateForm;
