
// import { Outlet, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";
import './inSlice.scss'
import { useEffect, useState } from "react";
import { AddProduct, getAllProducts, deleteProduct } from "../../redux/productApiRequest";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SuccessErrorMessage from "../SuccessErrorMessage";
// import { set } from "mongoose";


function ProductManager() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [thickness, setThickness] = useState("");
    const [faceSize, setFaceSize] = useState("");
    const [objectUsed, setObjectUsed] = useState("");
    const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
    const [warrantyInformation, setWarrantyInformation] = useState("");
    const [brand, setBrand] = useState("");
    const [shellMaterial, setShellMaterial] = useState("");
    const [promotion, setPromotion] = useState("");
    const [machineType, setMachineType] = useState("")
    const [imageProduct1, setImageProduct1] = useState();
    const [imageProduct2, setImageProduct2] = useState();
    const [imageProduct3, setImageProduct3] = useState();


    const [allBrands, setAllBrands] = useState([])
    const [allCategoris, setAllCategoris] = useState()
    const [openSliceAdd, setOpenSliceadd] = useState(false);
    const [openDetail, setOpenDetail] = useState(false)
    // const [products, setProduct] = useState(useSelector((state) => state.products.getAllProduct.allProducts));
    const products = useSelector((state) => state.products.getAllProduct.allProducts)

    // const allproduct = 

    const dispatch = useDispatch()

    useEffect(() => {

        getAllProducts(dispatch)
        // setProduct()
        // setProduct(allproduct)
        getBrands();
        getCategoris()

    }, [])

    // console.log(allBrands)
    const getBrands = async () => {
        const res = await axios.get('http://localhost:8080/brand')
        if (res?.data) {
            setAllBrands(res.data)
        }
    }

    const getCategoris = async () => {
        const res = await axios.get('http://localhost:8080/category')
        if (res?.data) {
            setAllCategoris(res.data)
        }
    }
    const closeSlice = () => {
        setOpenDetail(false)
        setOpenSliceadd(false)
    }

    const openSlice = async () => {
        await setName("");
        await setPrice("");
        await setCategory("")
        await setBrand("");
        await setMinimumOrderQuantity("");
        await setMachineType("");
        await setShellMaterial("");
        await setFaceSize("")
        await setPromotion("");
        await setWeight("");
        await setThickness("")
        await setWarrantyInformation("");
        await setDescription("")
        setOpenSliceadd(true)

    }


    const hendleAddProduct = async () => {

        const formData = new FormData();

        await formData.append("name", name);
        await formData.append("description", description);
        await formData.append("category", category);
        await formData.append("price", price);
        await formData.append("weight", weight);
        await formData.append("thickness", thickness);
        await formData.append("faceSize", faceSize);
        await formData.append("objectUsed", objectUsed);
        await formData.append("minimumOrderQuantity", minimumOrderQuantity);
        await formData.append("warrantyInformation", warrantyInformation);
        await formData.append("brand", brand);
        await formData.append("shellMaterial", shellMaterial);
        await formData.append("promotion", promotion);
        await formData.append("machineType", machineType);



        if (imageProduct1 !== undefined) {
            await formData.append("image", imageProduct1);
        }
        if (imageProduct2 !== undefined) {
            await formData.append("image", imageProduct2);
        }
        if (imageProduct3 !== undefined) {
            await formData.append("image", imageProduct3);
        }
        await AddProduct(formData, dispatch)
        getAllProducts(dispatch)
        setOpenSliceadd(false);
    }

    const hendleDeleteProduct = (id) => {
        deleteProduct(id, dispatch)
        getAllProducts(dispatch)

    }
    const hendleUpdateProduct = async (product) => {

        console.log(product)


    }
    const hendleDetailProduct = async (product) => {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category)
        setBrand(product.brand._id);
        setMinimumOrderQuantity(product.minimumOrderQuantity);
        setMachineType(product.machineType);
        setShellMaterial(product.shellMaterial);
        setFaceSize(product.faceSize)
        setPromotion(product.promotion);
        setWeight(product.weight);
        setThickness(product.thickness)
        setWarrantyInformation(product.warrantyInformation);
        setDescription(product.description)
        setObjectUsed(product.objectUsed)
        setOpenDetail(true)
    }


    const hendUpdateProduct = () => {
        newUpdate = {
            name: name,
            description: description,
            category: category,
            price: price,
            weight: weight,
            thickness: thickness,
            faceSize: faceSize,
            objectUsed: objectUsed,
            minimumOrderQuantity: minimumOrderQuantity,
            warrantyInformation: warrantyInformation,
            brand: brand,
            shellMaterial: shellMaterial,
            promotion: promotion,
            machineType: machineType
        }



    }



    return (<>
        <div className="  ml-72 mt-20 ">
            <div className="mt-10  h-14 items-center select-none bg-white flex justify-between">
                <div className="">
                    <input type="text" placeholder=" Tìm kiếm sản phẩm " className="select-none m-32 border-2 rounded-md" />
                </div>

                <div className=" bg-red-400 rounded-xl w-44 mr-20" onClick={() => openSlice()}>
                    <span className=" text-white"> + Thêm sản phầm mới </span>
                </div>
            </div>

            <div className="mt-10">
                <div className="">
                    <table className="w-full pl-5 text-left bg-white ">
                        <thead>

                            <tr className="border-b  border-black">
                                <th>ID</th>
                                <th> Ảnh </th>
                                <th>Tên sản phẩm </th>
                                <th>Giá gốc</th>
                                <th> Giảm giá </th>
                                <th> Thương hiệu</th>
                                <th> Số lượng còn</th>
                                <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {products?.map((product, index) => (

                                <>
                                    <tr key={index} className="border-b border-black h-20">
                                        <td>{index}</td>
                                        <td>
                                            <img className=" w-16 h-16" src={product.images[0]} alt="" />
                                        </td>
                                        <td className=" overflow-hidden max-w-[300px] line-clamp-2">{product?.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.promotion}%</td>
                                        <td>{product.brand?.nameBrand}</td>
                                        <td>{product.minimumOrderQuantity}</td>
                                        <td className="flex flex-col h-full item-center justify-center">
                                            <button onClick={() => hendleDetailProduct(product)} className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl"> <FaPen className=" absolute m-1" /> Xem chi tiết </button>

                                            <button onClick={() => hendleDeleteProduct(product._id)} className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl "> <MdDelete className="absolute m-1" />  Xoá </button>
                                        </td>
                                    </tr>
                                </>

                            ))}


                        </tbody>
                    </table>


                </div>

            </div>
            {
                openDetail || openSliceAdd ?
                    (<>
                        <div className="mt-14 w-[600px] h-[100vh] shadow-2xl bg-white top-0 right-0 fixed overflow-scroll slide-in">
                            <div className="w-full flex justify-between border-b-2">
                                {openDetail ? (<label htmlFor="" > Chi tiết sản phẩm</label>) : (<label htmlFor="" > Tạo sản phẩm mới</label>)}
                                <FaXmark onClick={() => closeSlice()} className="  text-2xl  w-8 h-8 hover:bg-slate-300" />
                            </div>

                            <div className="ml-5">

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Tên sản phẩm :</span></div>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder=' Nhập tên sản phẩm ' className=" w-80 border-2" />
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Chọn thương hiệu:</span></div>
                                    <select onClick={(e) => setBrand(e.target.value)} name="" id="" className=" w-60 border-2 overflow-y-auto" >
                                        <option value=""></option>
                                        {allBrands?.map((item, index) => (

                                            <option key={index} value={item._id}> {item.nameBrand} </option>

                                        )

                                        )}
                                        {/* <option value=""> Casino </option> */}

                                    </select>
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Giá  :</span></div>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder=' Nhập giá ' className=" w-80 border-2" />
                                </div>
                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Số lượng  :</span></div>
                                    <input value={minimumOrderQuantity} onChange={(e) => setMinimumOrderQuantity(e.target.value)} type="number" placeholder=' Nhập số lượng ' className=" w-80 border-2" />
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Loại  :</span></div>
                                    <select onClick={(e) => setCategory(e.target.value)} name="" id="" className="w-60 border-2" >
                                        <option value=""></option>

                                        {allCategoris?.map((item, index) => (

                                            <option key={index} value={item._id}> {item.nameCategory} </option>

                                        )

                                        )}
                                        {/* <option value="Đồng hồ điện tử "> Đồng hồ điện tử  </option> */}
                                        {/* <option value="Đồng hồ thông minh "> Đồng hồ thông minh </option>
                                        <option value="Dây da">phụ kiện đồng hồ</option>
                                        <option value="Trang sức">Trang sức</option> */}

                                    </select>
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Loại máy   :</span></div>
                                    {/* <select onClick={(e) => setMachineType(e.target.value)} name="" id="" className="w-60 border-2" >
                                        <option value=""></option>
                                        <option value="pin con thỏ"> pin con thỏ </option>
                                        <option value="động cơ"> động cơ   </option>
                                    </select> */}
                                    <input value={machineType} onChange={(e) => setMachineType(e.target.value)} type="text" placeholder=' Nhập loại máy ' className=" w-80 border-2" />


                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>khuyến mại (%) :</span></div>
                                    <input value={promotion} onChange={(e) => setPromotion(e.target.value)} type="number" placeholder='Nhập khuyến mại sản phẩm (nếu có )' className=" w-80 border-2 rounded-md appearance-auto" />
                                </div>
                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Đối tượng sử dụng :</span></div>
                                    {/* <input onChange={(e) => setObjectUsed(e.target.value)} type="text" placeholder='Đối tượng sử dụng' className=" w-80 border-2" /> */}
                                    <select onClick={(e) => setObjectUsed(e.target.value)} name="" id="" className="w-60 border-2" >
                                        <option value=""></option>
                                        <option value="Nam">Nam </option>
                                        <option value="Nữ">Nữ </option>
                                        <option value="Đôi">Đôi </option>
                                    </select>
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Nhập kích thước sản phẩm :</span></div>
                                    <input value={faceSize} onChange={(e) => setFaceSize(e.target.value)} type="text" placeholder='kích thước mặt ' className=" w-80 border-2" />
                                    <input value={weight} onChange={(e) => setWeight(e.target.value)} type="text" placeholder='khối lượng' className=" w-80 border-2" />
                                    <input value={thickness} onChange={(e) => setThickness(e.target.value)} type="text" placeholder='độ dày' className=" w-80 border-2" />
                                </div>
                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Chất liệu dây </span></div>
                                    <input value={shellMaterial} onChange={(e) => setShellMaterial(e.target.value)} type="text" placeholder='Nhập chất liệu dây ' className=" w-80 border-2" />
                                </div>

                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Thời gian bảo hành :</span></div>
                                    <input value={warrantyInformation} onChange={(e) => setWarrantyInformation(e.target.value)} type="text" placeholder='Nhập thời gian bảo hành ' className=" w-80 border-2" />
                                </div>
                                {
                                    openDetail ? (<> </>) : (
                                        <div className="flex-col flex mt-5 ml-4">
                                            <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Chọn ảnh : </span></div>
                                            <div className="flex">
                                                <div className="mt-2 w-[160px] flex flex-col items-center">
                                                    <label htmlFor="image1" className="bg-green-500 text-white py-1 mt rounded-lg cursor-pointer hover:bg-green-600">
                                                        Chọn ảnh 1
                                                    </label>
                                                    <input type="file" id="image1" onChange={(e) => setImageProduct1(e.target.files[0])} placeholder='chọn ảnh ' className=" hidden w-[100px] border-2 " />
                                                    {imageProduct1 ? (
                                                        <img src={URL.createObjectURL(imageProduct1)} alt=" ảnh 1" className=" mt-2 w-[130px] h-[130px] border" />

                                                    ) : (
                                                        <img src="" alt="ảnh 1" className=" mt-2 w-[130px] h-[130px] border" />
                                                    )}
                                                </div>
                                                <div className="mt-2 w-[160px] flex flex-col items-center">

                                                    <label htmlFor="image2" className="bg-green-500 text-white py-1 mt rounded-lg cursor-pointer hover:bg-green-600">
                                                        Chọn ảnh 2
                                                    </label>
                                                    <input type="file" id="image2" onChange={(e) => setImageProduct2(e.target.files[0])} placeholder='chọn ảnh 2 ' className=" hidden w-[100px] border-2" />
                                                    {imageProduct2 ? (
                                                        <img src={URL.createObjectURL(imageProduct2)} alt=" ảnh 2" className=" mt-2 w-[130px] h-[130px] border" />

                                                    ) : (
                                                        <img src="" alt="ảnh 2" className=" mt-2 w-[130px] h-[130px] border" />
                                                    )}
                                                </div>
                                                <div className="mt-2 w-[160px] flex flex-col items-center">

                                                    <label htmlFor="image3" className="bg-green-500 text-white py-1 mt rounded-lg cursor-pointer hover:bg-green-600">
                                                        Chọn ảnh 3
                                                    </label>
                                                    <input type="file" id="image3" onChange={(e) => setImageProduct3(e.target.files[0])} placeholder='chọn ảnh 3' className=" hidden w-[100px] border-2" />
                                                    {imageProduct3 ? (
                                                        <img src={URL.createObjectURL(imageProduct3)} alt=" ảnh 1" className=" mt-2 w-[130px] h-[130px] border" />

                                                    ) : (
                                                        <img src="" alt="ảnh 3" className=" mt-2 w-[130px] h-[130px] border" />
                                                    )}
                                                </div>


                                            </div>
                                        </div>
                                    )
                                }
                                <div className="flex-col flex mt-5 ml-4">
                                    <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Mô tả : </span></div>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 w-full" rows="4" placeholder="Nhập mô tả sản phẩm tại đây"></textarea>

                                </div>
                                <div className=" mt-20 mb-10 flex justify-around">
                                    <button onClick={() => closeSlice()} className="bg-red-400 mb-10 w-20 rounded-xl h-10"> Huỷ</button>
                                    {openDetail ? (
                                        <button className=" bg-green-400 w-40 rounded-xl right-0  h-10">Sửa </button>
                                    ) : (

                                        <button onClick={hendleAddProduct} className=" bg-green-400 w-40 rounded-xl right-0  h-10"> Hoàn thành</button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </>)
                    : (<></>)
            }


        </div>
        {/* <SuccessErrorMessage /> */}

    </>);
}

export default ProductManager;