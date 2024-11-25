import axios from "axios";
import { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import ListRandomProducts from './ListRandomProducts'
// import { LuSendHorizonal } from "react-icons/lu";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { addToCart } from '../../../redux/productApiRequest'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertSection from './AlertSection '
import Footer from "./Footer/Footer";


function DetailProduct() {


    const params = useParams();
    const idProduct = params.productId
    const [inforProduct, setInforProduct] = useState();
    const navigete = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const addCart = useSelector((state) => state.cart.addProductToCart?.success);
    const [openNotyfi, setOpenNotyfi] = useState(false)
    useEffect(() => {

        getInforProduct();

        // console.log(idProduct + "hahahah")

    }, [idProduct])

    const getInforProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/product/${idProduct}`);
            await setInforProduct(res.data);
            console.log(res.data)

        } catch (error) {
            console.log(error);
        }
    }

    const hendleAddToCart = async () => {
        if (!user) {
            navigete("/login")
        }
        const productCart = {
            productId: inforProduct._id,
            quantity: 1
        }
        console.log(user.user._id, productCart)
        await addToCart(user.user._id, dispatch, productCart)
        setOpenNotyfi(true)

    }
    const closeNotyfi = () => {
        setOpenNotyfi(false)

    }

    // console.log(idProduct);

    return (
        <>
            <div className="flex bg-white">
                <div className="max-w-[1000px] mx-auto mt-10">
                    {inforProduct ? (<>

                        <div className="flex w-full ">
                            <div className="flex-1 flex flex-col ">
                                <img className="w-[450px] m-auto "
                                    src={inforProduct?.images[0]} alt="" />
                                <div className="flex justify-around mt-2">
                                    {inforProduct.images.map((item, index) => (
                                        <>
                                            <img key={index} className="border w-32 h-32" src={item} alt="" />
                                        </>
                                    ))}


                                </div>
                            </div>
                            <div className="flex-1">
                                <p className=" text-2xl font-semibold text-gray-500">{inforProduct?.name}</p>

                                <p className="mt-10 font-semibold text-2xl text-red-600"> {new Intl.NumberFormat('de-DE').format(inforProduct?.price)}đ</p>
                                <p className="mt-2 text-gray-500">Tồn kho : {inforProduct?.minimumOrderQuantity} sản phẩm </p>

                                <div className="flex flex-col justify-center items-center mt-10">
                                    <button
                                        onClick={hendleAddToCart}
                                        className="w-[300px] h-[40px] border rounded-xl  active:bg-secondary bg-primary text-white"> Thêm giỏ hàng </button>


                                    <button className="w-[300px] mt-5 h-[40px] border rounded-xl  active:bg-secondary bg-red-700 text-white"> Mua ngay </button>

                                </div>
                                <div className="mt-10">
                                    <p className="text-gray-700"> Có thanh toán: <b>Trả góp </b>khi mua Online (Qua thẻ tín dụng)</p>
                                    <p className="text-gray-700"> Gọi đặt mua: 036.973.291 (8:00-1:30)</p>
                                    <div className="bg-gray-200 rounded-2xl mt-10 overflow-hidden">
                                        <p className="ml-10 w-full border-b-gray-500 border-b-2">Ưu đãi thêm dự kiến áp dụng 2024</p>

                                        <p className=" mt-5 ml-10 w-full flex items-center" > <GiCheckMark className=" bg-red-800 text-white mr-3 w-5 h-5 rounded-full" />Ưu đãi thêm dự kiến áp dụng 2024</p>
                                        <p className=" mt-2 ml-10 w-full flex items-center" > <GiCheckMark className=" bg-red-800 text-white mr-3 w-5 h-5 rounded-full" />Ưu đãi thêm dự kiến áp dụng 2024</p>

                                        <p className=" mt-2 ml-10 w-full flex items-center" >- Giảm 50% tối đa 100K cho đơn từ 200K</p>
                                        <p className=" mt-2 ml-10 w-full flex items-center" >- Giảm 5% tối đa 500K</p>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" grid grid-cols-4 gap-4 w-full mt-10">
                            {/* className="w-15 h-15 ml-4  fill-rose-800" */}

                            <div className="h-[50px] flex border border-gray-400 overflow-hidden rounded-xl">
                                <svg className="w-15 h-15 ml-4  fill-rose-800" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.15 23.65">
                                    <g id="Layer_1-2" data-name="Layer 1" >
                                        <g>
                                            <g>
                                                <path d="M3.96,19.95c-.29-.23-.34-.66-.1-.95,.23-.29,.66-.34,.95-.1l4.27,3.45c.29,.23,.34,.66,.1,.95-.23,.29-.66,.34-.95,.1l-4.27-3.45Zm4.19-3.31c-.3-.23-.35-.65-.12-.95,.23-.3,.65-.35,.95-.12l6.66,5.16c1.18-.94,2.49-2.05,3.58-2.98,.73-.62,1.36-1.15,1.8-1.51h0s0,0,0,0c.16-.13,.25-.31,.26-.49,.02-.19-.03-.39-.16-.55h0s0,0,0,0c-.13-.16-.31-.25-.5-.27-.19-.02-.39,.03-.55,.16l-3.95,3.21c-.24,.2-.58,.2-.83,.02h0s-7.89-5.78-7.89-5.78c-.3-.22-.37-.64-.15-.95,.03-.05,.07-.08,.11-.12,2.28-1.94,2.78-3.87,2.54-5.18-.07-.4-.21-.74-.39-.98-.14-.19-.29-.32-.42-.35-.04-.01-.09,0-.14,.03-.16,1.49-1.16,2.76-2.5,3.75-1.52,1.12-3.5,1.89-5.09,2.17v4.93c0,.37-.3,.68-.68,.68s-.68-.3-.68-.68v-5.51H0c0-.34,.26-.64,.61-.67,1.48-.15,3.51-.88,5.03-2,1.11-.82,1.93-1.84,1.97-2.96,0-.14,.05-.27,.13-.39,.46-.62,1.07-.8,1.69-.64,.04,.01,.09,.03,.13,.04V.68c0-.37,.3-.68,.68-.68h13.23c.37,0,.68,.3,.68,.68V13.91c0,.37-.3,.68-.68,.68h-1.15c.24,.4,.34,.86,.3,1.31-.05,.53-.31,1.05-.75,1.41h0s-.01,0-.01,0c-.41,.33-1.04,.87-1.77,1.49-1.24,1.06-2.77,2.35-4.03,3.34-.26,.2-.63,.18-.87-.03l-7.03-5.46Zm5.53-1.16l1.16-.9h-.54c-.37,0-.68-.3-.68-.68s.3-.68,.68-.68h8.49V1.36H10.92v3.73c.13,.29,.24,.62,.31,.99,.28,1.55-.18,3.74-2.37,5.88l4.82,3.53Zm3.34-.9s-.06,.07-.1,.09l-2.11,1.64,.84,.62,2.89-2.35h-1.53ZM1.86,18.12c-.28-.25-.31-.68-.06-.96,.25-.28,.68-.31,.96-.06l.15,.13s.03,.02,.04,.04l.16,.14c.28,.25,.31,.67,.06,.95-.25,.28-.67,.31-.95,.06-.08-.07-.11-.09-.17-.15-.01,0-.03-.02-.04-.03l-.15-.13Z"></path>
                                                <path d="M7.87,19.87c-.3-.23-.35-.66-.12-.95,.23-.3,.66-.35,.95-.12l4.67,3.63c.3,.23,.35,.66,.12,.95-.23,.3-.66,.35-.95,.12l-4.67-3.63Z"></path>
                                            </g>
                                            <path d="M14.24,9.48v-.07s1.25,0,1.25,0v.04c.11,.63,.69,1.11,1.47,1.11,.89,0,1.51-.61,1.51-1.49h0c0-.87-.63-1.48-1.51-1.48-.43,0-.79,.13-1.08,.37-.14,.11-.26,.26-.35,.43h-1.17l.36-4.36h4.6v1.1h-3.53l-.21,2.26h.03c.33-.5,.95-.8,1.7-.8,1.43,0,2.46,1.03,2.46,2.46h0c0,1.55-1.16,2.61-2.81,2.61-1.56,0-2.62-.93-2.72-2.17Z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-3">
                                    Tăng thời gian bảo hành lên đến 5 năm - xem thêm
                                </p>
                            </div>

                            <div className="h-[50px] flex border border-gray-400 overflow-hidden rounded-xl">
                                <svg className="w-12 h-12 ml-4  fill-rose-800" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 18.6">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <g>
                                            <path d="M5.77,9.33l-1.24,.15h-.36l-.41-.15c-.27-.07-.41-.23-.41-.49,0-.25,.08-.41,.23-.51s.35-.14,.59-.14h1.39c.43,0,.84-.06,1.24-.19,.39-.13,.74-.34,1.03-.63,.31-.36,.52-.78,.64-1.25,.12-.47,.18-1.02,.18-1.64,0-1.05-.22-1.84-.64-2.37-.5-.62-1.26-.93-2.29-.93-.57,0-1.12,.09-1.66,.26-.54,.17-.93,.45-1.17,.82-.05,0-.09,.04-.1,.13s-.03,.16-.05,.23c0,.03,.05,.15,.15,.36l.22,.15c.2,.14,.38,.32,.53,.54,.15,.22,.23,.44,.23,.64,0,.46-.13,.85-.4,1.15-.27,.3-.63,.45-1.09,.45-.52,0-.92-.17-1.21-.52-.29-.34-.44-.77-.44-1.29C.72,2.85,1.32,1.8,2.52,.95c.91-.64,2.08-.95,3.5-.95s2.7,.37,3.66,1.11c1.07,.82,1.6,1.95,1.6,3.38,0,1.08-.35,1.99-1.04,2.72-.7,.73-1.59,1.23-2.67,1.51,1.29,.21,2.31,.72,3.05,1.53,.75,.82,1.12,1.87,1.12,3.16,0,1.61-.61,2.9-1.83,3.87-1.13,.89-2.53,1.34-4.2,1.34-1.58,0-2.88-.33-3.89-.98-1.22-.79-1.83-1.94-1.83-3.45,0-.55,.16-1.02,.48-1.42,.32-.4,.74-.59,1.28-.59,.45,0,.83,.14,1.16,.41,.33,.27,.49,.64,.49,1.08s-.06,.73-.19,.89c-.12,.16-.4,.37-.83,.61-.11,.07-.22,.14-.33,.22s-.18,.18-.2,.3v.31c.05,.22,.25,.46,.6,.7,.26,.17,.55,.32,.87,.44,.32,.12,.63,.2,.92,.24,.29,.04,.67,.06,1.14,.06,1.21,0,2.13-.39,2.75-1.16,.55-.69,.83-1.66,.83-2.91,0-1.15-.21-2.07-.64-2.76-.52-.84-1.3-1.26-2.34-1.26h-.21Z"></path>
                                            <path d="M18.81,18.6c-.46,0-.97-.09-1.51-.27-.54-.18-.99-.42-1.35-.72-.36-.3-.72-.67-1.08-1.1-.29-.36-.59-.8-.9-1.31-.41-.77-.72-1.69-.93-2.76-.21-1.06-.31-2.12-.31-3.17,0-1.12,.12-2.18,.37-3.2,.25-1.01,.64-1.99,1.16-2.94,.52-.94,1.15-1.68,1.87-2.22,.84-.62,1.73-.93,2.68-.93,.84,0,1.6,.2,2.28,.59,.68,.4,1.29,.97,1.84,1.73,.45,.62,.81,1.29,1.08,2.01,.27,.72,.48,1.49,.62,2.32,.07,.38,.13,.82,.18,1.33,.05,.51,.08,.96,.08,1.35,0,1.12-.12,2.21-.36,3.29-.24,1.07-.61,2.06-1.11,2.96-.5,.9-1.12,1.61-1.86,2.13-.84,.6-1.76,.9-2.76,.9Zm0-17.47c-1.22,0-2.11,.73-2.67,2.19-.39,1.01-.58,2.26-.58,3.74v4.33c0,1.56,.17,2.83,.52,3.81,.54,1.51,1.44,2.27,2.7,2.27,.83,0,1.53-.39,2.1-1.16,.48-.65,.79-1.43,.91-2.34,.12-.7,.2-1.44,.25-2.22s.07-1.68,.07-2.73v-2.06c0-1.39-.21-2.61-.63-3.66-.57-1.44-1.47-2.16-2.67-2.16Z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-3">
                                    Kinh nghiệm và dịch vụ hơn 30 năm
                                </p>
                            </div>

                            <div className="h-[50px] flex border border-gray-400 overflow-hidden rounded-xl">
                                <svg className="w-12 h-12 ml-4  fill-rose-800" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.25 16.82">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <g>
                                            <path d="M26.91,5.23c.42,0,.75,.34,.75,.75s-.34,.75-.75,.75h-2.97c-.42,0-.75-.34-.75-.75s.34-.75,.75-.75h2.97Z"></path>
                                            <path d="M24.55,14.12h-2.23s0,.05,0,.08c0,.31,.12,.58,.33,.79s.48,.33,.79,.33,.58-.12,.79-.33c.2-.2,.33-.48,.33-.79,0-.03,0-.05,0-.08m-6.68,0h-2.23s0,.05,0,.08c0,.31,.12,.58,.33,.79,.2,.2,.48,.33,.79,.33s.58-.12,.79-.33c.2-.2,.33-.48,.33-.79,0-.03,0-.05,0-.08ZM13.63,4.98c.42,0,.75,.34,.75,.75s-.34,.75-.75,.75H.75c-.42,0-.75-.34-.75-.75s.34-.75,.75-.75H4.98V.75c0-.42,.34-.75,.75-.75h13.54c.78,0,1.48,.32,2,.83,.51,.51,.83,1.22,.83,2V12.61h8.65v-3.71c0-1.35-.55-2.57-1.44-3.46-.89-.89-2.11-1.44-3.46-1.44h-2.08c-.42,0-.75-.34-.75-.75s.34-.75,.75-.75h2.08c1.76,0,3.36,.72,4.52,1.88,1.16,1.16,1.88,2.76,1.88,4.52v4.46c0,.42-.34,.75-.75,.75h-5.46s0,.05,0,.08c0,.72-.29,1.38-.77,1.85-.47,.47-1.13,.77-1.85,.77-1.88,0-2.84-1.74-2.84-3.45V2.82c0-.36-.15-.69-.39-.93s-.57-.39-.93-.39H6.49v3.47h7.15Zm4.98,3.01c.42,0,.75,.34,.75,.75s-.34,.75-.75,.75H6.49v3.11h12.13c.42,0,.75,.34,.75,.75,0,.86-.09,1.66-.44,2.27-.8,1.39-2.9,1.54-4.03,.41-.47-.47-.77-1.13-.77-1.85,0-.03,0-.05,0-.08h-1.9s0,.05,0,.08c0,.72-.29,1.38-.77,1.85-.47,.47-1.13,.77-1.85,.77s-1.38-.29-1.85-.77c-.47-.47-.77-1.13-.77-1.85,0-.03,0-.05,0-.08h-1.27c-.42,0-.75-.34-.75-.75v-4.59h0s0-.03,0-.03c0-.42,.34-.75,.75-.75h12.88Zm-7.88,6.21s0-.05,0-.08h-2.23s0,.05,0,.08c0,.31,.12,.58,.33,.79s.48,.33,.79,.33,.58-.12,.79-.33c.2-.2,.33-.48,.33-.79Z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-3">
                                    Giao hàng siêu tốc 2h ship cod miễn phí
                                </p>
                            </div>


                            <div className="h-[50px] flex border border-gray-400 overflow-hidden rounded-xl">
                                <svg className="w-12 h-12 ml-4  fill-rose-800" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.78 20.82">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <g>
                                            <path d="M12.36,5.03c-.16-.07-.33-.13-.52-.19l-.49-.16v-1.87c0-.13-.05-.24-.14-.33-.08-.08-.2-.14-.33-.14h-1.9c-.13,0-.24,.05-.33,.14-.08,.08-.14,.2-.14,.33v1.87l-.49,.16c-.18,.06-.35,.12-.52,.19-.17,.07-.33,.15-.5,.23l-.46,.24-.36-.36-.96-.96c-.09-.09-.21-.13-.33-.13s-.24,.04-.33,.13l-1.35,1.35c-.09,.09-.13,.21-.13,.33s.04,.24,.13,.33l.95,.95,.37,.37-.24,.46c-.08,.16-.16,.33-.24,.5-.08,.18-.14,.36-.19,.52l-.16,.49H1.87c-.13,0-.24,.05-.33,.14-.08,.08-.14,.2-.14,.33v1.9c0,.13,.05,.24,.14,.33s.2,.14,.33,.14h1.83l.15,.5c.06,.18,.12,.36,.19,.53,.07,.17,.15,.34,.24,.51l.24,.46-.36,.36-.93,.93c-.09,.09-.13,.21-.13,.33s.04,.24,.13,.33l1.35,1.35c.09,.09,.21,.13,.33,.13s.24-.04,.33-.13l.92-.92,.37-.37,.46,.24c.17,.09,.34,.17,.52,.24,.17,.07,.35,.14,.53,.19l.49,.16v1.81c0,.13,.05,.24,.14,.33,.08,.08,.2,.14,.33,.14h1.9c.13,0,.24-.05,.33-.14,.08-.08,.14-.2,.14-.33v-1.81l.49-.16c.18-.06,.36-.12,.53-.19,.18-.07,.35-.16,.52-.24l.46-.24,.37,.37,.92,.92h0c.09,.09,.21,.13,.33,.13s.24-.04,.33-.13h0l1.35-1.35h0c.09-.09,.13-.21,.13-.33s-.04-.24-.13-.33h0l-.93-.93-.36-.36,.24-.46c.09-.17,.17-.34,.24-.51,.07-.17,.13-.35,.19-.53l.15-.5h1.83c.13,0,.24-.05,.33-.14,.08-.08,.14-.2,.14-.33v-1.9c0-.13-.05-.24-.14-.33-.08-.08-.2-.14-.33-.14h-1.84l-.16-.49c-.05-.16-.12-.34-.19-.52-.07-.17-.15-.34-.24-.5l-.24-.46,.37-.37,.95-.95c.09-.09,.13-.21,.13-.33s-.04-.24-.13-.33l-1.35-1.35h0c-.09-.09-.21-.13-.33-.13s-.24,.04-.33,.13h0l-.96,.96-.36,.36-.46-.24c-.17-.09-.33-.17-.5-.23m8.92-.5c.74,.02,1.32,.64,1.3,1.38-.02,.74-.64,1.32-1.38,1.3-.74-.02-1.32-.64-1.3-1.38,.02-.74,.64-1.32,1.38-1.3Zm-8.53-.85s.09,.04,.14,.06c.05,.02,.09,.04,.14,.06l.61-.61h0c.36-.36,.84-.55,1.32-.55,.38,0,.76,.12,1.09,.35l.58-.76c.21-.27,.51-.46,.83-.54,.33-.07,.68-.03,.99,.17l.23,.14c.13-.08,.26-.16,.39-.23,.13-.07,.27-.13,.41-.19v-.27c.02-.37,.18-.71,.43-.94,.25-.24,.59-.38,.96-.37l1.06,.03c.37,.01,.71,.17,.94,.42,.24,.25,.38,.59,.37,.96v.27c.13,.07,.26,.14,.39,.21,.13,.08,.26,.17,.38,.26l.23-.13h0c.33-.18,.69-.21,1.02-.12,.33,.1,.63,.32,.81,.64h0s.51,.93,.51,.93h0c.18,.33,.21,.7,.12,1.03-.09,.33-.32,.63-.64,.81h0s-.22,.12-.22,.12v.02c.02,.16,.02,.35,.01,.54,0,.19-.02,.36-.04,.52h0s.21,.14,.21,.14c.32,.2,.52,.51,.6,.85,.08,.34,.02,.7-.17,1.02l-.57,.89c-.2,.32-.51,.52-.85,.6-.34,.08-.7,.02-1.02-.18l-.2-.13c-.13,.09-.26,.17-.4,.24-.14,.07-.28,.14-.42,.2v.23s0,0,0,0h0v.02s0,0,0,0h0c-.02,.36-.18,.68-.42,.91-.25,.24-.58,.38-.95,.37h0s0,0,0,0h-.01s0,0,0,0h0s-.94-.05-.94-.05c-.39-.02-.68-.35-.66-.74,.02-.39,.35-.68,.74-.66l.88,.05,.02-.63c0-.31,.2-.61,.51-.7,.23-.06,.44-.15,.64-.26,.2-.11,.39-.24,.57-.39,.23-.19,.56-.23,.83-.06l.57,.36,.51-.81-.57-.36h0c-.25-.16-.38-.47-.3-.77,.03-.11,.05-.23,.07-.36,.02-.13,.03-.25,.03-.37,0-.12,0-.24-.01-.38-.01-.14-.03-.26-.05-.37h0c-.06-.29,.07-.6,.35-.76l.6-.33h0s0-.01,0-.01l-.46-.82h0s0,0,0,0l-.58,.32c-.26,.16-.61,.14-.85-.09-.17-.16-.35-.3-.54-.41-.19-.11-.38-.21-.59-.28-.3-.09-.51-.37-.5-.69l.02-.7-.96-.03-.02,.66c0,.31-.2,.61-.51,.7-.22,.06-.43,.15-.63,.25-.2,.11-.39,.23-.56,.38h0c-.23,.19-.56,.22-.82,.05l-.59-.38s0,0,0,.01l-.68,.88,.57,.57c.36,.36,.55,.84,.55,1.32s-.18,.96-.55,1.32l-.59,.59s.04,.1,.06,.14c.02,.05,.04,.1,.06,.15h.84c.52,0,.98,.21,1.32,.55,.34,.34,.55,.81,.55,1.32v1.9c0,.52-.21,.98-.55,1.32-.34,.34-.81,.55-1.32,.55h-.82c-.02,.05-.04,.1-.06,.15-.02,.05-.04,.1-.07,.16l.58,.58h0c.36,.36,.55,.84,.55,1.32s-.18,.96-.55,1.32h0s-1.35,1.35-1.35,1.35h0c-.36,.36-.84,.55-1.32,.55s-.96-.18-1.32-.55h0s-.56-.56-.56-.56c-.05,.02-.11,.05-.16,.07-.05,.02-.11,.04-.16,.06v.8c0,.52-.21,.98-.55,1.32-.34,.34-.81,.55-1.32,.55h-1.9c-.52,0-.98-.21-1.32-.55-.34-.34-.55-.81-.55-1.32v-.8c-.05-.02-.11-.04-.16-.06-.05-.02-.11-.05-.16-.07l-.56,.56c-.36,.36-.84,.55-1.32,.55s-.96-.18-1.32-.55l-1.35-1.35c-.36-.36-.55-.84-.55-1.32s.18-.96,.55-1.32l.58-.58c-.02-.05-.04-.1-.07-.15-.02-.05-.04-.1-.06-.15h-.82c-.52,0-.98-.21-1.32-.55-.34-.34-.55-.81-.55-1.32v-1.9c0-.52,.21-.98,.55-1.32,.34-.34,.81-.55,1.32-.55h.84s.04-.1,.06-.14c.02-.05,.04-.1,.06-.14l-.59-.59c-.36-.36-.55-.84-.55-1.32s.18-.96,.55-1.32l1.35-1.35c.36-.36,.84-.55,1.32-.55s.96,.18,1.32,.55l.61,.61s.09-.04,.14-.06c.05-.02,.09-.04,.14-.06v-.86c0-.51,.21-.98,.55-1.32,.34-.34,.81-.55,1.32-.55h1.9c.52,0,.98,.21,1.32,.55,.34,.34,.55,.81,.55,1.32v.86Z"></path>
                                            <path d="M7.37,13.53c.28,.27,.28,.71,.01,.99-.27,.28-.71,.28-.99,.01-.21-.2-.4-.42-.57-.66-.17-.24-.32-.49-.45-.74-.17-.35-.02-.77,.32-.94,.35-.17,.77-.02,.94,.32,.1,.2,.2,.38,.32,.54,.12,.17,.26,.33,.41,.47m-1.05-3.21c-.06,.38-.42,.64-.8,.58-.38-.06-.64-.42-.58-.8,.2-1.21,.83-2.28,1.72-3.04,.88-.75,2.03-1.2,3.27-1.2,1.4,0,2.66,.57,3.58,1.48,.92,.92,1.48,2.18,1.48,3.58s-.57,2.66-1.48,3.58-2.18,1.48-3.58,1.48c-.2,0-.42-.01-.65-.04-.22-.03-.43-.07-.63-.12-.37-.1-.6-.48-.5-.85,.1-.37,.48-.6,.85-.5,.15,.04,.3,.07,.46,.09,.14,.02,.3,.03,.47,.03,1.01,0,1.92-.41,2.58-1.07,.66-.66,1.07-1.58,1.07-2.59s-.41-1.92-1.07-2.59c-.66-.66-1.58-1.07-2.58-1.07-.9,0-1.73,.33-2.37,.87-.65,.55-1.1,1.32-1.24,2.19Z"></path>
                                            <path d="M10.65,10.2c-.18-.18-.43-.3-.71-.3s-.53,.11-.71,.3c-.18,.18-.3,.43-.3,.71s.11,.53,.3,.71c.18,.18,.43,.3,.71,.3s.53-.11,.71-.3,.3-.43,.3-.71-.11-.53-.3-.71m-.71-1.7c.67,0,1.27,.27,1.71,.71,.44,.44,.71,1.04,.71,1.71s-.27,1.27-.71,1.71-1.04,.71-1.71,.71-1.27-.27-1.71-.71c-.44-.44-.71-1.04-.71-1.71s.27-1.27,.71-1.71c.44-.44,1.04-.71,1.71-.71Z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-3">
                                    Thay pin miễn phí suốt đời
                                </p>
                            </div>
                            <div className="h-[50px] flex border border-gray-400 overflow-hidden rounded-xl">
                                <svg className="w-12 h-12 ml-4  fill-rose-800" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.78 20.82">
                                    <g id="Layer_1-2" data-name="Layer 1">
                                        <g>
                                            <path d="M12.36,5.03c-.16-.07-.33-.13-.52-.19l-.49-.16v-1.87c0-.13-.05-.24-.14-.33-.08-.08-.2-.14-.33-.14h-1.9c-.13,0-.24,.05-.33,.14-.08,.08-.14,.2-.14,.33v1.87l-.49,.16c-.18,.06-.35,.12-.52,.19-.17,.07-.33,.15-.5,.23l-.46,.24-.36-.36-.96-.96c-.09-.09-.21-.13-.33-.13s-.24,.04-.33,.13l-1.35,1.35c-.09,.09-.13,.21-.13,.33s.04,.24,.13,.33l.95,.95,.37,.37-.24,.46c-.08,.16-.16,.33-.24,.5-.08,.18-.14,.36-.19,.52l-.16,.49H1.87c-.13,0-.24,.05-.33,.14-.08,.08-.14,.2-.14,.33v1.9c0,.13,.05,.24,.14,.33s.2,.14,.33,.14h1.83l.15,.5c.06,.18,.12,.36,.19,.53,.07,.17,.15,.34,.24,.51l.24,.46-.36,.36-.93,.93c-.09,.09-.13,.21-.13,.33s.04,.24,.13,.33l1.35,1.35c.09,.09,.21,.13,.33,.13s.24-.04,.33-.13l.92-.92,.37-.37,.46,.24c.17,.09,.34,.17,.52,.24,.17,.07,.35,.14,.53,.19l.49,.16v1.81c0,.13,.05,.24,.14,.33,.08,.08,.2,.14,.33,.14h1.9c.13,0,.24-.05,.33-.14,.08-.08,.14-.2,.14-.33v-1.81l.49-.16c.18-.06,.36-.12,.53-.19,.18-.07,.35-.16,.52-.24l.46-.24,.37,.37,.92,.92h0c.09,.09,.21,.13,.33,.13s.24-.04,.33-.13h0l1.35-1.35h0c.09-.09,.13-.21,.13-.33s-.04-.24-.13-.33h0l-.93-.93-.36-.36,.24-.46c.09-.17,.17-.34,.24-.51,.07-.17,.13-.35,.19-.53l.15-.5h1.83c.13,0,.24-.05,.33-.14,.08-.08,.14-.2,.14-.33v-1.9c0-.13-.05-.24-.14-.33-.08-.08-.2-.14-.33-.14h-1.84l-.16-.49c-.05-.16-.12-.34-.19-.52-.07-.17-.15-.34-.24-.5l-.24-.46,.37-.37,.95-.95c.09-.09,.13-.21,.13-.33s-.04-.24-.13-.33l-1.35-1.35h0c-.09-.09-.21-.13-.33-.13s-.24,.04-.33,.13h0l-.96,.96-.36,.36-.46-.24c-.17-.09-.33-.17-.5-.23m8.92-.5c.74,.02,1.32,.64,1.3,1.38-.02,.74-.64,1.32-1.38,1.3-.74-.02-1.32-.64-1.3-1.38,.02-.74,.64-1.32,1.38-1.3Zm-8.53-.85s.09,.04,.14,.06c.05,.02,.09,.04,.14,.06l.61-.61h0c.36-.36,.84-.55,1.32-.55,.38,0,.76,.12,1.09,.35l.58-.76c.21-.27,.51-.46,.83-.54,.33-.07,.68-.03,.99,.17l.23,.14c.13-.08,.26-.16,.39-.23,.13-.07,.27-.13,.41-.19v-.27c.02-.37,.18-.71,.43-.94,.25-.24,.59-.38,.96-.37l1.06,.03c.37,.01,.71,.17,.94,.42,.24,.25,.38,.59,.37,.96v.27c.13,.07,.26,.14,.39,.21,.13,.08,.26,.17,.38,.26l.23-.13h0c.33-.18,.69-.21,1.02-.12,.33,.1,.63,.32,.81,.64h0s.51,.93,.51,.93h0c.18,.33,.21,.7,.12,1.03-.09,.33-.32,.63-.64,.81h0s-.22,.12-.22,.12v.02c.02,.16,.02,.35,.01,.54,0,.19-.02,.36-.04,.52h0s.21,.14,.21,.14c.32,.2,.52,.51,.6,.85,.08,.34,.02,.7-.17,1.02l-.57,.89c-.2,.32-.51,.52-.85,.6-.34,.08-.7,.02-1.02-.18l-.2-.13c-.13,.09-.26,.17-.4,.24-.14,.07-.28,.14-.42,.2v.23s0,0,0,0h0v.02s0,0,0,0h0c-.02,.36-.18,.68-.42,.91-.25,.24-.58,.38-.95,.37h0s0,0,0,0h-.01s0,0,0,0h0s-.94-.05-.94-.05c-.39-.02-.68-.35-.66-.74,.02-.39,.35-.68,.74-.66l.88,.05,.02-.63c0-.31,.2-.61,.51-.7,.23-.06,.44-.15,.64-.26,.2-.11,.39-.24,.57-.39,.23-.19,.56-.23,.83-.06l.57,.36,.51-.81-.57-.36h0c-.25-.16-.38-.47-.3-.77,.03-.11,.05-.23,.07-.36,.02-.13,.03-.25,.03-.37,0-.12,0-.24-.01-.38-.01-.14-.03-.26-.05-.37h0c-.06-.29,.07-.6,.35-.76l.6-.33h0s0-.01,0-.01l-.46-.82h0s0,0,0,0l-.58,.32c-.26,.16-.61,.14-.85-.09-.17-.16-.35-.3-.54-.41-.19-.11-.38-.21-.59-.28-.3-.09-.51-.37-.5-.69l.02-.7-.96-.03-.02,.66c0,.31-.2,.61-.51,.7-.22,.06-.43,.15-.63,.25-.2,.11-.39,.23-.56,.38h0c-.23,.19-.56,.22-.82,.05l-.59-.38s0,0,0,.01l-.68,.88,.57,.57c.36,.36,.55,.84,.55,1.32s-.18,.96-.55,1.32l-.59,.59s.04,.1,.06,.14c.02,.05,.04,.1,.06,.15h.84c.52,0,.98,.21,1.32,.55,.34,.34,.55,.81,.55,1.32v1.9c0,.52-.21,.98-.55,1.32-.34,.34-.81,.55-1.32,.55h-.82c-.02,.05-.04,.1-.06,.15-.02,.05-.04,.1-.07,.16l.58,.58h0c.36,.36,.55,.84,.55,1.32s-.18,.96-.55,1.32h0s-1.35,1.35-1.35,1.35h0c-.36,.36-.84,.55-1.32,.55s-.96-.18-1.32-.55h0s-.56-.56-.56-.56c-.05,.02-.11,.05-.16,.07-.05,.02-.11,.04-.16,.06v.8c0,.52-.21,.98-.55,1.32-.34,.34-.81,.55-1.32,.55h-1.9c-.52,0-.98-.21-1.32-.55-.34-.34-.55-.81-.55-1.32v-.8c-.05-.02-.11-.04-.16-.06-.05-.02-.11-.05-.16-.07l-.56,.56c-.36,.36-.84,.55-1.32,.55s-.96-.18-1.32-.55l-1.35-1.35c-.36-.36-.55-.84-.55-1.32s.18-.96,.55-1.32l.58-.58c-.02-.05-.04-.1-.07-.15-.02-.05-.04-.1-.06-.15h-.82c-.52,0-.98-.21-1.32-.55-.34-.34-.55-.81-.55-1.32v-1.9c0-.52,.21-.98,.55-1.32,.34-.34,.81-.55,1.32-.55h.84s.04-.1,.06-.14c.02-.05,.04-.1,.06-.14l-.59-.59c-.36-.36-.55-.84-.55-1.32s.18-.96,.55-1.32l1.35-1.35c.36-.36,.84-.55,1.32-.55s.96,.18,1.32,.55l.61,.61s.09-.04,.14-.06c.05-.02,.09-.04,.14-.06v-.86c0-.51,.21-.98,.55-1.32,.34-.34,.81-.55,1.32-.55h1.9c.52,0,.98,.21,1.32,.55,.34,.34,.55,.81,.55,1.32v.86Z"></path>
                                            <path d="M7.37,13.53c.28,.27,.28,.71,.01,.99-.27,.28-.71,.28-.99,.01-.21-.2-.4-.42-.57-.66-.17-.24-.32-.49-.45-.74-.17-.35-.02-.77,.32-.94,.35-.17,.77-.02,.94,.32,.1,.2,.2,.38,.32,.54,.12,.17,.26,.33,.41,.47m-1.05-3.21c-.06,.38-.42,.64-.8,.58-.38-.06-.64-.42-.58-.8,.2-1.21,.83-2.28,1.72-3.04,.88-.75,2.03-1.2,3.27-1.2,1.4,0,2.66,.57,3.58,1.48,.92,.92,1.48,2.18,1.48,3.58s-.57,2.66-1.48,3.58-2.18,1.48-3.58,1.48c-.2,0-.42-.01-.65-.04-.22-.03-.43-.07-.63-.12-.37-.1-.6-.48-.5-.85,.1-.37,.48-.6,.85-.5,.15,.04,.3,.07,.46,.09,.14,.02,.3,.03,.47,.03,1.01,0,1.92-.41,2.58-1.07,.66-.66,1.07-1.58,1.07-2.59s-.41-1.92-1.07-2.59c-.66-.66-1.58-1.07-2.58-1.07-.9,0-1.73,.33-2.37,.87-.65,.55-1.1,1.32-1.24,2.19Z"></path>
                                            <path d="M10.65,10.2c-.18-.18-.43-.3-.71-.3s-.53,.11-.71,.3c-.18,.18-.3,.43-.3,.71s.11,.53,.3,.71c.18,.18,.43,.3,.71,.3s.53-.11,.71-.3,.3-.43,.3-.71-.11-.53-.3-.71m-.71-1.7c.67,0,1.27,.27,1.71,.71,.44,.44,.71,1.04,.71,1.71s-.27,1.27-.71,1.71-1.04,.71-1.71,.71-1.27-.27-1.71-.71c-.44-.44-.71-1.04-.71-1.71s.27-1.27,.71-1.71c.44-.44,1.04-.71,1.71-.71Z"></path>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-3">
                                    Thay pin miễn phí suốt đời
                                </p>
                            </div>




                        </div>
                        <div className="flex mt-10">
                            <div className="w-[40%] flex flex-col  border-r">
                                <div className="flex items-center" >
                                    <svg className=" fill-slate-500 w-10 h-10 ml-5 mr-10" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.3 22.95">
                                        <defs>

                                        </defs>
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <g>
                                                <path d="M22.95,0L4.03,.06c-.2,0-.36,.16-.35,.36,0,.2,.16,.36,.36,.35l18.56-.06-.06,21.52H.71V3.97H19.45v15.42c0,.2,.16,.36,.36,.36s.36-.16,.36-.36V3.96c0-.39-.31-.7-.7-.7H.64c-.35,0-.64,.29-.64,.64V22.24c0,.39,.32,.71,.71,.71H22.54c.39,0,.71-.32,.71-.71l.06-21.89c0-.2-.16-.36-.36-.36Z"></path>
                                                <path d="M10.67,12.67V6.9c0-.29-.24-.53-.53-.53H3.31c-.29,.01-.52,.25-.51,.54l.05,5.77c0,.29,.24,.52,.53,.52h6.77c.29,0,.53-.24,.53-.53Zm-.71-.18H3.56V7.08h6.4v5.4Z"></path>
                                                <path d="M17.58,6.42h-5.38c-.2,0-.36,.16-.36,.36s.16,.36,.36,.36h5.38c.2,0,.36-.16,.36-.36s-.16-.36-.36-.36Z"></path>
                                                <path d="M4.11,16.74h13.7c.2,0,.36-.16,.36-.36s-.16-.36-.36-.36H4.11c-.2,0-.36,.16-.36,.36s.16,.36,.36,.36Z"></path>
                                                <path d="M4.15,19.94h13.88c.2,0,.36-.16,.36-.36s-.16-.36-.36-.36H4.15c-.2,0-.36,.16-.36,.36s.16,.36,.36,.36Z"></path>
                                                <path d="M12.24,9.71c-.2,0-.36,.16-.36,.36s.16,.36,.36,.36h5.38c.2,0,.36-.16,.36-.36s-.16-.36-.36-.36h-5.38Z"></path>
                                                <path d="M12.11,13.58h5.38c.2,0,.36-.16,.36-.36s-.16-.36-.36-.36h-5.38c-.2,0-.36,.16-.36,.36s.16,.36,.36,.36Z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="text-gray-500 text-xl "> Thông tin sản phẩm</p>
                                </div>
                                <div className=" flex flex-col ml-2 mt-10">
                                    <div className="mt-3">
                                        <label className="font-semibold " htmlFor=""> Thương hiệu :</label>
                                        <span className="ml-2 font-semibold text-gray-600">{inforProduct.brand.nameBrand} </span>
                                    </div>
                                    <div className="mt-3">
                                        <label className="font-semibold " htmlFor=""> Giới tính :</label>
                                        <span className="ml-2 font-semibold text-gray-600"> {inforProduct.objectUsed} </span>
                                    </div>
                                    <div className="mt-3">
                                        <label className="font-semibold " htmlFor=""> Máy :</label>
                                        <span className="ml-2 font-semibold text-gray-600">{inforProduct.machineType} </span>
                                    </div>                                <div className="mt-3">
                                        <label className="font-semibold " htmlFor="">Kích thước kính:</label>
                                        <span className="ml-2 font-semibold text-gray-600"> {inforProduct.faceSize} mm </span>
                                    </div>                                <div className="mt-3">
                                        <label className="font-semibold " htmlFor="">Bề dày :</label>
                                        <span className="ml-2 font-semibold text-gray-600"> {inforProduct.thickness} </span>
                                    </div>                                <div className="mt-3">
                                        <label className="font-semibold " htmlFor="">Khối lượng :</label>
                                        <span className="ml-2 font-semibold text-gray-600"> {inforProduct.weight} g </span>
                                    </div>                                <div className="mt-3">
                                        <label className="font-semibold " htmlFor=""> Chất liệu dây :</label>
                                        <span className="ml-2 font-semibold text-gray-600"> {inforProduct.shellMaterial} </span>
                                    </div>                                <div className="mt-3">
                                        <label className="font-semibold " htmlFor="">Thời gian bảo hành :</label>
                                        <span className="ml-2 font-semibold text-gray-600">{inforProduct.warrantyInformation}</span>
                                    </div>
                                </div>
                            </div>
                            <div className=" max-w-[60%] flex flex-col">
                                <div className="flex items-center" >
                                    <svg className=" fill-slate-500 w-10 h-10 ml-5 mr-10" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.11 23.69">
                                        <defs>

                                        </defs>
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <g>
                                                <path d="M12.05,12.05c-.05,0-.1-.01-.15-.04L.18,6.12C.07,6.06,0,5.94,0,5.82c0-.13,.07-.24,.19-.29L11.91,.03c.09-.04,.19-.04,.28,0l11.72,5.49c.11,.05,.19,.17,.19,.29,0,.13-.07,.24-.18,.3l-11.72,5.9s-.1,.04-.15,.04ZM1.08,5.83l10.97,5.52,10.97-5.52L12.05,.69,1.08,5.83Z"></path>
                                                <path d="M12.05,15.82c-.05,0-.1-.01-.15-.04L.18,9.88C.07,9.83,0,9.71,0,9.59c0-.13,.07-.24,.19-.29l2.51-1.18c.16-.08,.36,0,.44,.16,.08,.16,0,.36-.16,.44l-1.9,.89,10.97,5.52,10.97-5.52-1.94-.91c-.16-.08-.24-.27-.16-.44,.08-.16,.27-.24,.44-.16l2.55,1.19c.11,.05,.19,.17,.19,.29,0,.13-.07,.24-.18,.3l-11.72,5.9s-.1,.04-.15,.04Z"></path>
                                                <path d="M12.05,19.55c-.05,0-.1-.01-.15-.03L.18,13.62C.07,13.56,0,13.44,0,13.32c0-.13,.08-.24,.19-.29l2.51-1.18c.16-.08,.36,0,.44,.16s0,.36-.16,.44l-1.9,.89,10.97,5.52,10.97-5.52-1.94-.91c-.16-.08-.24-.27-.16-.44,.08-.16,.27-.24,.44-.16l2.55,1.19c.11,.05,.19,.17,.19,.29,0,.13-.07,.24-.18,.3l-11.72,5.9s-.1,.03-.15,.03Z"></path>
                                                <path d="M12.05,23.69c-.05,0-.1-.01-.15-.04L.18,17.76c-.11-.06-.18-.17-.18-.3,0-.13,.07-.24,.19-.29l2.51-1.18c.16-.08,.36,0,.44,.16,.08,.16,0,.36-.16,.44l-1.9,.89,10.97,5.52,10.97-5.52-1.94-.91c-.16-.08-.24-.27-.16-.44,.08-.16,.27-.24,.44-.16l2.55,1.19c.11,.05,.19,.17,.19,.29,0,.13-.07,.24-.18,.3l-11.72,5.9s-.1,.04-.15,.04Z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="text-gray-500 text-xl "> Mô tả </p>
                                </div>
                                <div className="ml-5 mt-10">
                                    <p>
                                        {inforProduct.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </>) : (<></>)}

                    <div className=" mt-10 border-b pb-10">
                        <p className=" text-primary text-3xl"> Thảo luận </p>
                        <div className="flex items-center  mt-5">
                            <input type="text" className="w-[500px] pl-3 bg-slate-200 h-8 rounded-xl " placeholder="Để lại cảm nghĩ của bạn " />
                            <button>
                                <IoSend className=" text-primary w-[32px] h-[32px] active:text-secondary ml-2" />
                            </button>

                        </div>
                    </div>
                    <div className=" mt-10 flex flex-col text-center">
                        <h1 className="text-3xl text-red-900" >Sản phẩm có thể bạn quan tâm </h1>
                        <ListRandomProducts />
                    </div>


                </div>

            </div >
            <Footer />
            {openNotyfi ? (<>
                <AlertSection addCart={addCart} close={closeNotyfi} />
            </>) : (<></>)}
        </>
    );
}

export default DetailProduct;