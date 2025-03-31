'use client';

// import Swiper core and required modules
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../app/styles.css'

export function CustomCarousel() {


    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
        >
            {[1, 2, 3, 4, 5].map((item, index: number) => (
                <SwiperSlide key={"slide-" + index}>
                    <div className="flex h-full w-full items-center justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1587713714775-fa70364f6445?q=80&w=2882&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Slide 1"
                            className="h-48 w-96 object-fit rounded-lg"
                        />
                    </div>

                </SwiperSlide>
            ))}
        </Swiper>

    );
}