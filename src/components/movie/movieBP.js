import { useEffect, useState } from "react";

export default function MovieBP({ poster, background }) {
    const [size, setSize] = useState(null);
    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="">
            <div
                className="relative sm:h-[80vh] h-[40vh]"
                style={{
                    backgroundSize: size <= 768 ? '100% 100%' : 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        background 
                            ? `url(https://image.tmdb.org/t/p/original/${background})`
                            : 'none'
                }}
            >
                <img className="absolute sm:left-[5%] left-[5%] sm:bottom-[-20%] bottom-[-30%] sm:w-[200px] sm:h-[300px] w-[110px] h-[160px]" alt="t" src={`https://image.tmdb.org/t/p/original/${poster}`}></img>
            </div>
        </div>
    )
}