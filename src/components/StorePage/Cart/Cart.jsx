import { useState } from "react";
import CartForMy from "./CartForMy";
import OrderForMy from "./OrderForMy";
import Footer from "../HomePage/Footer/Footer";
function Cart() {




    const [openCart, setOpenCart] = useState(true);

    return (<>
        <div className="flex flex-col" >
            <div className="mt-10 pb-5 border-b w-[1200px] flex m-auto text-center">

                <button onClick={() => setOpenCart(true)} className=" bg-primary hover:bg-secondary w-32 h-10 border rounded-xl"> Giỏ hàng </button>
                <button onClick={() => setOpenCart(false)} className="ml-20  hover:bg-secondary w-32 h-10 border-black border rounded-xl"> Đơn Hàng của tôi </button>
            </div>
            {openCart ? (
                <>

                    <CartForMy />
                </>
            ) : (<>
                <OrderForMy />
            </>)}

        </div>
        <Footer />


    </>);
}

export default Cart;