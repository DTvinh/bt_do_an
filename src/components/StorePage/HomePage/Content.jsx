
import { Link } from 'react-router-dom'
import './content.scss'
import img1 from '../../../assets/content/dong-ho-skeleton-1.avif'
import img2 from '../../../assets/content/dong-ho-phien-ban-gioi-han.avif'
import img3 from '../../../assets/content/dong-ho-sieu-mong.avif'
import img4 from '../../../assets/content/dong-ho-dinh-kim-cuong.avif'
import img5 from '../../../assets/content/dong-ho-vang-18k-1.avif'
import img6 from '../../../assets/content/dong-ho-vat-lieu-quy-hiem.avif'
import img7 from '../../../assets/content/dong-ho-xa-cu.avif'
import img8 from '../../../assets/content/day-da-hirsch.avif'
import img9 from '../../../assets/content/day-da-that.avif'
import img10 from '../../../assets/content/trang-suc-dep.avif'




import watchMan from '../../../assets/content/dong-ho-nam.jpg'
import watchWomen from '../../../assets/content/dong-ho-nu.jpg'
import watchDouble from '../../../assets/content/dong-ho-doi.jpg'
import watchSaga from '../../../assets/content/saga-charm.jpg'







const datas = [
    {
        image: img1,
        title: "Đồng hồ skeleton",
        link: "/category/6732cb56e61da6aef15b0bbc "
    },
    {
        image: img2,
        title: "Đồng hồ phiên bản giới hạn ",
        link: "#"
    },
    {
        image: img3,
        title: "Đồng hồ siêu mỏng",
        link: "#"
    },
    {
        image: img4,
        title: "Đồng hồ skeleton",
        link: "#"
    },
    {
        image: img5,
        title: "Đính kim cương",
        link: "#"
    },
    {
        image: img6,
        title: "Đồng hồ vàng 18k",
        link: "#"
    },
    {
        image: img7,
        title: "Đồng hồ thời trang xà cừ",
        link: "#"
    },
    {
        image: img8,
        title: "Dây da Hirsch",
        link: "#"
    },
    {
        image: img9,
        title: "Dây da thật ",
        link: "#"
    },
    {
        image: img10,
        title: "Trang sức ",
        link: "#"
    },



]







function Comtent() {
    return (
        <>
            <div className="  bg-white ">
                <div className="h-[420px] pt-10 mt-20  flex " >
                    <div className="grid grid-cols-5 gap-4 m-auto h-full w-[900px]  border-b border-b-slate-500">

                        {
                            datas.map((item, index) =>
                            (

                                <Link to={item.link} key={index} className=" border w-[120px] h-[120px] m-[10px] rounded-xl overflow-hidden abc">
                                    <img src={item.image} alt="" className='w-full h-full bg-[]' />
                                    <span className='z-20  absolute w-[120px] text-center text-gray-400 hover:opacity-100 '> {item.title}</span>
                                </Link>
                            )
                            )
                        }


                    </div>

                </div>



                <div className='h-[700px] flex mt-5  pb-10 border-b'>
                    <div className="grid-cols-4 grid gap-1 grid-rows-2  m-auto h-full max-w-[1000px]  ">
                        <div className=" col-span-2  row-span-4  w-[100%] h-[100%]  relative rounded-xl overflow-hidden ">
                            <div className='absolute bottom-5 left-5'>
                                <p className='text-3xl text-white  shadow-black drop-shadow-2xl text-shadow'> Bộ sưu tập mới </p>
                                <Link className="text-gray-500 hover:text-white" to='/#'> Mua ngay  </Link >
                            </div>
                            <img src={watchSaga} alt="" className='w-full h-full' />
                        </div>
                        <div className=" col-span-1   w-[100%] h-[100%]  rounded-xl relative overflow-hidden ">
                            <div className='absolute bottom-5 left-5'>
                                <p className='text-3xl text-white  shadow-black drop-shadow-2xl text-shadow'>Đồng hồ nam </p>
                                <Link className="text-gray-500 hover:text-white" to='/category1/nam'> Mua ngay  </Link >
                            </div>
                            <img src={watchMan} alt="" className='w-full h-full' />
                        </div>
                        <div className=" col-span-1  relative  w-[100%] h-[100%] rounded-xl overflow-hidden ">
                            <div className='absolute bottom-5 left-5'>
                                <p className='text-3xl text-white  shadow-black drop-shadow-2xl text-shadow'> Đồng hồ nữ  </p>
                                <Link className="text-gray-500 hover:text-white" to='/category1/nu'> Mua ngay  </Link >
                            </div>

                            <img src={watchWomen} alt="" className='w-full h-full' />
                        </div>
                        <div className=" col-span-2  relative  w-[100%] h-[100%] rounded-xl overflow-hidden ">

                            <div className='absolute bottom-5 left-5'>
                                <p className='text-3xl text-white  shadow-black drop-shadow-2xl text-shadow'> Đồng hồ đôi</p>
                                <Link className="text-gray-500 hover:text-white" to='/category/6743406f703225e479581d00'> Mua ngay  </Link >
                            </div>
                            <img src={watchDouble} alt="" className='w-full h-full' />

                        </div>



                    </div>


                </div>

            </div>

        </>
    );
}

export default Comtent;