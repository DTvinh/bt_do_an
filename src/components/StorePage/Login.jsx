import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaLinkedinIn } from "react-icons/fa";
import bgImg from '../../assets/lemon.jpg'
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const bgImage = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
};


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const hendleLogin = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        }
        console.log(user)
        loginUser(user, dispatch, navigate);

    }

    
    return (
        <>

            <div style={bgImage} className=" flex ">
                <div className={"p-10 h-[600] w-[700]  bg-white/10 backdrop-blur-md shadow-custom-inset sm:w-[600px] md:w-[380px] rounded-xl overflow-hidden m-auto"}>
                    <h1 className="text-3xl text-white font-bold text-center mb-4 text-shadow">
                        Login
                    </h1>
                    <form className="flex flex-col gap-3" onSubmit={hendleLogin}>
                        <div>
                            <label className="text-white block pb-1 text-shadow">
                                Username
                            </label>
                            <input id="username"
                                type="text"
                                className="border border-white w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent focus:ring-white/80 bg-transparent text-white text-shadow"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                        <div>
                            <label className="  text-white block pb-1 text-shadow">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="border border-white w-full rounded-full py-2 outline-none px-4 focus:ring-2 focus:border-transparent focus:ring-white/80 bg-transparent text-white text-shadow pr-8"
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {showPassword ? (
                                    <FaEye
                                        className="text-white absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className="text-white absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer "
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            </div>
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-lime-500 to-lime-600 text-white py-2 px-5 rounded-full mt-7 block w-full hover:bg-gradient-to-r hover:from-lime-600 hover:to-lime-500 hover:scale-105 transition-all duration-300 shadow-custom-inset">Submit</button>
                    </form>
                    {/* <p className="text-center text-white text-sm my-3">or login with</p> */}
                    <p
                        className="text-center text-white text-sm my-3 hover:text-lime-100 cursor-pointer text-shadow"
                    // onClick={handleSignIn}
                    >
                        No Account? create Signup here
                    </p>
                </div>


            </div>

        </>
    );
};

export default Login;