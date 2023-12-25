import {  useMemo, useState } from 'react';
import { gsap } from 'gsap';

export default function Random() {
    const [flex, setFlex] = useState(false);
    const [selectedGenreMovies, setSelectedGenreMovies] = useState([]);
    const [randomMovie, setRandom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [animationTriggered, setAnimationTriggered] = useState(false);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    const boxes = useMemo(
        () => [
            { title: 'Horror', id: "27" },
            { title: 'Romance', id: "10749" },
            { title: 'Comedy', id: "35" },
            { title: 'Action', id: "28" },
            { title: 'Drama', id: "18" },
        ],
        []
    );

        const handleClick = async (index) => {
            if (animationTriggered) {
                return; // Return early if the animation has already been triggered
            }

            setLoading(true);

            // Disable click event listeners on all boxes
            boxes.forEach((_, i) => {
                const boxElement = document.getElementById(`box-${i}`);
                boxElement.removeEventListener('click', () => handleClick(i));
            });

            const selectedBox = document.getElementById(`box-${index}`);
            const tl = gsap.timeline();

            tl.to('.box', {
                scale: 0,
                duration: 1,
            }, 0);

            tl.to(selectedBox, {
                scale: 1.7,
                duration: 1,
            }, 1.5);

            tl.to('.box:not(#box-' + index + ')', { display: 'none' }, 0.3);
            setFlex(true);

            tl.to(selectedBox, {
                text: boxes[index].title,
                onComplete: () => {
                    setTimeout(async () => {
                        try {
                            const response = await fetch(
                                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${boxes[index].id}&language=en-US&page=1`
                            );
                            const data = await response.json();
                            const movies = data.results;
                            setRandom(Math.floor(Math.random() * data.results.length));
                            setSelectedGenreMovies(movies);
                            setLoading(false);
                            setAnimationTriggered(true);
                        } catch (error) {
                            console.error('Error fetching movies by genre:', error.message);
                        }
                    }, 4000);
                },
            }, 0.5);
        };



    return (
        <div className="flex-col flex w-full justify-center items-center py-7 sm:my-10 my-5 bg-[#1d0d25] sm:px-0 px-4">
            <h1 className="sm:text-4xl text-2xl text-white font-bold title">Random Choice</h1>
            <h2 className="sm:text-lg text-sm text-[#66576e] pb-3 py-5">Choose a genre</h2>
            <div className={`flex flex-wrap items-center min-h-[220px] sm:w-1/2 sm:pt-4 pt-2 ${flex ? 'justify-center' : 'justify-between'}`}>
                {boxes.map((box, index) => (
                    <div
                        onClick={() => handleClick(index)}
                        style={{
                            backgroundImage: selectedGenreMovies.length > 0
                                ? `url(${`https://image.tmdb.org/t/p/w500/${selectedGenreMovies[randomMovie].poster_path}`})`
                                : 'none',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                        }
                        }
                        key={box.title}
                        id={`box-${index}`}
                        className={`${selectedGenreMovies.length > 0 ? "animated-border" : ""} animated-div transition-animation box border-2 mt-1 flex sm:text-base text-xs  items-center justify-center border-white text-white sm:h-28 sm:w-20 h-[100px] w-[77px] text-center`}
                    >
                        {/* {selectedGenreMovies.length > 0 && (
                                <img
                                className='w-full h-full z-10'
                                    src={`https://image.tmdb.org/t/p/w500/${selectedGenreMovies[0].poster_path}`}
                                    alt={selectedGenreMovies[0].title}
                                />
                        )} */}
                        {selectedGenreMovies.length === 0 && (
                            <div>
                                {box.title}

                            </div>

                        )}
                        <div className={`${loading ? "spotlight" : ""}`}></div>

                    </div>
                ))}
            </div>

            {/* {selectedGenreMovies.length > 0 && (
        <div>
          <h2>Selected Genre Movies</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500/${selectedGenreMovies[0].poster_path}`}
            alt={selectedGenreMovies[0].title}
          />
        </div>
      )} */}
        </div>
    );
}
