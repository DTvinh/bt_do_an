import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/orderApiRequest";
const Menu = [

    {
        id: 2,
        name: "Danh sách sản phẩm",
        link: "productmanager"
    },
    {
        id: 3,
        name: "Danh mục Thương hiệu ",
        link: "brandManager",
    },
    {
        id: 1,
        name: "Đơn hàng mới",
        link: "ordernotificationmanager",
    },
    {
        id: 4,
        name: "Quản lý đơn hàng",
        link: "ordermanager",
    },
    {
        id: 5,
        name: "Quản lý người dùng ",
        link: "usermanager",
    },
    {
        id: 6,
        name: "Thống kê",
        link: "statistics",
    },
];
const menuUser = [
    {
        id: 1,
        name: "Tài khoản",
        link: "/#",
    },
    {
        id: 2,
        name: "Đăng xuất ",
        link: "/login",
    },

]

function MenuManager() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [order, setOrder] = useState();

    const allOrder = useSelector(state => state.order?.getAllOrder.order)
    const hendleClick = () => {
        if (!open) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }
    const admin = useSelector((state) => state.auth.login?.currentUser);
    // const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin) {
            navigate('/login')

        }
        getAllBookingOrder()

    }, [])
    const getAllBookingOrder = async () => {
        await getAllOrder(dispatch)
        await setOrder(allOrder?.filter((e) => e.status == "" || e.status == null))
    }

    return (

        <>
            <nav className="w-full h-14 z-50 fixed p-10 top-0 bg-green-200 py-2 ">
                <div className="w-full h-full m-auto flex items-center relative" >
                    <Link className="left-40 absolute " to='/'> Home </Link >
                    <div onClick={hendleClick} className="w-40 h-9 right-4 absolute  bg-amber-300  items-center rounded-xl flex justify-around ">
                        <img className="select-none w-8 h-8 rounded-full" src="https://e7.pngegg.com/pngimages/358/473/png-clipart-computer-icons-user-profile-person-child-heroes.png" alt="" />
                        <span className="items-center  select-none text-center align-middle "> {admin?.user.username}</span>

                        {open ? (
                            <><ul className="top-full w-40 h-14 bg-white absolute">
                                {menuUser.map((item, index) => {
                                    return (
                                        <li key={index} className=" w-40 h-7  hover:bg-amber-200"><Link className="w-full" to={item.link}>{item.name}</Link></li>
                                    )
                                })}
                            </ul></>
                        )

                            : (<></>)
                        }
                    </div>
                    <div className="top-12 absolute w-60 h-[673px] bg-white">
                        {/* <div className=" right-3 top-[109px] absolute w-5 h-5 rounded-full flex items-center justify-center text-center bg-red-600 text-white">{order?.length}</div> */}
                        <ul className="w-full flex-col flex items-center ">
                            {Menu.map((item, index) => {
                                return (
                                    <li className="w-full h-12 flex border-b border-black hover:bg-amber-200 hover:border-r-blue-500 hover:border-r-4  " key={index} ><Link to={item.link} className="w-full h-full flex items-center justify-center">{item.name}</Link></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>


            </nav>
            <Outlet />
        </>
    );
}

export default MenuManager;