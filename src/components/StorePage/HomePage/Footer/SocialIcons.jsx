import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";


const SocialIcons = ({ Icons }) => {
    return (
        <div className="text-teal-500">

            <Link
                className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
            duration-300 "
            >
                <FaFacebook />
            </Link>
            <Link
                className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
            duration-300 "
            >
                <FaFacebookMessenger />
            </Link>
            <Link
                className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
            duration-300 "
            >
                <FaInstagram />
            </Link>
            <Link
                className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
            duration-300 "
            >
                <SiZalo />
            </Link>
            <Link
                className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500
            duration-300 "
            >
                <FaTiktok />
            </Link>
        </div>
    );
};

export default SocialIcons;