import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../redux/productApiRequest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function ListProduct() {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.getAllProduct.allProducts)
    const [productPromotion, setProductPromotion] = useState()
    // const [sliceProduct, setSliceProduct] = useState()

    useEffect(() => {
        getAllProducts(dispatch)
        getAllProductPromotion()
    }, [])

    const getAllProductPromotion = async () => {
        await getAllProducts(dispatch)
        await setProductPromotion(products?.filter((e) => e.promotion != "" || e.promotion > 0))
        console.log(productPromotion)
    }

    // const getLimitProduct = async () => {


    // }

    return (
        <>
            <div className=" m-20 bg-white p-5 border-b">

                <h1 className="text-4xl font-bold mb-10 text-center text-gray-700 ">Sản phảm giảm giá</h1>
                <div className="grid grid-cols-4 gap-2 max-w-[1000px] m-auto">
                    {
                        productPromotion?.map((item) => (
                            <>
                                <ProductCard product={item} />
                            </>
                        )

                        )
                    }
                </div>


            </div>

        </>
    );
}

export default ListProduct;