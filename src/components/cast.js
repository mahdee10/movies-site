import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Cast({ movie }) {
    return (
        // <div className="sm:pt-32 pt-10 sm:px-20 px-2 flex flex-col">
        //     <h2 className="text-white title w-fit sm:text-4xl text-3xl font-bold sm:text-start text-center sm:self-auto self-center ">Cast</h2>
        //     <div className="flex pt-5 justify-between flex-wrap">
        //         {
        //             movie.credits.cast.map((actor)=>(
        //                 actor.known_for_department==="Acting" && actor.profile_path ? 
        //                 <img key={actor.id} alt="actor" className="sm:w-[210px] sm:h-[250px] mt-3 w-[49%] h-[200px]" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></img> 
        //                 : null
        //             ))
        //         }
        //     </div>
        // </div>
        <div className='sm:pt-32 pt-10 sm:px-20 px-2 '>
            <div className='flex justify-center pb-4'>
                <h2 className="text-white title w-fit sm:text-4xl text-3xl font-bold sm:text-start text-center sm:self-auto self-center ">Cast</h2>

            </div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                effect="fade"
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={(swiper) => {
                    // console.log('slide change', swiper.activeIndex);
                    // setActiveSlideIndex(swiper.activeIndex);
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 2.3,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 5.2,
                        // spaceBetween: 1,
                    },
                }}
            >

                {
                    movie.credits.cast.slice(0,10).map((actor) => (
                        <SwiperSlide
                            key={actor.id}>
                            {
                                actor.known_for_department === "Acting" && actor.profile_path ?
                                    <img key={actor.id} alt="actor" className="sm:w-[210px] sm:h-[250px] mt-3  h-[200px]" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></img>
                                    : null
                            }
                        </SwiperSlide>


                    ))
                }

            </Swiper>
        </div>
    )
}