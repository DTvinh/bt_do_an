
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../redux/orderApiRequest'
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';



function OrderNotification() {



    const dispatch = useDispatch()
    const [order, setOrder] = useState();
    const [clickOpen, setClickOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState()
    const [countRefresh, setCountRefresh] = useState(0)
    const allOrder = useSelector(state => state.order?.getAllOrder.orders)
    useEffect(() => {

        getAllBookingOrder();

    }, [countRefresh])

    // console.log(allOrder)
    const getAllBookingOrder = async () => {
        await getAllOrder(dispatch)
        await setOrder(allOrder?.filter((e) => e.status == "" || e.status == null))


    }
    const hendleClickDetail = async (detailOrder) => {
        setClickOpen(true)
        await setOrderDetail(detailOrder)
        // console.log(detailOrder)


    }
    const hendleOrderConfirm = async () => {
        try {

            // eslint-disable-next-line no-unused-vars
            const res = await axios.put(`http://localhost:8080/order/update/${orderDetail._id}`, {
                status: "opending"
            })
            await getAllBookingOrder()
            await setClickOpen(false)
            setCountRefresh(countRefresh + 1)
            // console.log(orderDetail?._id)
        } catch (error) {
            console.log(error)
        }

    }
    const getTime = (time) => {
        const date = new Date(time)


        return ` ${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

    }
    // console.log(order)
    return (

        <>

            {
                order ? (<>
                    <div className="  ml-72 mt-20">

                        <h1 className=" text-3xl">Đơn hàng mới đặt </h1>
                        <div className="mt-10  h-14 items-center select-none bg-white flex justify-between">
                            <div className="">
                                <input type="text" placeholder=" Tìm kiếm người dùng " className="select-none m-32 border-2 rounded-md" />
                            </div>

                            <div className=" bg-red-400 rounded-xl w-44 mr-20">

                            </div>
                        </div>

                        <div className="mt-10 max-h-[500px] overflow-scroll">
                            <div className="">
                                <table className="w-full text-left bg-white ">
                                    <thead>
                                        <tr className="border-b border-black">
                                            <th>Mã đơn hàng </th>
                                            <th>Tài khoản đặt </th>
                                            <th>Số lượng sp</th>
                                            <th>Tổng tiền </th>
                                            <th>Thời gian đặt </th>
                                            <th> Action</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {order.map((item, index) => (

                                            <>


                                                <tr key={index} className="border-b border-black h-20">
                                                    <td>{item._id}</td>
                                                    <td>{item.userId.username}</td>
                                                    <td>{item.totalAmount}</td>
                                                    <td className='text-red-700'>{new Intl.NumberFormat('de-DE').format(item.totalMoney)} đ</td>
                                                    <td>{getTime(item.createdAt)}</td>


                                                    <td className="flex flex-col h-full item-center justify-center">
                                                        <button onClick={() => hendleClickDetail(item)} className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl">  Xem chi tiết </button>

                                                        <button className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl ">   Xoá </button>
                                                    </td>
                                                </tr>

                                            </>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    {clickOpen ? (<>

                        <div className='w-full h-full fixed -top-0  bg-black/20'>
                            <div className="w-[700px] z-50 h-[550px] flex flex-col  mx-auto my-auto relative top-16 rounded-sm bg-white overflow-y-scroll">
                                <div className="flex justify-between">
                                    <h1 className="text-xl">
                                        Đơn hàng
                                    </h1>
                                    <button onClick={() => setClickOpen(false)} className="  bg-slate-400 w-7 rounded-bl-xl h-7"> <IoMdClose className="text-2xl" /></button>
                                </div>
                                <div className="mt-2 ml-5">
                                    <h1> Sản phẩm </h1>
                                    <table className="w-full pl-5 text-left bg-white ">
                                        <thead>

                                            <tr className="border-b  border-black">
                                                <th> Ảnh </th>
                                                <th>Tên sản phẩm </th>
                                                <th>Đơn giá </th>
                                                <th>Số lượng </th>
                                                <th>Thành tiền </th>


                                            </tr>


                                        </thead>
                                        <tbody>

                                            {orderDetail.products?.map((item, index) => (
                                                <>

                                                    <tr key={index} className="border-b pt-10 border-gray-400 h-20">
                                                        <td>
                                                            <img className=" w-16 h-16" src={item?.productId.images[0]} alt="" />
                                                        </td>
                                                        <td className=" overflow-hidden max-w-[300px] ">
                                                            <p className="line-clamp-2 w-[170px] overflow-hidden">{item.productId.name}</p>
                                                        </td>
                                                        <td>
                                                            {(item.productId.promotion == 0 || item.productId.promotion == null) ?
                                                                (
                                                                    <>
                                                                        <p className="">{new Intl.NumberFormat('de-DE').format(item.productId.price)} đ</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div>
                                                                            <p className=" line-through">{new Intl.NumberFormat('de-DE').format(item.productId.price)} đ</p>
                                                                            <p className="">{new Intl.NumberFormat('de-DE').format(item.productId.price - (item.productId.price * item.productId.promotion / 100))} đ</p>


                                                                        </div>
                                                                    </>
                                                                )

                                                            }
                                                            <span></span>
                                                        </td>
                                                        <td className=" ">
                                                            <div className="flex ">

                                                                <p className="w-10 h-6 border pl-2"> {item.quantity}</p>

                                                            </div>
                                                        </td>
                                                        <td >
                                                            {(item.productId.promotion == 0 || item.productId.promotion == null) ?
                                                                (
                                                                    <>
                                                                        <p className="text-red-500">{new Intl.NumberFormat('de-DE').format(item.productId.price * item.quantity)} đ</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div>
                                                                            <p className="text-red-500">{new Intl.NumberFormat('de-DE').format((item.productId.price - (item.productId.price * item.productId.promotion / 100) * item.quantity))} đ</p>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }


                                                        </td>
                                                    </tr>
                                                </>



                                            ))}
                                        </tbody>

                                    </table>

                                    <div className='mt-4'>
                                        <div className='flex mt-1'>
                                            <label htmlFor=""> Tài khoản đặt hàng :</label>
                                            <p className='ml-3 '>{orderDetail.userId.username}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor=""> Tên người nhận :</label>
                                            <p className='ml-3'>{orderDetail.recipientName}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor=""> Số điện thoại :</label>
                                            <p className='ml-3'>{orderDetail.phone}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor="">Địa chỉ giao hàng :</label>
                                            <p className='ml-3'>{orderDetail.deliveryAddress}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor="">Lời nhắn từ khách :</label>
                                            <p className='ml-3'>{orderDetail.otherInformation}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor="">Phương thức thanh toán :</label>
                                            <p className='ml-3'>{orderDetail.paymentMethod}</p>
                                        </div>
                                        <div className='flex mt-1'>
                                            <label htmlFor="">Đặt hàng lúc :</label>
                                            <p className='ml-3'>{getTime(orderDetail.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="border-t">
                                        <div className="w-[300px] absolute right-5">
                                            <div className=" w-full my-5 justify-between  flex" >
                                                <label htmlFor="">Tổng tiền hàng :</label>
                                                <p> {new Intl.NumberFormat('de-DE').format(orderDetail.totalMoney)} đ</p>

                                            </div >
                                            <div className=" w-full my-5 justify-between  flex" >
                                                <label htmlFor="">Phí vận chuyển  :</label>
                                                <p> 0 đ</p>

                                            </div >
                                            <div className=" w-full my-5 justify-between  flex" >
                                                <label htmlFor="">Tổng thanh toán :</label>
                                                <p className="text-2xl text-red-600 ">{new Intl.NumberFormat('de-DE').format(orderDetail.totalMoney)} đ</p>

                                            </div >

                                            <div className=" pb-10 h-20">
                                                <button className="w-36 h-10 rounded-lg text-white active:bg-secondary absolute -left-10 bg-red-400 ">Đóng  </button>
                                                <button onClick={() => hendleOrderConfirm()} className="w-36 h-10 rounded-lg text-white active:bg-secondary bg-primary absolute right-0">Xác nhận đơn hàng</button>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </>) : (<></>)}


                </>
                ) : (<>

                </>)
            }

        </>
    )
}
export default OrderNotification;