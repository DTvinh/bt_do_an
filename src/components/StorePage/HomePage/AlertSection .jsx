import { useEffect, useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import './AlertSection.scss'
const AlertSection = (props) => {
    const [open, setOpen] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            props.close()
        }, 5000)

    }, [])
    // console.log(open)

    return (
        <>
            <div className=" mt-5 fixed top-10 animate-slide-in right-0 z-50">
                {/* Success Alert */}
                {props.addCart ? (

                    <div >
                        <div className=" w-[400px]  bg-white text-[#0ad406] border border-[#24f10674] shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer  hover:bg-[#75df5ae3]/40">
                            <FaRegCheckCircle className='text-2xl animate-scale-up-down' />
                            <strong className="font-semibold">Thêm giỏ hàng thành công</strong>
                            <button type="button" className="text-xl ">
                                <IoMdClose />
                            </button>
                        </div>
                    </div>


                ) : (
                    <div >
                        <div className=" w-[400px]  bg-white text-red-500 border border-red-500 shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer  hover:bg-red-600/40">
                            <IoIosCloseCircleOutline className='text-2xl animate-scale-up-down' />
                            <strong className="font-semibold">Thêm giỏ hàng thất bại</strong>
                            <button type="button" className="text-xl ">
                                <IoMdClose />
                            </button>
                        </div>
                    </div>


                )}



            </div>

        </>
    );
};

export default AlertSection;



// {/* Info Alert */}
// <div className="col-span-1">
//     <div className="alert alert-info bg-[#073c99] text-[#0396ff] border border-[#0630f174] shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer hover:bg-[#073c99b3]">
//         <button type="button" className="text-xl">
//             <i className="fa fa-times text-[#0bd2ff]"></i>
//         </button>
//         <i className="fa fa-info-circle text-2xl mr-2 animate__animated animate__shakeX"></i>
//         <strong className="font-semibold">Heads up!</strong> This alert needs your attention, but it`s not super important.
//     </div>
// </div>

// {/* Warning Alert */}
// <div className="col-span-1">
//     <div className="alert alert-warning bg-[#d08001] text-[#ffb103] border border-[#f18e06] shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer hover:bg-[#d0800160]">
//         <button type="button" className="text-xl">
//             <i className="fa fa-times text-[#ffb40b]"></i>
//         </button>
//         <i className="fa fa-exclamation-triangle text-2xl mr-2 animate__animated animate__flash"></i>
//         <strong className="font-semibold">Warning!</strong> Better check yourself, you`re not looking too good.
//     </div>
// </div>

// {/* Danger Alert */}
// <div className="col-span-1">
//     <div className="alert alert-danger bg-[#dc1101] text-[#ff0303] border border-[#f10606] shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer hover:bg-[#dc110160]">
//         <button type="button" className="text-xl">
//             <i className="fa fa-times text-[#ff0303]"></i>
//         </button>
//         <i className="fa fa-times-circle text-2xl mr-2 animate__animated animate__pulse"></i>
//         <strong className="font-semibold">Oh snap!</strong> Change a few things up and try submitting again.
//     </div>
// </div>

// {/* Primary Alert */}
// <div className="col-span-1">
//     <div className="alert alert-primary bg-[#01ccdc] text-[#03d0ff] border border-[#06f1e2] shadow-md p-4 rounded-xl flex items-center justify-between transition duration-500 cursor-pointer hover:bg-[#01ccdc66]">
//         <button type="button" className="text-xl">
//             <i className="fa fa-times text-[#03d0ff]"></i>
//         </button>
//         <i className="fa fa-thumbs-up text-2xl mr-2 animate__animated animate__bounce"></i>
//         <strong className="font-semibold">Well done!</strong> You successfully read this important message.
//     </div>
// </div>