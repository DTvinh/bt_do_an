import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false,
        }
    },


    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;

        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error.true
        },

        // -----------------
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true
        },
        registerFailed: (state) => {
            state.register.success = false
            state.register.isFetching = false;
            state.register.error = true;
        },
        // -----------------
        logoutSuccess: (state) => {
            state.logout.error = false;
            state.logout.success = true
            state.login.currentUser = null;
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        logoutStart: (state) => {
            state.logout.isFetching = true;
            state.logout.error = false

        }

    }

})


export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerFailed,
    registerSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed

} = authSlice.actions;

export default authSlice.reducer
