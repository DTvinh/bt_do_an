import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../../redux/productApiRequest";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer/Footer";
// import unorm from 'unorm';

function Category1() {
    const dispatch = useDispatch()
    const params = useParams()
    const sexName = params.sex;
    // const [detailBrand, setDetailBrand] = useState()
    const [listProduct, setListProduct] = useState([])
    const [category, SetCategory] = useState({})

    const products = useSelector((state) => state.products.getAllProduct.allProducts)
    // console.log(categoryId);
    useEffect(() => {
        getAllProducts(dispatch)
        getCategory()

    }, [sexName])

    const getCategory = async () => {
        if (sexName == "nu") {
            setListProduct(products?.filter(e => e.objectUsed == "Nữ"))
            SetCategory({
                name: "Đồng hồ nữ",
                image: "https://image.donghohaitrieu.com/wp-content/uploads/2024/11/dong-ho-nu.jpg"
            })
        }
        else if (sexName == "nam") {
            setListProduct(products?.filter(e => e.objectUsed == "Nam"))
            SetCategory({
                name: "Đồng hồ Nam",
                image: "https://image.donghohaitrieu.com/wp-content/uploads/2024/11/dong-ho-nam-1.jpg"
            })
        }
    }

    return (<>
        <div className="flex mt-10">
            <div className=" flex flex-col mx-auto">
                <h1 className="text-2xl mb-10  m-auto"> {category?.name} </h1>
                <img className="m-auto w-[800px] h-[400px]" src={category?.image} alt="" />
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


export default Category1;