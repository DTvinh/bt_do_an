import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";


function Brand() {


    const params = useParams()
    const brandId = params.brandId;
    const [detailBrand, setDetailBrand] = useState()
    console.log(brandId)
    useEffect(() => {
        getBrand()
    }, [brandId])

    const getBrand = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/brand/${brandId}`)
            await setDetailBrand(res.data)
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    }
    return (

        <>
            {
                detailBrand ? (

                    <div className="flex mt-10">
                        <div className=" flex flex-col mx-auto">
                            <h1 className="text-2xl mb-10  m-auto"> Sản phẩm của thương hiệu của {detailBrand?.nameBrand}</h1>

                            <div className="grid grid-cols-4  gap-2 max-w-[1000px] m-auto">
                                {
                                    detailBrand.products.map((item) => (
                                        <>
                                            <ProductCard product={item} />
                                        </>
                                    )

                                    )
                                }
                            </div>

                        </div>
                    </div>
                ) : (<>

                </>)
            }
        </>
    );
}

export default Brand;