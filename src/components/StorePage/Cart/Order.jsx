import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createOrder } from "../../../redux/orderApiRequest";
import { getCart } from "../../../redux/productApiRequest";


const paymentMethodOption = [
    {
        name: "ZaloPay",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6SEQ293X0nfFojf6nsCWKA8dNGOrqn21jg&s",
        click: false
    },
    {
        name: "Ví MoMo",
        image: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
        click: false
    },
    {
        name: "Thanh toán khi nhận hàng",
        image: "https://sohala.vn/upload/news/thanh-toan-khi-nhan-hang-6272.jpg",
        click: true

    },
]


function Order(props) {

    const ListProduct = props.ListProduct;
    const dispatch = useDispatch()
    // console.log(ListProduct);
    const params = useParams();
    const [totalMoney, setTotalMoney] = useState();
    // const [productOrder, setProductOrder] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [phone, setPhone] = useState("")
    const [comment, setcomment] = useState("")

    // const [amount, setAmount] = useState("");
    // const [paymentMethod, setPaymentMethod] = useState("");



    useEffect(() => {
        sumMoney();



    }, [])

    const sumMoney = async () => {
        let sum = 0
        await ListProduct.forEach(e => {
            if (e.productId.promotion == 0 || e.productId.promotion == null) {
                setTotalMoney((totalMoney + e.productId.price) * e.quantity)
                sum += e.productId.price * e.quantity
            }
            else {

                // setTotalMoney(totalMoney + (e.productId.price - (e.productId.price * e.productId.promotion / 100) * e.quantity))
                sum += (e.productId.price - (e.productId.price * e.productId.promotion / 100)) * e.quantity
            }

        });
        await setTotalMoney(sum)
        console.log(totalMoney)

    }

    const hendleOrder = async () => {
        let productOrder = []
        await ListProduct.forEach(async (e) => {
            // await setProductOrder((p) => [...p, {
            //     productId: e.productId._id,
            //     quantity: e.quantity

            // }]
            // 
            // )
            productOrder.push({
                productId: e.productId._id,
                quantity: e.quantity
            })

        })
        const dataOrder = await {
            userId: params.userId,
            products: productOrder,
            recipientName: recipientName,
            deliveryAddress: deliveryAddress,
            phone: phone,
            totalAmount: ListProduct.length,
            totalMoney: totalMoney,
            paymentMethod: "Thanh toán khi nhận hàng ",
            otherInformation: comment,
            status: ""
        }

        console.log(dataOrder)
        await createOrder(dispatch, dataOrder);
        await getCart(params.userId, dispatch);
        props.onClose();

    }




    return (<>
        <div className="w-full h-full fixed -top-0  bg-black/20 ">
            <div className="w-[800px] z-50 h-[650px] flex flex-col  mx-auto my-auto relative top-10 rounded-sm bg-white overflow-y-scroll">
                <div className="flex justify-between">
                    <h1 className="text-xl">
                        Đơn hàng
                    </h1>
                    <button onClick={props.onClose} className="  bg-slate-400 w-7 rounded-bl-xl h-7"> <IoMdClose className="text-2xl" /></button>
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

                            {ListProduct?.map((item, index) => (
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
                    <div>
                        <div className="flex justify-around ml-32 py-4 ">
                            <p> Voucher của shop </p>
                            <button className="text-blue-500"> Chọn Voucher</button>
                        </div>
                        <div className="border-t pt-5 pb-5">
                            <label htmlFor=""> Lời nhắn : </label>
                            <input onChange={(e) => setcomment(e.target.value)} className="ml-2 w-[300px] h-8 focus:outline-none bg-slate-100" type="text" placeholder="Lưu ý cho người bán... " />
                        </div>
                    </div>


                    <div className=" flex flex-col border-t">
                        <div className="flex my-2" >
                            <label htmlFor=""> Tên người nhận :</label>
                            <input onChange={(e) => setRecipientName(e.target.value)} className="ml-5 w-[400px] bg-slate-100" type="text" placeholder="Nhập tên người nhận " />
                        </div>
                        <div className="flex my-2">
                            <label htmlFor=""> SĐT người nhận :</label>
                            <input onChange={(e) => setPhone(e.target.value)} className="ml-5 w-[400px] bg-slate-100" type="text" placeholder="Nhập số điện thoại " />
                        </div>
                        <div className="flex my-2">
                            <label htmlFor=""> Địa chỉ giao hàng :</label>
                            <input onChange={(e) => setDeliveryAddress(e.target.value)} className="ml-5 w-[400px] bg-slate-100" type="text" placeholder="Nhập địa chỉ" />
                        </div>

                    </div>



                    <div className="pt-3 border-t flex items-center pb-3">
                        <h1>
                            Chọn phương thức thanh toán:
                        </h1>
                        <div className=" flex ">
                            {
                                paymentMethodOption.map((item, index) => (

                                    <>
                                        <button className={!item.click ? " flex border h-12 mx-2 items-center active:bg-secondary" : "flex border-2 border-primary h-12 mx-2 items-center  active:bg-secondary"}>
                                            <img className=" mx-2 w-10 h-10 " src={item.image} alt="" />
                                            <span className="mr-1" >{item.name}</span>
                                        </button>
                                    </>

                                ))
                            }
                        </div>
                    </div>
                    <div className=" pt-3 border-t ">
                        <div>
                            <p>Thanh toán khi nhận hàng <br />
                                Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.</p>
                        </div>
                        <div className="border-t">
                            <div className="w-[300px] absolute right-5">
                                <div className=" w-full my-5 justify-between  flex" >
                                    <label htmlFor="">Tổng tiền hàng :</label>
                                    <p> {new Intl.NumberFormat('de-DE').format(totalMoney)} đ</p>

                                </div >
                                <div className=" w-full my-5 justify-between  flex" >
                                    <label htmlFor="">Phí vận chuyển  :</label>
                                    <p> 60000đ</p>

                                </div >
                                <div className=" w-full my-5 justify-between  flex" >
                                    <label htmlFor="">Tổng thanh toán :</label>
                                    <p className="text-2xl text-red-600 ">{new Intl.NumberFormat('de-DE').format(totalMoney)} đ</p>

                                </div >

                                <div className=" pb-10 h-20">
                                    <button onClick={props.onClose} className="w-36 h-10 rounded-lg text-white active:bg-secondary absolute -left-10 bg-red-400 ">Huỷ </button>
                                    <button onClick={hendleOrder} className="w-36 h-10 rounded-lg text-white active:bg-secondary bg-primary absolute right-0"> Đặt hàng</button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </>);
}

export default Order;