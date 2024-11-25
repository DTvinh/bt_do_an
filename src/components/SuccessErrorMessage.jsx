import { useState } from "react";

function SuccessErrorMessage(props) {

    const success = props.Success
    // console.log(success)

    return (
        <div className="top-[180px] left-[700px] fixed overflow-hidden w-[700px] h-[250px]">
            {/* Success Box */}
            {

                success ? (


                    <div className="absolute w-[35%] h-full  bg-gradient-to-br from-[#B0DB7D] to-[#99DBB4] rounded-2xl shadow-xl perspective-[40px]">
                        <div className="dot w-2 h-2 bg-white rounded-full absolute top-[4%] right-[6%] hover:bg-opacity-70"></div>
                        <div className="dot w-2 h-2 bg-white opacity-50 rounded-full absolute top-[4%] right-[12%]"></div>
                        <div className="absolute w-[22%] h-[22%] bg-white rounded-full border-2 border-[#777777] top-[21%] left-[40%] z-20 animate-bounce">
                            <div className="eye w-1.5 h-1.5 bg-[#777777] rounded-full absolute top-[40%] left-[20%]"></div>
                            <div className="eye w-1.5 h-1.5 bg-[#777777] rounded-full absolute top-[40%] left-[68%]"></div>
                            <div className="mouth w-[10px] h-[10px] bg-transparent border-b-2 border-l-2 border-[#777777] rounded-full absolute top-[50%] left-[39%] -rotate-45"></div>

                        </div>
                        <div className="shadow w-[21%] h-[3%] bg-[#777777] opacity-50 rounded-full absolute left-[40%] top-[43%] z-10 animate-scale"></div>
                        <div className="message absolute w-full text-center h-[40%] top-[47%]">
                            <h1 className="alert font-bold tracking-widest text-white text-sm py-2">Success!</h1>
                            <p className="text-gray-500 text-xs mt-[-5px] tracking-wider">Yay, everything is working.</p>
                        </div>
                        <button
                            onClick={props.Close}
                            className="button-box absolute bg-white w-[50%] h-[15%] rounded-[20px] top-[73%] left-[25%] shadow-xl hover:bg-opacity-70 transform transition-all hover:scale-105">
                            <h1 className="green text-[#99DBB4]">Continue</h1>
                        </button>
                    </div>
                ) : (

                    <div className="absolute w-[35%] h-full  bg-gradient-to-bl from-[#EF8D9C] to-[#FFC39E] rounded-2xl shadow-xl">
                        <div className="dot w-2 h-2 bg-white rounded-full absolute top-[4%] right-[6%] hover:bg-opacity-70"></div>
                        <div className="dot w-2 h-2 bg-white opacity-50 rounded-full absolute top-[4%] right-[12%]"></div>
                        <div className="absolute w-[22%] h-[22%] bg-white rounded-full border-2 border-[#777777] top-[21%] left-[39%] z-20 animate-roll">
                            <div className="eye w-1.5 h-1.5 bg-[#777777] rounded-full absolute top-[40%] left-[20%]"></div>
                            <div className="eye w-1.5 h-1.5 bg-[#777777] rounded-full absolute top-[40%] left-[68%]"></div>
                            <div className="mouth w-[10px] h-[10px] bg-transparent border-t-2 border-r-2 border-[#777777] rounded-full absolute top-[60%] left-[41%] -rotate-45"></div>
                        </div>
                        <div className="shadow w-[21%] h-[3%] bg-[#777777] opacity-50 rounded-full absolute left-[40%] top-[43%] z-10 animate-move"></div>
                        <div className="message absolute w-full text-center h-[40%] top-[47%]">
                            <h1 className="alert font-bold tracking-widest text-white text-sm py-2">Error!</h1>
                            <p className="text-gray-500 text-xs mt-[-5px] tracking-wider">Oh no, something went wrong.</p>
                        </div>
                        <button
                            onClick={props.Close}
                            className="button-box absolute bg-white w-[50%] h-[15%] rounded-[20px] top-[73%] left-[25%] shadow-xl hover:bg-opacity-70 transform transition-all hover:scale-105">
                            <h1 className="red text-[#EF8D9C]">Try Again</h1>
                        </button>
                    </div>

                )
            }
            {/* Error Box */}



        </div>

    );
}
export default SuccessErrorMessage;