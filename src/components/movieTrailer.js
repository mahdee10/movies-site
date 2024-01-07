export default function Trailer({ movie }) {
    const getTrailerKey = () => {
        const trailer = movie.videos.find(video => video.type === 'Trailer');
        return trailer ? trailer.key : null;
    };

    return (

        <div className=" flex justify-center mt-12">
            {getTrailerKey() ? (
                <iframe
                    className="sm:w-3/4 sm:h-[500px] h-[200px]"
                    src={`https://www.youtube.com/embed/${getTrailerKey()}`}
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                null
            )
            }
        </div>
    )
}