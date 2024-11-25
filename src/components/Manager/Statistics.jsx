
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../redux/orderApiRequest'
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';





function Statistics() {


    const dispatch = useDispatch()
    const [order, setOrder] = useState();
    const [clickOpen, setClickOpen] = useState(false);
    const [orderDetail, setOrderDetail] = useState()
    const [countRefresh, setCountRefresh] = useState(0)
    const [orderCompleted, setOrderCompleted] = useState([])
    const [orderCancelled, setOrderCancelled] = useState([])
    const allOrder = useSelector(state => state.order?.getAllOrder.orders)
    const [listOrder, setListOrder] = useState(allOrder);



    useEffect(() => {

        getAllOrder(dispatch)
        getAllBookingOrder();

    }, [countRefresh])

    // console.log(allOrder)
    const getAllBookingOrder = async () => {
        // await setListOrder(allOrder);
        // console.log(listOrder)
        await setOrder(listOrder?.filter((e) => e.status != ""))

        await setOrderCompleted(listOrder?.filter((e) => e.status == "completed"))
        await setOrderCancelled(listOrder?.filter((e) => e.status == "cancelled"))



    }
    const hendleClickDetail = async (detailOrder) => {
        setClickOpen(true)
        await setOrderDetail(detailOrder)
        // console.log(detailOrder)

    }

    const sumRevenue = () => {
        let sum = 0;
        orderCompleted.forEach(item => {
            sum += item.totalMoney
        })
        return sum
    }


    const hendleSelectDate = async (date) => {
        // let inputdate = new Date(date)
        // // console.log(new Date().getDate)
        // console.log(new Date(orderCancelled[0].createdAt))
        let orderSearch = await allOrder.filter((e) => {
            const dateOrder = new Date(e.createdAt)
            const formData = `${dateOrder.getFullYear()}-${dateOrder.getMonth() + 1}-${dateOrder.getDate()}`
            // console.log(formData)
            return (formData == date)
        })

        console.log(orderSearch)
        if (orderSearch.length > 0) {
            await setListOrder(orderSearch);
            getAllBookingOrder()
            setCountRefresh(countRefresh + 1);
        }
        else {
            await setListOrder([]);
        }

        // console.log(date)

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
                        <h1 className=" text-3xl">Thống kê </h1>
                        <div className="mt-10  h-14 items-center select-none bg-white flex justify-between">
                            <div className="">
                                <input type="text" placeholder="Nhập mã  " className="select-none m-32 border-2 rounded-md" />
                                <input type="date" onChange={(e) => hendleSelectDate(e.target.value)} className='border mr-5' />
                                {/* <input type="month" className='border' /> */}

                            </div>

                            <div className=" bg-red-400 rounded-xl w-44 mr-20">

                            </div>
                        </div>

                        <div className="mt-10 max-h-[600px] overflow-scroll">
                            <div className="">
                                <table className="w-full text-left bg-white ">
                                    <thead>
                                        <tr className="border-b border-black">
                                            <th>Mã đơn hàng </th>
                                            <th>Tài khoản đặt </th>
                                            <th>Số lượng sp</th>
                                            <th>Tổng tiền </th>
                                            <th>Thời gian đặt </th>
                                            <th>Trạng thái </th>
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
                                                    <td >
                                                        {
                                                            item.status == "opending" ? (<>
                                                                <p className='bg-yellow-500 text-center rounded-md text-white'> Đang xử lý </p>
                                                            </>) : (<>
                                                                {
                                                                    item.status == "cancelled" ? (<>
                                                                        <p className='bg-red-600 text-center rounded-md text-white'>  Đã huỷ </p>
                                                                    </>) : (<>
                                                                        <p className='bg-green-600 text-center rounded-md text-white'> Hoàn thành  </p>
                                                                    </>)
                                                                }
                                                            </>)
                                                        }
                                                    </td>

                                                    <td className=" h-full item-center justify-center">
                                                        <button onClick={() => hendleClickDetail(item)} className=" bg-red-400 relative text-red-50 w-32 m-2 rounded-xl">  Xem chi tiết </button>

                                                        {/* <button className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl ">   Xoá </button> */}
                                                    </td>
                                                </tr>

                                            </>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className=' flex  justify-between'>
                            <div className='ml-5'>
                                <p className='text-xl mb-2'>
                                    Số lượng huỷ: <span className='text-red-700 ml-1'>{orderCancelled.length} </span> đơn
                                </p>
                                <p className='text-xl mb-2'>
                                    Thành công :<span className='text-green-500 ml-1'>{orderCompleted.length}</span> đơn
                                </p>
                            </div>
                            <div>
                                <p className=' text-3xl mr-20'>
                                    Doanh thu : <span className='text-red-600'>{new Intl.NumberFormat('de-DE').format(sumRevenue())} đ</span>
                                </p>
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

                                            <div className=" pb-10  h-20">
                                                <button onClick={() => setClickOpen(false)} className="w-36 h-10 rounded-lg text-white active:bg-secondary absolute right-3 bg-red-400 ">Đóng </button>
                                                {/* {
                                                    orderDetail.status == 'cancelled' || orderDetail.status == 'completed' ? (<>

                                                    </>) : (<>
                                                        <button className="w-36 h-10 rounded-lg text-white active:bg-secondary absolute -left-[350px] bg-red-400 ">Đóng </button>
                                                        <button onClick={() => hendleOrderConfirm("cancelled")} className="w-36 h-10 rounded-lg text-white active:bg-secondary absolute -left-10 bg-red-600 ">Huỷ đơn hàng </button>
                                                        <button onClick={() => hendleOrderConfirm("completed")} className="w-44 h-10 rounded-lg text-white active:bg-secondary bg-green-600 absolute right-0"> Hoàn thành đơn hàng</button>
                                                    </>)
                                                } */}


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

export default Statistics;