// import React from "react";
// import Logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
// import DarkMode from "./DarkMode";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../redux/productApiRequest";
import { getAllBrand } from "../../../redux/productApiRequest";
const Menu = [

    {
        id: 3,
        name: "Nam",
        link: "/category1/nam",
    },
    {
        id: 4,
        name: "Nữ",
        link: "/category1/nu",
    },
    {
        id: 5,
        name: "Cặp đôi",
        link: "/category/6743406f703225e479581d00",
    },
    {
        id: 6,
        name: "Trang sức",
        link: "/category/6732ccf8e61da6aef15b0bc2",
    },
    {
        id: 7,
        name: "Phụ kiện",
        link: "/category/6732cccee61da6aef15b0bc0 "
    },
];

const DropdownLinks = [
    {
        id: 1,
        name: "Trending Products",
        link: "/#",
    },
    {
        id: 2,
        name: "Best Selling",
        link: "/#",
    },
    {
        id: 3,
        name: "Top Rated",
        link: "/#",
    },
];

const Navbar = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch()
    const allBrand = useSelector((state) => state.brand.getAllBrand.allBrands)

    // console.log(user)
    useEffect(() => {
        getAllBrand(dispatch)


    }, [])


    const hendleClickCart = () => {
        if (!user) {

            navigate(`/login`)

        }
        else {
            navigate(`cart/${user.user._id}`)

        }
        // console.log(user.user._id)
    }

    return (
        <div className="shadow-black  bg-whit duration-200 relative z-40">
            {/* upper Navbar */}
            <div className="bg-[#ffdda9] py-2">
                <div className="container flex justify-between items-center">
                    <div>
                        <Link to="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                            <img src="" alt="Logo" className="w-20" />
                            Vinh Shop
                        </Link>
                    </div>

                    {/* search bar */}
                    <div className="flex justify-between items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="search"
                                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 text-black rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 "
                            />
                            <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                        </div>

                        {/* order button */}
                        <button
                            onClick={hendleClickCart}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white  py-1 px-4 rounded-full flex items-center gap-3 group"
                        >
                            <span className="group-hover:block hidden transition-all duration-200">
                                Order
                            </span>
                            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                        </button>

                        <div className=" ml-2 flex cursor-pointer relative rounded-xl  bg-primary text-white w-32 group">
                            <IoPersonCircleOutline className="text-2xl " />
                            <p className=" ml-4"> {user ? user.user.username : "Tài khoản"}</p>


                            <ul className="z-10 absolute bg-white w-40 text-black top-[100%] rounded-md shadow-md hidden group-hover:block ">

                                {user ? (
                                    <>
                                        <li className="p-1 m-1 hover:bg-secondary rounded-md">
                                            <Link className="w-100% h-100%"> Tài khoản </Link>
                                        </li>
                                        <li className="p-1 m-1  hover:bg-secondary rounded-md" >
                                            <Link to="/login" > Đăng xuất </Link>
                                        </li>
                                        {user.user.admin ? (
                                            <>
                                                <li className="p-1 m-1  hover:bg-secondary rounded-md" >
                                                    <Link to="/manager" > Quản lý cửa hàng </Link>
                                                </li>
                                            </>
                                        ) : (<></>)
                                        }
                                    </>
                                )
                                    : (
                                        <>
                                            <li className="p-1 m-1  hover:bg-secondary rounded-md" >
                                                <Link to="/login" > Đăng nhập </Link>
                                            </li>
                                        </>
                                    )}


                            </ul>
                        </div>

                        {/* Darkmode Switch */}
                        <div>
                            {/* <DarkMode /> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* lower Navbar */}
            <div data-aos="zoom-in" className="flex border-b bg-white justify-center">

                <ul className="sm:flex hidden items-center gap-4 ">
                    <li className="w-[125px] justify-center pb-1 pt-1 flex hover:border-b-4 hover:border-primary">
                        <Link
                            to="/"
                            className="inline-block px-4 hover:text-primary  duration-200"
                        >
                            home
                        </Link>
                    </li>
                    <li className="group relative cursor-pointer">
                        <Link to="#" className="flex items-center gap-[2px] py-2">
                            Thương hiệu
                            <span>
                                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                            </span>
                        </Link>
                        <div className="absolute  z-[9999] hidden group-hover:block w-[700px] rounded-md bg-white p-2 text-black shadow-2xl">
                            <ul className="grid grid-cols-6 ">
                                {allBrand?.map((data, index) => (
                                    <li className="flext" key={index}>
                                        <Link
                                            to={`brand/${data._id}`}
                                            className="  inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                                        >
                                            {/* {data.nameBrand} */}
                                            <img className=" m-auto w-20 h-16 border" src={data.image} alt="" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    {Menu.map((data) => (
                        <li key={data.id} className="w-[125px] justify-center pb-1 pt-1 flex hover:border-b-4 hover:border-primary">
                            <Link
                                to={data.link}
                                className="inline-block px-4 hover:text-primary  duration-200"
                            >
                                {data.name}
                            </Link>
                        </li>
                    ))}
                    {/* Simple Dropdown and Links */}

                    {/* <li className="group relative cursor-pointer">
                        <Link to="#" className="flex items-center gap-[2px] py-2">
                            Trending Products
                            <span>
                                <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                            </span>
                        </Link>
                        <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
                            <ul>
                                {DropdownLinks.map((data, index) => (
                                    <li key={index}>
                                        <Link
                                            to={data.link}
                                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20 "
                                        >
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li> */}
                </ul>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;