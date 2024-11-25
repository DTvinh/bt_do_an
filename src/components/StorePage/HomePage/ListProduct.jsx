import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../redux/productApiRequest";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ListProduct() {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.getAllProduct.allProducts)

    useEffect(() => {

        getAllProducts(dispatch)
    }, [])
    // console.log(products)

    return (
        <>
            <div className=" m-20   bg-white p-5 border-b">

                <h1 className="text-4xl  font-bold mb-10 text-center text-gray-700 ">Đồng hồ bán chạy </h1>
                <div className="grid grid-cols-4 gap-2 max-w-[1000px] m-auto">
                    {
                        products?.map((item) => (
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