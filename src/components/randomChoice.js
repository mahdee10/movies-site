import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';

export default function Random() {
    const [flex, setFlex] = useState(false);
    const [selectedGenreMovies, setSelectedGenreMovies] = useState([]);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        const handleClick = async (index) => {
            setLoading(true)
            // Get the selected box
            const selectedBox = document.getElementById(`box-${index}`);

            // Remove click event listeners from all boxes
            boxes.forEach((_, i) => {
                const boxElement = document.getElementById(`box-${i}`);
                boxElement.removeEventListener('click', () => handleClick(i));
            });

            // Create a timeline for the animation
            const tl = gsap.timeline();

            // Animation to scale down the unselected boxes
            tl.to(
                '.box',
                {
                    scale: 0,
                    // opacity: 0.5,
                    duration: 1,
                },
                0
            );

            // Animation to move and scale up the selected box
            tl.to(
                selectedBox,
                {
                    scale: 1.7,
                    duration: 1,
                },
                1.5
            );

            // Animation to hide the unselected boxes
            tl.to('.box:not(#box-' + index + ')', { display: 'none' }, 0.3);
            setFlex(true);

            // Animation to display the selected box title
            tl.to(
                selectedBox,
                {
                    text: boxes[index].title,
                    onComplete: () => {
                        setTimeout(async () => {
                            try {
                                // Fetch movies for the selected genre
                                const response = await fetch(
                                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${boxes[index].id}&language=en-US&page=1`
                                );
                                const data = await response.json();
                                const movies = data.results;
                                setSelectedGenreMovies(movies);
                                setLoading(false)

                            } catch (error) {
                                console.error('Error fetching movies by genre:', error.message);
                            }
                        }, 4000);
                    },
                },
                0.5
            );
        };

        // Add click event listeners to each box
        boxes.forEach((_, index) => {
            const boxElement = document.getElementById(`box-${index}`);
            boxElement.addEventListener('click', () => handleClick(index));
        });

        // Cleanup event listeners on component unmount
        return () => {
            boxes.forEach((_, index) => {
                const boxElement = document.getElementById(`box-${index}`);
                boxElement.removeEventListener('click', () => handleClick(index));
            });
        };
    }, [boxes]);

    return (
        <div className="flex-col flex w-full justify-center items-center py-7 sm:my-10 my-5 bg-[#1d0d25] sm:px-0 px-4">
            <h1 className="sm:text-4xl text-2xl text-white font-bold title">Random Choice</h1>
            <h2 className="sm:text-lg text-sm text-[#66576e] pb-3 py-5">Choose a genre</h2>
            <div className={`flex flex-wrap items-center min-h-[220px] sm:w-1/2 sm:pt-4 pt-2 ${flex ? 'justify-center' : 'justify-between'}`}>
                {boxes.map((box, index) => (
                    <div
                        style={{
                            backgroundImage: selectedGenreMovies.length > 0
                                ? `url(${`https://image.tmdb.org/t/p/w500/${selectedGenreMovies[2].poster_path}`})`
                                : 'none',
                            backgroundSize: '100% 100%',
                            backgroundRepeat: 'no-repeat',
                        }
                        }
                        key={box.title}
                        id={`box-${index}`}
                        className={`${selectedGenreMovies.length>0 ? "animated-border" : ""} animated-div transition-animation box border-2 mt-1 flex sm:text-base text-xs  items-center justify-center border-white text-white sm:h-28 sm:w-20 h-[100px] w-[77px] text-center`}
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
