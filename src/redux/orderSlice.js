import { createSlice } from "@reduxjs/toolkit"



const OrderSlice = createSlice({
    name: "Order",
    initialState: {
        createOrder: {
            success: false,
            isFetching: false,
            error: false
        },
        getAllOrder: {
            success: false,
            orders: null,
            isFetching: false,
            error: false
        },
        getOrder: {
            isFetching: false,
            orders: null,
            error: false
        }

    },
    reducers: {
        createOrderStart: (state) => {
            state.createOrder.isFetching = true;

        },
        createOrderSuccess: (state) => {
            state.createOrder.isFetching = false;
            state.createOrder.success = true;

            state.createOrder.error = false;
        },
        createOrderFailed: (state) => {
            state.createOrder.error = true;
        },


        getAllOrderStart: (state) => {

            state.getAllOrder.isFetching = true;

        },
        getAllOrderSuccess: (state, action) => {

            state.getAllOrder.isFetching = false;
            state.getAllOrder.orders = action.payload;
            state.getAllOrder.success = true;


        },
        getAllOrderFailed: (state) => {
            state.getAllOrder.error = true;
        },
        getOrderSuccess: (state, action) => {
            state.getOrder.orders = action.payload;
            state.getOrder.error = false;

        },
        getOrderFaile: (state) => {

            state.getOrder.error = true;
        }
    }

})


export const {
    createOrderStart,
    createOrderSuccess,
    createOrderFailed,
    getAllOrderSuccess,
    getAllOrderStart,
    getAllOrderFailed,
    getOrderSuccess,
    getOrderFaile

} = OrderSlice.actions


export default OrderSlice.reducer;