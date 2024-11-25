import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../redux/productApiRequest";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer/Footer";
// import unorm from 'unorm';

function Category() {
    const dispatch = useDispatch()
    const params = useParams()
    const categoryId = params.categoryId;
    // const [detailBrand, setDetailBrand] = useState()
    const [listProduct, setListProduct] = useState([])
    const [category, SetCategory] = useState([])
    const products = useSelector((state) => state.products.getAllProduct.allProducts)
    // console.log(categoryId);
    useEffect(() => {
        getAllProducts(dispatch)
        getCategory()

    }, [categoryId])

    const getCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/category/${categoryId}`)
            await SetCategory(res.data)
            // const result = await products?.filter(product =>
            //     unorm.nfd(product.name).replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(
            //       unorm.nfd(category).replace(/[\u0300-\u036f]/g, '').toLowerCase()
            //     )
            //   );
            const result = await products?.filter(product => product.category == categoryId);
            await setListProduct(result)
            console.log(result)
            console.log(category[0].nameCategory)
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div className="flex mt-10">
            <div className=" flex flex-col mx-auto">
                <h1 className="text-2xl mb-10  m-auto"> {category[0]?.nameCategory} </h1>
                <img className="m-auto w-[800px] h-[400px]" src={category[0]?.image} alt="" />
                <h1 className="text-xl mt-5"> Sản phẩm </h1>

                {listProduct ? (

                    <div className="grid grid-cols-4  mt-10 gap-2 max-w-[1000px] m-auto">
                        {
                            listProduct?.map((item) => (
                                <>
                                    <ProductCard product={item} />
                                </>
                            ))
                        }
                    </div>
                ) : (<>
                    <h1 className=" m-auto">Không có sản phẩm nào </h1>
                </>)}

            </div>
        </div>
        <Footer />

    </>);
}


export default Category;