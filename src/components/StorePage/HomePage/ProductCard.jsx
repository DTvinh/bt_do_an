// import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../../redux/productApiRequest'
import AlertSection from './AlertSection '
import { useState } from "react";






function ProductCard(props) {
    // eslint-disable-next-line react/prop-types
    const inforProduct = props.product
    const navigete = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const addCart = useSelector((state) => state.cart.addProductToCart?.success);
    const [openNotyfi, setOpenNotyfi] = useState(false)

    const hendleClickProductsCart = () => {
        // console.log(inforProduct._id)
        navigete(`/product/${inforProduct._id}`)
        window.scrollTo({
            top: 0,        // Di chuyển đến vị trí top = 0 (đầu trang)
            left: 0,       // Di chuyển theo trục ngang (từ trái sang phải)
            behavior: 'smooth'  // Cuộn trang mượt mà (smooth scroll)
        });

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



    return (

        <>
            <div
                data-aos="zoom-in"
                className="rounded-2xl bg-white hover:bg-black/80  hover:text-white relative shadow-xl duration-300 group overflow-hidden  max-w-[300px]"
            >
                <div onClick={hendleClickProductsCart} className=" cursor-pointer w-[80%] h-[260px] flex m-auto">
                    <img
                        // eslint-disable-next-line react/prop-types
                        src={inforProduct.images[0]}
                        alt=""
                        className=" block m-auto  transform group-hover:opacity-0 duration-300 "
                    />
                    <img src={inforProduct.images[1]} alt="" className=" absolute left-0 group-hover:scale-110 opacity-0 group-hover:opacity-100" />
                </div>

                <div className="p-4  text-center">
                    {/* star rating */}
                    <div className="w-full flex items-center justify-center gap-1">

                    </div>
                    <p className="line-clamp-3 max-h[56px] h-[70px]   font-semibold "> {inforProduct.name}</p>

                    {inforProduct.promotion == 0 ?
                        (
                            <>
                                <div className=" flex flex-col mt-2">
                                    <p className=" text-gray-500 group-hover:text-white duration-300 text-xl line-clamp-2">
                                        {new Intl.NumberFormat('de-DE').format(inforProduct.price)} đ
                                    </p>


                                </div>
                            </>
                        ) : (
                            <>
                                <div className=" flex flex-col mt-2">
                                    <p className="line-through text-gray-500 group-hover:text-white duration-300 text-xl line-clamp-2">
                                        {new Intl.NumberFormat('de-DE').format(inforProduct.price)} đ
                                    </p>
                                    <span className="ml-1 absolute right-5 bg-primary text-white">-{inforProduct.promotion}%</span>
                                    <p className=" text-gray-500 group-hover:text-white duration-300 text-xl line-clamp-2">
                                        {new Intl.NumberFormat('de-DE').format(inforProduct.price - (inforProduct.price * inforProduct.promotion / 100))} đ
                                    </p>
                                </div>
                            </>
                        )}




                    <button
                        onClick={() => hendleAddToCart(inforProduct._id)}
                        className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
            {openNotyfi ? (<>
                <AlertSection addCart={addCart} close={closeNotyfi} />
            </>) : (<></>)}

        </>
    );
}

export default ProductCard;