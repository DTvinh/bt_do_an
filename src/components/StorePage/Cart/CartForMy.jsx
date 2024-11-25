import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { deleteProductInCart, getCart } from "../../../redux/productApiRequest";
import { useDispatch, useSelector } from "react-redux";

import Order from "./Order";
import axios from "axios";



function CartForMy() {


    const params = useParams();
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(params.userId)
    // const [products, setProducts] = useState();
    const inforCart = useSelector((state) => state.cart.getCart.cart)
    const [totalPrice, setTotalPrice] = useState(0);
    const [openOrder, setOpenOrder] = useState(false)
    // const [ListProducts, setListProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {

        getCart(userId, dispatch)

    }, [])

    const hendlePay = async () => {
        // setListProducts([])
        // await console.log(ListProducts)

        await setOpenOrder(true)
        // console.log(selectedProducts);

    }


    // Hàm để xử lý sự thay đổi checkbox
    const handleCheckboxChange = async (e, product) => {

        if (e.target.checked) {
            // Nếu checkbox được tích, thêm sản phẩm vào mảng selectedProducts
            await setSelectedProducts((prevSelected) => [...prevSelected, product]);

        } else {


            await setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id !== product)
            );

        }
        // await totalMoney();
    };

    const handleSelectAllChange = async (e) => {
        if (e.target.checked) {

            await setSelectedProducts(inforCart[0]?.products);

        } else {

            await setSelectedProducts([]);
        }


    };


    const checkSelect = (id) => {

        return selectedProducts.some(item => item.productId._id == id)
    }


    // const totalMoney = async () => {
    //     let sumTotal = 0
    //     if (selectedProducts.length <= 0) {
    //         setTotalPrice(0)
    //         // sumTotal = 0
    //     }
    //     await selectedProducts.forEach((product => {
    //         // setTotalPrice(totalPrice + product.price)
    //         if (product.promotion == 0 || product.promotion == null) {
    //             sumTotal += product.price
    //             // setTotalPrice(totalPrice + product.price)
    //         } else {
    //             let result = product.price - (product.price * product.promotion / 100)
    //             sumTotal += result
    //             // setTotalPrice(totalPrice + result)
    //         }

    //     }))
    //     await setTotalPrice(sumTotal)

    // }
    const hendleIncrease = async (data) => {
        // console.log(data)

        if (data.quantity < data.productId.minimumOrderQuantity) {
            const newData = await {
                productId: data.productId._id,
                newQuantity: data.quantity + 1
            }
            await callApiUpdateQuantity(newData);
            await getCart(userId, dispatch)
            await setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id.productId._id !== data.productId._id)
            );

        }
    }
    const hendleDecrease = async (data) => {
        // console.log(data)

        if (data.quantity > 1) {
            const newData = await {
                productId: data.productId._id,
                newQuantity: data.quantity - 1
            }
            await callApiUpdateQuantity(newData);
            await getCart(userId, dispatch)
            await setSelectedProducts((prevSelected) =>
                prevSelected.filter((id) => id.productId._id !== data.productId._id)
            );

        }

    }



    const callApiUpdateQuantity = async (data) => {
        try {
            const res = await axios.put(`http://localhost:8080/cart/updateQuantity/${inforCart[0]._id}`, data)
            console.log(res.data)
        } catch (error) {
            console.log("khong update ddc")
        }

    }


    const hendleDeleteProduct = async (productId) => {
        try {
            await deleteProductInCart(userId, dispatch, productId);
            await getCart(userId, dispatch)
        } catch (error) {
            console.log(error)
        }
    }



    const hendleClickCloseOrder = () => {
        return setOpenOrder(false);

    }
    return (

        <>
            {
                inforCart ? (<>
                    <div className=" flex">
                        <div className="max-w-[1200px] w-[1200px] m-auto">
                            <div className="w-full">

                                <button className="p-10 text-xl"> Giỏ hàng </button>
                                <table className="w-full pl-5 text-left bg-white ">
                                    <thead>

                                        <tr className="border-b  border-black">
                                            <th></th>
                                            <th> Ảnh </th>
                                            <th>Tên sản phẩm </th>
                                            <th>Đơn giá </th>
                                            <th>Số lượng </th>
                                            <th>Tổng tiền </th>
                                            <th></th>


                                        </tr>

                                    </thead>
                                    <tbody>
                                        {inforCart[0]?.products?.map((data, index) => (
                                            <>
                                                <tr key={index} className="border-b pt-10 border-gray-400 h-32">
                                                    <td className="pl-2 pr-2"> <input type="checkbox"
                                                        className="w-5 h-5"
                                                        onChange={(e) => handleCheckboxChange(e, data)} // Gọi hàm xử lý sự kiện khi checkbox thay đổi
                                                        // onChange={() => setstateCheck(!statecheck)}
                                                        checked={checkSelect(data.productId._id)} // Đánh dấu checkbox nếu sản phẩm đã được chọn
                                                    />


                                                    </td>
                                                    <td>
                                                        <img className=" w-20 h-20" src={data.productId.images[0]} alt="" />
                                                    </td>
                                                    <td className=" overflow-hidden max-w-[300px] ">
                                                        <p className="line-clamp-2 w-[300px] overflow-hidden">{data.productId.name}</p>
                                                    </td>
                                                    <td>
                                                        {(data.productId.promotion == 0 || data.productId.promotion == null) ?
                                                            (
                                                                <>
                                                                    <p className="">{new Intl.NumberFormat('de-DE').format(data.productId.price)} đ</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div>
                                                                        <p className=" line-through">{new Intl.NumberFormat('de-DE').format(data.productId.price)} đ</p>
                                                                        <p className="">{new Intl.NumberFormat('de-DE').format(data.productId.price - (data.productId.price * data.productId.promotion / 100))} đ</p>


                                                                    </div>
                                                                </>
                                                            )

                                                        }
                                                        {/* <span> {data.productId.price} đ</span> */}
                                                    </td>
                                                    <td className=" ">
                                                        <div className="flex items-center ">
                                                            <button onClick={() => hendleDecrease(data)} className=" active:bg-secondary border w-6 h-6">-</button>
                                                            <p className="w-10 h-6 border pl-2"> {data.quantity}</p>
                                                            <button onClick={() => hendleIncrease(data)} className=" active:bg-secondary border w-6 h-6">+</button>
                                                        </div>
                                                    </td>
                                                    <td >
                                                        {(data.productId.promotion == 0 || data.productId.promotion == null) ?
                                                            (
                                                                <>
                                                                    <p className="text-red-500">{new Intl.NumberFormat('de-DE').format(data.productId.price * data.quantity)} đ</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div>
                                                                        <p className="text-red-500">{new Intl.NumberFormat('de-DE').format(data.productId.price - (data.productId.price * data.productId.promotion / 100))} đ</p>
                                                                    </div>
                                                                </>
                                                            )
                                                        }

                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => hendleDeleteProduct(data.productId._id)}
                                                            className="bg-red-400 w-16 flex items-center justify-center rounded-md active:bg-red-300 text-white">
                                                            <MdDelete />
                                                            <p className="pl-2"> Xoá</p>
                                                        </button>
                                                    </td>


                                                </tr>

                                            </>
                                        ))}




                                    </tbody>
                                </table>
                                <div className="w-full flex flex-col h-32 bg-white mt-10 ">
                                    <div className="flex mt-5 border-b pb-5">
                                        {/* 
                                        < input className="ml-10 border w-[300px]" type="text" placeholder="Nhập Voucher " />
                                        <button className="ml-3 w-14 bg-primary rounded-sm active:bg-secondary text-white">Nhập</button> */}
                                    </div>
                                    <div className="mt-5 h-[40px] pb-5 flex items-center justify-between ">
                                        <div className="flex items-center ">
                                            <input className=" w-5 h-5 ml-4 mr-5"
                                                type="checkbox"
                                                onChange={handleSelectAllChange}
                                            // checked={}
                                            /><label htmlFor="" > Chọn tất cả</label>
                                        </div>
                                        <div className="  flex items-center ">
                                            <p> Thổng thanh toán({selectedProducts.length} sản phẩm) :</p>
                                            <span className="text-xl mr-2 ml-2 text-red-700"> {totalPrice}đ</span>
                                            <button
                                                onClick={hendlePay}
                                                className="w-32 bg-red-500 text-white  h-10 text-xl rounded-md mr-10"> Mua Hàng</button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                        {
                            openOrder ? (<>
                                <Order ListProduct={selectedProducts} onClose={hendleClickCloseOrder} />
                            </>) : (<>

                            </>)
                        }
                        {/* <Order /> */}

                    </div>
                </>) : (<></>)
            }
        </>
    );
}

export default CartForMy;






// [
//     {
//         id: '6732d624c79b850bb9bacc5d',
//         quantity: 4

//     }
//     ,
//     {
//         id: '6732d1e6c79b850bb9bacc18',
//         quantity: 4

//     }

// ]