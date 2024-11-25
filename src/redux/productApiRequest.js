import axios from "axios"
import { addProductfailed, addProductStart, addProductSuccess, deleteProductErorr, deleteProductStart, deleteProductSucccess, getAllProductFailed, getAllProductStart, getAllProductSuccess, updateProductErorr, updateProductStart, updateProductSuccess } from "./productSlice"
import { addBrandfailed, addBrandStart, addBrandSuccess, deleteBrandErorr, deleteBrandStart, deleteBrandSucccess, getAllBrandFailed, getAllBrandStart, getAllBrandSuccess } from "./brandSlice"
import { addProductToCartFailed, addProductToCartStart, addProductToCartSuccess, deleteProductInCartFaile, deleteProductInCartStart, deleteProductInCartSuccess, getCartFailed, getCartStart, getCartSuccess } from "./cartSlice"




export const getAllProducts = async (dispatch) => {
    dispatch(getAllProductStart())
    try {
        const res = await axios.get('http://localhost:8080/product')
        dispatch(getAllProductSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(getAllProductFailed())
    }

}


export const AddProduct = async (formData, dispatch) => {
    dispatch(addProductStart())
    try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post('http://localhost:8080/product/addProduct',
            formData,
            {
                header: { "Content-Type": "multipart/form-data" }
            }
        )
        dispatch(addProductSuccess())

        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        console.log()
        dispatch(addProductfailed())
    }

}
export const updateProduct = async (id, dispatch, data) => {
    dispatch(updateProductStart());
    try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.put(`http://localhost:8080/product/${id}`, data)
        dispatch(updateProductSuccess());

        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(updateProductErorr())
    };
}


export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.delete(`http://localhost:8080/product/delete/${id}`)
        dispatch(deleteProductSucccess());

        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(deleteProductErorr())
    };
}




export const getAllBrand = async (dispatch) => {
    dispatch(getAllBrandStart())
    try {
        const res = await axios.get('http://localhost:8080/brand')
        dispatch(getAllBrandSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(getAllBrandFailed())
    }

}

export const addBrand = async (dispatch, formData) => {
    dispatch(addBrandStart())
    try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post('http://localhost:8080/brand/addNewBrand',
            formData,
            {
                header: { "Content-Type": "multipart/form-data" }
            }
        )
        dispatch(addBrandSuccess())
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(addBrandfailed())
    }

}

export const deleteBrand = async (dispatch, id) => {
    try {
        dispatch(deleteBrandStart())
        // eslint-disable-next-line no-unused-vars
        const res = await axios.delete(`http://localhost:8080/brand/delete/${id}`
        )
        dispatch(deleteBrandSucccess())
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        dispatch(deleteBrandErorr())
    }

}





export const addToCart = async (userId, dispatch, product) => {
    try {
        dispatch(addProductToCartStart())
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post(`http://localhost:8080/cart/addToCart/${userId}`, product
        )
        dispatch(addProductToCartSuccess())
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        dispatch(addProductToCartFailed())
    }
}



export const deleteProductInCart = async (userId, dispatch, productId) => {
    try {
        dispatch(deleteProductInCartStart())
        // eslint-disable-next-line no-unused-vars
        const res = await axios.delete(`http://localhost:8080/cart/removeProduct/${userId}/${productId}`)
        dispatch(deleteProductInCartSuccess())
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        dispatch(deleteProductInCartFaile())
    }
}






export const getCart = async (userId, dispatch) => {
    try {
        dispatch(getCartStart())

        const res = await axios.get(`http://localhost:8080/cart/${userId}`
        )
        dispatch(getCartSuccess(res.data))
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        dispatch(getCartFailed())
    }
}