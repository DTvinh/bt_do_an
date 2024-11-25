import { FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { getAllUsers, registerUser, deleteUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SuccessErrorMessage from '../SuccessErrorMessage'

function UserManager() {
    const [openSliceAdd, setOpenSliceadd] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const userList = useSelector((state) => state.users.users.allUsers);

    const rigisterSuccess = useSelector((state) => state.auth.register?.success);
    const rigisterErorr = useSelector((state) => state.auth.register?.erorr);

    console.log(rigisterSuccess)

    const [openNotify, setOpenNotify] = useState(false)
    const [username, setUsername] = useState("");
    const [fullname, setFullnanme] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isAdmin, setAdmin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        // console.log(user)
        getAllUsers(user?.accessToken, dispatch)
        // console.log(userList.length);

    }, [])
    const handleRigister = async () => {
        const newUser = {
            username: username,
            fullname: fullname,
            email: email,
            phone: phone,
            admin: isAdmin,
            password: password
        }
        if (password === password2) {
            console.log(newUser)
            await registerUser(newUser, dispatch);
            setOpenSliceadd(false);
            await getAllUsers(user?.accessToken, dispatch)
            // console.log(userList)
        }
        setOpenNotify(true)
    }

    const hendOpen = () => {
        setUsername("")
        setFullnanme("");
        setEmail("")
        setPhone("")
        setPassword("")
        setPassword2("")
        setOpenSliceadd(true)
    }

    const handleDeleteUser = async (id) => {

        await deleteUser(id, dispatch, user?.accessToken)
        await getAllUsers(user?.accessToken, dispatch)
        // console.log(user._id)

    }
    const hendleCloseNotify = () => {

        setOpenNotify(false)
    }


    return (<>
        <div className="  ml-72 mt-20">
            <h1 className=" text-3xl">Quản lý người dùng</h1>
            <div className="mt-10  h-14 items-center select-none bg-white flex justify-between">
                <div className="">
                    <input type="text" placeholder=" Tìm kiếm người dùng " className="select-none m-32 border-2 rounded-md" />
                </div>

                <div className=" bg-red-400 rounded-xl w-44 mr-20">
                    <span className=" text-white" onClick={() => hendOpen()}> + Thêm tài khoản mới  </span>
                </div>
            </div>

            <div className="mt-10 max-h-[500px] overflow-scroll">
                <div className="">
                    <table className="w-full text-left bg-white ">
                        <thead>
                            <tr className="border-b border-black">
                                <th>ID</th>
                                <th>Tên  </th>
                                <th>tên đăng nhập</th>
                                <th>SĐT </th>
                                <th>Email </th>
                                <th>Chức vụ</th>
                                <th> Action</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                userList?.map((user, index) =>
                                    <>
                                        <tr key={user._id} className="border-b border-black h-20">
                                            <td>{index}</td>
                                            <td>{user.fullname}</td>
                                            <td>{user.username}</td>
                                            <td>0369732921</td>
                                            <td>{user.email}</td>
                                            <td>{user.admin ? 'admin' : 'Khách hàng'}</td>
                                            <td className="flex flex-col h-full item-center justify-center">
                                                <button className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl"> <FaPen className=" absolute m-1" /> Xem chi tiết </button>

                                                <button onClick={() => handleDeleteUser(user._id)} className=" bg-red-400 relative text-red-50 w-36 m-2 rounded-xl "> <MdDelete className="absolute m-1" />  Xoá </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            }
                        </tbody>


                    </table>


                </div>

            </div>

            {
                openSliceAdd ? (<>
                    <div className="mt-14 w-[600px] h-[100vh] bg-white top-0 right-0 fixed overflow-scroll slide-in">
                        <div className="w-full flex justify-between border-b-2">
                            <label htmlFor="" > Tạo tài khoản</label>
                            <FaXmark onClick={() => { setOpenSliceadd(false) }} className="  text-2xl  w-8 h-8 hover:bg-slate-300" />
                        </div>
                        <div className="ml-5">

                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Tên người dùng :</span></div>
                                <input onChange={(e) => setFullnanme(e.target.value)} type="text" placeholder=' Nhập tên người dùng' className=" w-80 border-2" />
                            </div>

                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Tên đăng nhập :</span></div>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='nhập tên đăng nhập' className=" w-80 border-2" />
                            </div>
                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>SĐT :</span></div>
                                <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder='SĐT' className=" w-80 border-2" />
                            </div>
                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span>Email :</span></div>
                                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='email' className=" w-80 border-2" />

                            </div>

                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span> Chọn người dùng:</span></div>
                                <select onChange={(e) => setAdmin(e.target.value)} name="" id="" className="w-60 border-2" >
                                    <option value=""></option>
                                    <option value="true"> Admin</option>
                                    <option value="false"> Khách hàng </option>
                                </select>
                            </div>
                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span> Mật khẩu :</span></div>
                                <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Nhập mật khẩu ' className=" w-80 border-2" />
                            </div>
                            <div className="flex-col flex mt-5 ml-4">
                                <div htmlFor="" className="w-80 flex items-center "><FaStarOfLife className="text-red-500 text-[10px]  mr-2" /> <span> Nhập lại mật khẩu :</span></div>
                                <input onChange={(e) => setPassword2(e.target.value)} type="password" placeholder='Nhập lại mật khẩu ' className=" w-80 border-2" />
                            </div>



                            <div className=" mt-20 mb-10 flex justify-around">
                                <button className="bg-red-400 w-20 rounded-xl h-10"> Huỷ</button>

                                <button onClick={handleRigister} className=" bg-green-400 w-40 rounded-xl right-0  h-10"> Hoàn thành</button>
                            </div>
                        </div>
                    </div>


                </>) : (
                    <>

                    </>
                )
            }

        </div>
        {

            openNotify ? (

                <SuccessErrorMessage Success={rigisterSuccess} Close={hendleCloseNotify} />

            ) : (<></>)
        }



    </>);
}

export default UserManager;