import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:[],
    reducers:{
        setInitialUsers:(state,action)=>{
            return action.payload;
        },
        addUser:(state,action)=>{
            state.push(action.payload);
        },
        removeUser:(state,action)=>{
            return state.filter((user)=> user.id != action.payload)
        },
        editUser:(state,action)=>{
            const updateUser = action.payload;
            const index = state.findIndex(user => user.id === updateUser.id);
            if (index !== -1) {
                state[index] = updateUser;
            }
        },
        votedUser: (state, action) => {
            const user = state.find(user => user.id === action.payload);
            if (user) {
                user.isVoted = true;
            }
        }
    }
})

export const {setInitialUsers, addUser, removeUser , editUser,votedUser} = userSlice.actions;

const userSliceReducer = userSlice.reducer;

export default userSliceReducer;