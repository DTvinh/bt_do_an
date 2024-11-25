// import image1 from '../../../assets/poster/poster3a.jpg'
import image1 from '../../../assets/poster/poster4.png'
import image2 from '../../../assets/poster/poster1.jpg'
import image3 from '../../../assets/poster/poster3a.png'
// import Slider from "react-slick";


const ImageList = [
    {
        id: 1,
        img: image1,
        title: "Upto 50% off on all Men's Wear",
        description:
            "lorem His Life will forever be Changed dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 2,
        img: image2,
        title: "30% off on all Women's Wear",
        description:
            "Who's there lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
        id: 3,
        img: image3,
        title: "70% off on all Products Sale",
        description:
            "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
];
function Hero() {



    // var settings = {
    //     dots: false,
    //     arrows: false,
    //     infinite: true,
    //     speed: 800,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 4000,
    //     cssEase: "ease-in-out",
    //     pauseOnHover: false,
    //     pauseOnFocus: true,
    // };
    return (
        <>
            <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center  dark:text-black duration-200 ">
                <div className="h-[700px] w-[700px] bg-primary absolute -top-1/2 right-0 rounded-3xl rotate-45 -z[8]"></div>


                <div className="grid ml-20 grid-cols-1 sm:grid-cols-2">
                    {/* text content section */}
                    <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                        <h1
                            data-aos="zoom-out"
                            data-aos-duration="500"
                            data-aos-once="true"
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                        >
                            {ImageList[0].title}
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="100"
                            className="text-sm"
                        >
                            {ImageList[0].description}
                        </p>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="300"
                        >
                            <button
                                // onClick={}
                                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                    {/* image section */}
                    <div className="order-1 sm:order-2">
                        <div
                            data-aos="zoom-in"
                            data-aos-once="true"
                            className="relative z-10"
                        >
                            <img
                                src={image1}
                                alt=""
                                className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>

            </div>



        </>
    );
}

export default Hero;