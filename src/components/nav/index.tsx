import Icone from '/Icone.svg';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

import { NavLink, Link, useNavigate } from 'react-router-dom';
import ScrollToHashElement from '../ScrollToHashElement';


const nav = () => {
    const navigate = useNavigate();
    const [close, setClose] = useState(false);

    const menu = [
        { title: 'Projeto', link: "/#section4" },
        { title: 'AD por tipo de solo e textura', link: "/catalogo" },
        { title: 'AD Funções para cálculo (PTF)', link: "/ptf" },
        { title: 'AD no mapa', link: "/map" },
        { title: 'Educacional', link: "edu" },
        { title: 'AI Soil', link: "/balance" },
    ]

    const menuDesktop = [
        { title: 'Projeto', link: "#section4" },
        { title: 'Funcionalidades', link: "#section1" },
        { title: 'Educacional', link: "/edu" },
        { title: 'AI Soil', link: "/balance" },
    ]

    const handleMenu = () => {

        setClose(!close);
    }



    const toogleClick = (url: string) => {
        navigate(url);
    }



    return (

        <>
            <div className="bg-white w-auto rounded shadow shadow-blue_l h-auto py-4">

                <ScrollToHashElement />
                <nav className="text-blue text-md font-bold inline-block max-lg:text-xs space-y-5 ">

                    {/* Imagem */}
                    <div className='flex flex-row items-center place-items-center space-x-32 sm:hidden'>

                        <Link
                            to={"/"} >
                            <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto' />
                        </Link>


                        <span className='sr-only'>Open Menu</span>
                        <button onClick={() => handleMenu()}>
                            {close ? <AiOutlineClose className='border border-blue rounded-md text-blue text-3xl block m-auto sm:hidden cursor-pointer' /> :
                                < FiMenu className='border border-blue rounded-md animate-wiggle text-blue  m-auto text-3xl block sm:hidden cursor-pointer' />}
                        </button>
                    </div>

                    {/* MENU VERSAO MOBILE */}
                    {close && <ul className=' flex flex-row items-center sm:hidden space-x-3 max-sm:flex-col max-sm:space-y-6 max-sm:space-x-0
                    duration-1000 ease-in-out transition-all animate-stagger '>


                        {menu.map((item, index) => (
                            <li key={index} className='w-full'>


                                <Link className='"block border-b-blue border-b-2 hover:bg-blue p-2 rounded-md tracking-wide  hover:text-white duration-300 hover:ease-in-out transition-all'
                                    to={item.link} >{item.title}</Link>

                            </li>

                        ))}

                    </ul>}

                    {/* MENU VERSAO DESKTOP */}
                    <ul className=' flex justify-between max-sm:hidden space-x-[20px] relative w-[1000px]'>
                        <Link to="/" className='order-first  w-24'>
                            <img src={Icone} alt="Icone do Aplicativo" className=' max-lg:w-16 h-auto max-sm:m-auto cursor-pointer' />
                        </Link>

                        <div className='flex flex-row items-center'>
                            {menuDesktop.map((item, index) => {
                                if (index != 2 && index != 3) {
                                    return (
                                        <li key={index}
                                            className='text-lg rounded hover:scale-105 hover:bg-blue 
                                                             hover:text-white transition-all duration-500 ease-in-out p-2'>

                                            <NavLink onClick={() => toogleClick(item.link)} to={{ hash: item.link, pathname: '/' }} >
                                                {item.title}
                                            </NavLink>
                                        </li>
                                    )
                                }

                                else if (index === 3 || index === 2) {
                                    return (<li key={index}
                                        className='text-lg rounded tracking-wide hover:scale-105 hover:bg-blue 
                                                         hover:text-white transition-all duration-500 ease-in-out p-2'>
                                        <Link to={item.link}>
                                            {item.title}
                                        </Link>
                                    </li>)

                                }

                            }
                            )}
                        </div>
                    </ul>

                </nav>
            </div>
        </>

    );

}

export default nav;
