import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userSlice from './userSlice';
import productSlice from './productSlice';
import brandSlice from './brandSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: userSlice,
        products: productSlice,
        brand: brandSlice,
        cart: cartSlice,
        order: orderSlice
    }
})