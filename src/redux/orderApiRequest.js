import axios from "axios"
import { createOrderFailed, createOrderStart, createOrderSuccess, getAllOrderFailed, getAllOrderStart, getAllOrderSuccess, getOrderFaile, getOrderSuccess } from "./orderSlice"




export const createOrder = async (dispatch, data) => {
    dispatch(createOrderStart())
    try {
        const res = await axios.post('http://localhost:8080/order/createOrder', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        dispatch(createOrderSuccess())
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(createOrderFailed())
    }

}


export const getAllOrder = async (dispatch) => {
    dispatch(getAllOrderStart())
    try {
        const res = await axios.get('http://localhost:8080/order')
        dispatch(getAllOrderSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(getAllOrderFailed())
    }
}


export const getOrderUser = async (dispatch, userId) => {

    try {
        const res = await axios.get(`http://localhost:8080/order/${userId}`)
        dispatch(getOrderSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(getOrderFaile())
    }
}

