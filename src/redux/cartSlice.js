import { createSlice } from "@reduxjs/toolkit"



const CartSlice = createSlice({
    name: "cart",
    initialState: {
        addProductToCart: {
            success: false,
            isFetching: false,
            error: false
        },
        getCart: {
            success: false,
            cart: null,
            isFetching: false,
            error: false
        },
        deleteProduct: {
            isFetching: false,
            error: false,
            success: false
        }

    },
    reducers: {
        addProductToCartStart: (state) => {
            state.addProductToCart.isFetching = true;

        },
        addProductToCartSuccess: (state) => {
            state.addProductToCart.isFetching = false;
            state.addProductToCart.success = true;
            state.addProductToCart.error = false;
        },
        addProductToCartFailed: (state) => {
            state.addProductToCart.error = true;
            state.addProductToCart.success = false;
        },


        getCartStart: (state) => {

            state.getCart.isFetching = true;

        },
        getCartSuccess: (state, action) => {

            state.getCart.isFetching = false;
            state.getCart.cart = action.payload;
            state.getCart.success = true;


        },
        getCartFailed: (state) => {
            state.getCart.error = true;
        },
        deleteProductInCartStart: (state) => {
            state.deleteProduct.isFetching = true
        },
        deleteProductInCartSuccess: (state) => {
            state.deleteProduct.isFetching = false
            state.deleteProduct.success = true
        },
        deleteProductInCartFaile: (state) => {
            state.deleteProduct.isFetching = false;
            state.deleteProduct.error = true;


        }

    }

})


export const {
    addProductToCartStart,
    addProductToCartSuccess,
    addProductToCartFailed,
    getCartSuccess,
    getCartStart,
    getCartFailed,
    deleteProductInCartStart,
    deleteProductInCartSuccess,
    deleteProductInCartFaile



} = CartSlice.actions


export default CartSlice.reducer;