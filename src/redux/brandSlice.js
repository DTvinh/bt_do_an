import { createSlice } from "@reduxjs/toolkit"



const BrandSlice = createSlice({
    name: "brand",
    initialState: {
        addBrand: {
            success: false,
            isFetching: false,
            error: false
        },
        getAllBrand: {
            success: false,
            allBrands: null,
            isFetching: false,
            error: false
        },
        delete: {
            isFetching: false,
            error: false
        }


    },
    reducers: {
        addBrandStart: (state) => {
            state.addBrand.isFetching = true;

        },
        addBrandSuccess: (state) => {
            state.addBrand.isFetching = false;
            // state.addBrand. = action.payload;
            state.addBrand.error = false;
        },
        addBrandfailed: (state) => {
            state.addBrand.error = true;
        },

        //get All-----------

        getAllBrandStart: (state) => {
            state.getAllBrand.isFetching = true;
        },
        getAllBrandSuccess: (state, action) => {
            state.getAllBrand.allBrands = action.payload;
            state.getAllBrand.success = true;
            state.getAllBrand.isFetching = false;
        },
        getAllBrandFailed: (state) => {
            state.getAllBrand.error = true;
        },
        //delete---------------------

        deleteBrandStart: (state) => {
            state.delete.isFetching = true
        },
        deleteBrandSucccess: (state) => {
            state.delete.isFetching = false
            state.delete.error = false;

        },
        deleteBrandErorr: (state) => {
            state.delete.error = true;
        }

    }
})
export const {
    addBrandStart,
    addBrandSuccess,
    addBrandfailed,
    getAllBrandStart,
    getAllBrandSuccess,
    getAllBrandFailed,
    deleteBrandStart,
    deleteBrandSucccess,
    deleteBrandErorr
} = BrandSlice.actions


export default BrandSlice.reducer;