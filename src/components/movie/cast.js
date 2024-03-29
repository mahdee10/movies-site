import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// import { useNavigate } from "react-router-dom";
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ActorPoster from '../shared/actorPoster';
export default function Cast({ movie }) {
    // const navigate=useNavigate();
    // function navigation(id){
    //     navigate(`/actor/${id}`)
    // }
    return (

        <div className='sm:pt-32 pt-10 sm:px-20 px-2 '>
            <div className='flex justify-center pb-4'>
                <h2 className="text-white title w-fit sm:text-4xl text-3xl font-bold sm:text-start text-center sm:self-auto self-center ">Cast</h2>

            </div>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                effect="fade"
            
   
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
                        slidesPerView: 5.1,
                        spaceBetween: 1,
                    },
                }}
            >

                {
                    movie.credits.cast.slice(0,10).map((actor) => (
                        <SwiperSlide
                            key={actor.id}>
                            {
                                actor.known_for_department === "Acting" && actor.profile_path ?
                                    // <img onClick={()=>{navigation(actor.id)}} key={actor.id} alt="actor" className="sm:w-[210px] sm:h-[250px] mt-3  h-[200px]" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></img>
                                    <ActorPoster actor={actor} source={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} classContent={"sm:w-[210px] sm:h-[250px] mt-3  h-[200px]"}></ActorPoster>
                                    : null
                            }
                        </SwiperSlide>


                    ))
                }

            </Swiper>
        </div>
    )
}