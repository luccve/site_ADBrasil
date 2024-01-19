import { ReactNode, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ScrollToHashElement from '../ScrollToHashElement';
import Icone from '/Icone.svg';
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";

interface NavMapProps {
    children: ReactNode
}


const NavMap = ({ children }: NavMapProps) => {
    const navigate = useNavigate();
    const [close, setClose] = useState(false);
    const [subMenu, setSubMenu] = useState(false);


    const menu = [
        { title: 'Projeto', link: "#section4" },
        { title: 'Funcionalidades', link: "#section1" },
        { title: 'Educacional', link: "#section2" },
        { title: 'AI Soil', link: "balance" },
    ];

    const handleMenu = () => {
        setClose(!close);

    };

    const toogleClick = (url: string) => {
        navigate(url);
    };


    const renderMobileMenu = () => (
        <ul className='flex flex-col items-center sm:hidden space-x-3 max-sm:flex-col max-sm:space-y-[30px] max-sm:space-x-0  
        ease-in-out transition-all animate-stagger duration-1000
        '>
            {menu.map((item, index) => (
                <li key={index} className='w-full'>
                    {index !== 3 ? (
                        <NavLink onClick={() => toogleClick(item.link)} to={{ hash: item.link, pathname: '/' }}>
                            {item.title}
                        </NavLink>
                    ) : (
                        <Link to={item.link}>
                            {item.title}
                        </Link>
                    )}
                </li>
            ))}


            {children}

        </ul>
    );



    const renderDesktopMenu = () => (
        <>
            {
                !subMenu && <ul className='flex flex-col justify-between items-center max-sm:hidden space-y-12 '>
                    <Link to="/">
                        <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto cursor-pointer' />
                    </Link>
                    {menu.map((item, index) => (
                        <li key={index} className='w-36 rounded-md tracking-wide hover:scale-110 hover:bg-blue hover:text-white transition-all duration-500 ease-in-out'>
                            {index !== 3 ? (
                                <NavLink onClick={() => toogleClick(item.link)} to={{ hash: item.link, pathname: '/' }}>
                                    {item.title}
                                </NavLink>
                            ) : (
                                <Link to={item.link}>
                                    {item.title}
                                </Link>
                            )}
                        </li>
                    ))}

                    {children}

                    <div className='text-sm absolute top-[80%]'>

                        <h1>Version 0.6.3</h1>
                        <h1>Embrapa Solos UEP Recife</h1>
                    </div>
                </ul>

            }
            <button onClick={() => setSubMenu(!subMenu)} className='max-sm:hidden text-blue w-auto rounded absolute 
                top-[95%] left-[50%] translate-x-[-50%] translate-y-[-50%]' >


                {subMenu ? <FiArrowRightCircle className={'text-2xl'} /> : <FiArrowLeftCircle className={'text-2xl'} />}


            </button>
        </>
    );

    return (
        <>
            <div className="bg-white h-full flex flex-col justify-between p-4 max-md:p-2 rounded shadow-md shadow-blue_l py-12 relative">
                <ScrollToHashElement />


                <nav className="text-blue text-md font-bold inline-block max-lg:text-xs space-y-5 ">

                    <div>
                        <span className='sr-only'>Open Menu</span>
                        <button onClick={() => handleMenu()}>
                            {close ? (
                                <AiOutlineClose className='border border-blue rounded-md text-blue text-3xl block m-auto sm:hidden cursor-pointer' />
                            ) : (
                                <FiMenu className='border border-blue rounded-md animate-wiggle text-blue  m-auto text-3xl block sm:hidden cursor-pointer' />
                            )}
                        </button>
                    </div>
                    {close ? renderMobileMenu() : renderDesktopMenu()}

                </nav>



                {close && <div className='text-sm absolute top-[80%] text-blue font-bold'>
                    <h1>Version 0.6.3</h1>
                    <h1>Embrapa Solos</h1>
                    <h1>UEP Recife</h1>
                </div>}





            </div>
        </>
    );
};

export default NavMap;
