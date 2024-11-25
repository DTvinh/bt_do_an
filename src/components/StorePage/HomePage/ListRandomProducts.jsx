import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../redux/productApiRequest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ListRandomProducts() {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.products.getAllProduct.allProducts)
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {

        getAllProducts(dispatch)
        randomProduct()
    }, [])
    // console.log(products)


    const randomProduct = async () => {
        setListProduct([])
        const amount = 4;
        for (var i = 0; i < amount; i++) {
            let random = products[Math.floor(Math.random() * products.length)];
            while (listProduct.some(e => e._id == random._id)) {
                random = products[Math.floor(Math.random() * products.length)];
                console.log(random)
            }
            setListProduct((p) => [...p, random])

        }


    }

    return (
        <>
            <div className="  bg-white p-5 border-b">

                {/* <h1 className="text-4xl  font-bold mb-10 text-center text-gray-700 ">Đồng hồ bán chạy </h1> */}
                <div className="grid grid-cols-4 gap-2 max-w-[1000px] m-auto">
                    {
                        listProduct?.map((item) => (
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

export default ListRandomProducts;