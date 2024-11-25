import { createSlice } from "@reduxjs/toolkit"



const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },
        delete: {
            isFetching: false,
            error: false
        }

    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;

        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getUsersError: (state) => {
            state.users.error = true;
        },

        deleteUserStart: (state) => {
            state.delete.isFetching = true
        },
        deleteUserSucccess: (state) => {
            state.delete.isFetching = false
        },
        deleteUserErorr: (state) => {
            state.delete.error = true;
        }


    }
})
export const {
    getUsersStart, getUsersSuccess, getUsersError, deleteUserStart, deleteUserSucccess, deleteUserErorr
} = userSlice.actions


export default userSlice.reducer;