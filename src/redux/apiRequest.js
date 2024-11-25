import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerFailed, registerSuccess } from "./authSlice";
import { getUsersStart, getUsersSuccess, getUsersError, deleteUserStart, deleteUserSucccess, deleteUserErorr } from "./userSlice"


export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:8080/auth/login", user);
        dispatch(loginSuccess(res.data))
        navigate("/");
        // eslint-disable-next-line no-unused-vars
    } catch (error) {

        dispatch(loginFailed());
    }
}




export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await axios.get('http://localhost:8080/user', {
            headers: { token: `Beare ${accessToken}` }
        })
        dispatch(getUsersSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(getUsersError())
    }
}


export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post('http://localhost:8080/auth/register', user)
        dispatch(registerSuccess());

        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(registerFailed())
    };
}

export const deleteUser = async (id, dispatch, accessToken) => {
    dispatch(deleteUserStart());
    try {
        const res = await axios.delete(`http://localhost:8080/user/${id}`, {
            headers: { token: `Beare ${accessToken}` }
        })
        dispatch(deleteUserSucccess());

        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(deleteUserErorr())
    };
}
