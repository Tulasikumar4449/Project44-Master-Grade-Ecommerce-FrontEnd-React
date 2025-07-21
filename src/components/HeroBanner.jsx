import { Swiper, SwiperSlide } from 'swiper/react';

// Import modules you need
import { EffectFade } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'

import { bannerLists } from '../utils';
import { teal } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const colors = [
    "bg-[#FDC200]",
    "bg-[#FF2C2C]",
    "bg-[#21AD61]"
];
const images = ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://images.unsplash.com/photo-1697201343065-cb31498aac68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGdyZWVuJTIwd2l0aCUyMHNvbWUlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D"
]

const HeroBanner = ()=>{
    return (
        <div>
            <Swiper
                 grabCursor={true}
                 autoplay={{delay: 4000, disableOnInteraction: false}}
                 navigation={true}
                 modules={[Pagination, EffectFade, Autoplay, Navigation]}
                 pagination={{ clickable: true }}
                 scrollbar={{draggable: true}}
                 slidesPerView={1}>
                {bannerLists.map((item,i)=>{
                    return( <SwiperSlide key={item.id}>
                        <div className={`carousel-item rounded-md sm:h-[300px] h-96 ${colors[i]} `}>
                            <div className='flex items-center justify-center'>
                                <div className='hidden lg:flex justify-center w-1/2 p-8'>
                                <div className='text-center justify-center'>
                                    <h3 className='text-3xl text-white font-bold'>{item.title}</h3>
                                    <h1 className='text-5xl text-white font-bold mt-2'>
                                        {item.subtitle}
                                    </h1>
                                    <p className='text-white font-bold mt-4'>
                                        {item.description}
                                    </p>
                                    <Link 
                                    to="/products" className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'>
                                        Shop
                                    </Link>

                                </div>

                            </div>
                            <div className='w-full flex justify-center lg:w-1/2 p-4'>
                                <img src={images[i]} alt={item.title} width={400} height={600} className='rounded'/>
                            </div>
                            </div>

                        </div>
                    </SwiperSlide>)
                   

                }
                )}
            </Swiper>
        </div>
    );
}
export default HeroBanner;