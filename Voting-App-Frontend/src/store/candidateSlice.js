import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name:"candidate",
    initialState:{candidates: [],
        voteCounts: []},
    reducers:{
        setInitialCandidates: (state,action) =>{
            state.candidates = action.payload;
        },
        setIntialVoteCounts:(state,action)=>{
            state.voteCounts = action.payload;
        },
        addCandidate:(state,action)=>{
            state.candidates.push(action.payload);
        },
        removeCandidate:(state,action)=>{
            state.candidates = state.candidates.filter(candidate => candidate.id !== action.payload);
        },
        editCandidate:(state,action)=>{
            const updatedCandidate = action.payload;
            const candidates = state.candidates;
            const index = candidates.findIndex(candidate => candidate.id === updatedCandidate.id);
          
            if (index !== -1) {
                candidates[index] = updatedCandidate;
            }
        },
        voteCandidate: (state, action) => {
            const candidate = state.candidates.find(candidate => candidate.id === action.payload);
            if (candidate) {
                candidate.voteCount = candidate.voteCount + 1;
            }
            const vote = state.voteCounts.find(vote => vote.id === action.payload);
            if (vote) {
                vote.count = vote.count + 1;
            }
        }
    }
})

export const {setInitialCandidates , removeCandidate, addCandidate , editCandidate, voteCandidate, setIntialVoteCounts} = candidateSlice.actions;

const candidateSliceReducer = candidateSlice.reducer;

export default candidateSliceReducer;