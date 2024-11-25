import { createSlice } from "@reduxjs/toolkit"



const ProductSlice = createSlice({
    name: "product",
    initialState: {
        addProduct: {
            success: false,
            isFetching: false,
            error: false
        },
        getAllProduct: {
            success: false,
            allProducts: null,
            isFetching: false,
            error: false
        },
        delete: {
            isFetching: false,
            error: false
        },
        update: {
            isFetching: false,
            success: false,
            error: false
        }


    },
    reducers: {
        addProductStart: (state) => {
            state.addProduct.isFetching = true;

        },
        addProductSuccess: (state) => {
            state.addProduct.isFetching = false;
            // state.addProduct. = action.payload;
            state.addProduct.error = false;
        },
        addProductfailed: (state) => {
            state.addProduct.error = true;
        },

        //get All-----------

        getAllProductStart: (state) => {
            state.getAllProduct.isFetching = true;
        },
        getAllProductSuccess: (state, action) => {
            state.getAllProduct.allProducts = action.payload;
            state.getAllProduct.success = true;
            state.getAllProduct.isFetching = false;
        },
        getAllProductFailed: (state) => {
            state.getAllProduct.error = true;
        },
        //delete---------------------

        deleteProductStart: (state) => {
            state.delete.isFetching = true
        },
        deleteProductSucccess: (state) => {
            state.delete.isFetching = false
        },
        deleteProductErorr: (state) => {
            state.delete.error = true;
        },
        // -------------
        updateProductStart: (state) => {
            state.update.isFetching = true;
        },
        updateProductSuccess: (state) => {
            state.update.isFetching = false;
            state.update.success = true;
        },
        updateProductErorr: (state) => {
            state.update.isFetching = false;
            state.update.error = true;
        }

    }
})
export const {
    addProductStart,
    addProductSuccess,
    addProductfailed,
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
    deleteProductStart,
    deleteProductSucccess,
    deleteProductErorr,
    updateProductStart,
    updateProductSuccess,
    updateProductErorr
} = ProductSlice.actions


export default ProductSlice.reducer;