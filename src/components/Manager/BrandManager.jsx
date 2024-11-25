// import { MdDelete } from "react-icons/md";
// import { FaPen } from "react-icons/fa";
import { FaStarOfLife } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

import { useEffect, useState } from "react";
import { addBrand, getAllBrand, deleteBrand } from "../../redux/productApiRequest";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";



function BrandManager() {


    const dispatch = useDispatch()
    const [products, setProducts] = useState();
    const [openAdd, setOpenAdd] = useState(false);


    const [nameBrand, setNameBrand] = useState("");
    const [imageLogo, setImageLogo] = useState();



    const allBrand = useSelector((state) => state.brand.getAllBrand.allBrands)

    useEffect(() => {
        getAllBrand(dispatch)


    }, [])

    const showProduct = async (id) => {
        console.log(id)
        try {
            const res = await axios.get(`http://localhost:8080/brand/${id}`)
            await setProducts(res.data.products)
            // console.log(res.data);

        } catch (error) {
            console.log(error);
        }

    }
    const handleAddbrand = async () => {
        const formData = new FormData();
        formData.append("nameBrand", nameBrand);
        if (imageLogo !== undefined) {
            formData.append("image", imageLogo);
            console.log(imageLogo)
        }
        await addBrand(dispatch, formData);
        setOpenAdd(false);
        await getAllBrand(dispatch);

    }
    const hendleDeleteBrand = async (id) => {
        try {
            await deleteBrand(dispatch, id)
            await getAllBrand(dispatch);
            // console.log(id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="  ml-72 mt-20">
                <div className="m-10 w-[1200px] h-14 bg-white flex items-center">
                    <div className=" bg-red-400 rounded-xl w-44 mr-20 ml-20" >
                        <button onClick={() => setOpenAdd(true)} className=" text-white"> + Thêm nhãn hàng mới  </button>
                    </div>
                </div>

                <div className="w-[1200px] bg-white ml-10">
                    <div className=" grid grid-cols-7 gap-2 w-full">

                        {allBrand?.map((item, index) => (
                            <>
                                <div key={index} className="border hover:border-2 hover:border-primary group rounded-xl  h-32 relative hover:bg-slate-500 overflow-hidden">
                                    <img className="-z-10 w-full h-full " src={item?.image} alt="" />
                                    <span className=" absolute top-1 shadow-slate-950 left-full  group-hover:left-1"> {item.nameBrand} </span>
                                    <button onClick={() => { showProduct(item._id) }} className=" z-10 top-3/4 left-full group-hover:left-7  bg-primary text-white w-[110px] absolute rounded-xl active:bg-black">Xem sản phẩm </button>
                                    <button onClick={() => { hendleDeleteBrand(item._id) }} className=" z-10 top-0 right-full group-hover:right-0  bg-red-300 hover:bg-red-400 text-white w-[30px] absolute rounded-bl-xl active:bg-black">Xoá </button>

                                </div>

                            </>


                        ))}
                    </div>

                </div>
                {
                    openAdd ? (<>
                        <div className="mt-14 w-[600px] h-[100vh] bg-white top-0 right-0 fixed overflow-scroll slide-in">
                            <div className="w-full flex justify-between border-b-2">
                                <label htmlFor="" >Thêm thương hiệu </label>
                                <FaXmark onClick={() => { setOpenAdd(false) }} className="  text-2xl  w-8 h-8 hover:bg-slate-300" />
                            </div>
                            <div className="ml-5">

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Tên thương hiệu :</span></div>
                                    <input onChange={(e) => setNameBrand(e.target.value)} type="text" placeholder=' Nhập tên thương hiệu' className=" w-80 border-2" />
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Chọn Logo thương hiệu :</span></div>
                                    <input onChange={(e) => setImageLogo(e.target.files[0])} type="file" placeholder='chọn hình ảnh' className=" w-80 border-2" />
                                </div>

                            </div>
                            <div className=" mt-20 mb-10 flex justify-around">
                                <button className="bg-red-400 w-20 rounded-xl h-10"> Huỷ</button>

                                <button onClick={handleAddbrand} className=" bg-green-400 w-40 rounded-xl right-0  h-10"> Hoàn thành</button>
                            </div>
                        </div>


                    </>) : (
                        <>

                        </>
                    )
                }


                <div className="ml-10 bg-white mt-10 w-[1200px]">
                    <h2> sản phẩm </h2>
                    <div className="w-full">
                        <table className="w-full pl-5 text-left bg-white ">
                            <thead>

                                <tr className="border-b  border-black">
                                    <th>ID</th>
                                    <th> Ảnh </th>
                                    <th>Tên sản phẩm </th>
                                    <th>Giá gốc</th>
                                    <th> Số Lượng  </th>
                                    {/* <th>Action</th> */}
                                </tr>

                            </thead>
                            <tbody>
                                {products?.map((product, index) => (

                                    <>
                                        <tr className="border-b border-black h-20">
                                            <td>{index}</td>
                                            <td>
                                                <img className=" w-16 h-16" src={product.images[0]} alt="" />
                                            </td>
                                            <td className="max-w-[400px] line-clamp-2 ">{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.minimumOrderQuantity}</td>
                                            {/* <td className="flex flex-col h-full item-center justify-center">
                                                <button className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl"> <FaPen className=" absolute m-1" /> Xem chi tiết </button>

                                                <button className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl "> <MdDelete className="absolute m-1" />  Xoá </button>
                                            </td> */}
                                        </tr>
                                    </>

                                ))}


                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    );
}

export default BrandManager;