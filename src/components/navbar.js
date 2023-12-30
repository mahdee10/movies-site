import { useEffect, useState } from "react";
import s from "../imgs/ser.png"
import SearchModal from "./searchModel";
import { Link } from "react-router-dom";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navbarOpaque, setNavbarOpaque] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [size, setSize] = useState(false);
    const pathname = "/";

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const openModal = () => {
        console.log("hello")
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            const triggerElementPosition = 0.8 * window.innerHeight;
            const scrollPosition = window.scrollY;
            setNavbarOpaque(scrollPosition > triggerElementPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {

        const handleResize = () => {
            setIsMenuOpen(window.innerWidth >= 768);
            if (window.innerWidth <= 768) {
                setSize(true)
            }
            else {
                setSize(false)
            }
        };

        handleResize();


        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const hideMenu = () => {
        if (window.innerWidth <= 768) {
            toggleMenu()
        }

    }
    return (
        <nav className={`sm:fixed  w-full sm:top-0 sm:left-0 z-10 navbar pt-1 sm:bg-transparent bg-navBg ${navbarOpaque ? 'opaque' : ''}`}>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Jomhuria&family=Open+Sans:wght@300&display=swap" rel="stylesheet"></link>

            <div className="max-w-screen-xl flex flex-wrap justify-between  items-center  mx-auto ">
                <Link to="/" className={`block text-center logo  no-underline text-white sm:py-1 h-full leading-8 px-5 py-3.5 italic font-extrabold ${pathname === '/' ? 'active' : ''}`}><span className="text-white text-3xl">Cine</span><span className="text-voilet text-4xl">M</span><span className="text-white text-3xl">ax</span></Link>

                <div className="flex justify-between items-center">
                    <img onClick={openModal} alt="search" src={s} className="w-5 h-5 cursor-pointer mr-1 sm:hidden block"></img>
                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-white rounded-lg md:hidden hover:bg-voilet"
                        aria-controls="navbar-default"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                </div>

                {!size && (
                    <div onClick={openModal} className='flex pl-2 cursor-pointer xl:w-[27%] l:w-1/5 md:w-1/5 bg-transparent border-2 rounded-2xl border-white sm:rounded-lgg rounded-md sm:text-base text-xxxs items-center'>
                        <img className='mr-1 sm:w-fit sm:h-fit w-2 h-2' src={s} alt="Search Icon"></img>
                        <input className="bg-transparent cursor-pointer text-white w-full sm:pl-1 sm:py-2 py-2 rounded-md sm:text-sm text-xxs " type="text" readOnly value="Search for movies "></input>
                    </div>
                )}

                <div className={`w-full md:w-auto ${isMenuOpen ? "block" : "hidden"}`} id="navbar-default">
                    <div className="sm:static absolute w-full  z-50 nav flex  flex-col md:flex-row  md:mt-0 md:border-0">
                        <Link to="/" className={`block sm:bg-transparent bg-navBg text-center text-lg no-underline text-white sm:py-1 h-full leading-8 px-5 py-3.5  ${pathname === '/' ? 'active' : ''}`}>Home</Link>
                        <Link to="/work" className={`block sm:bg-transparent bg-navBg text-center text-lg no-underline text-white sm:py-1 h-full leading-8 px-5 py-3.5  ${pathname === '/job' ? 'active' : ''}`}>New</Link>
                        <Link to="/clients" className={`block sm:bg-transparent bg-navBg text-center text-lg no-underline text-white sm:py-1 h-full leading-8 px-5 py-3.5  ${pathname === '/contact' ? 'active' : ''}`}>Tv Shows</Link>
                        <div onClick={() => { openModal(); hideMenu(); }} className={`sm:hidden sm:bg-transparent bg-navBg block text-center text-lg no-underline text-white sm:py-1 h-full leading-8 px-5 py-3.5  ${pathname === '/contact' ? 'active' : ''}`}>Search</div>
                        <Link to="/watchList" className={`block text-center text-lg no-underline sm:bg-transparent bg-navBg text-white sm:py-1 h-full leading-8 l:px-5 md:px-3 py-3.5 ${pathname === '/contact' ? 'active' : ''}`}>Watchlist</Link>
                        <Link to="/team" className={`block text-center text-lg no-underline sm:bg-transparent bg-navBg text-white sm:py-1 h-full leading-8 l:px-5  md:px-3 py-3.5 ${pathname === '/contact' ? 'active' : ''}`}>Genres</Link>
                    </div>
                </div>



            </div>
            {isModalOpen && <SearchModal closeModal={closeModal} />}
        </nav>
    )
}