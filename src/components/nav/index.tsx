import Icone from '/Icone.svg';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';


const nav = () => {

    const [close, setClose] = useState(false);

    const menu = [
        { title: 'Projeto', link: "/#section4" },
        { title: 'AD por tipo de solo e textura', link: "/catalogo" },
        { title: 'AD Funções para cálculo (PTF)', link: "/ptf" },
        { title: 'Educacional', link: "/#section2" },
        { title: 'Balanço Hídrico', link: "/balance" },
    ]

    const handleMenu = () => {

        setClose(!close);
    }





    return (

        <>
            <div className="bg-white w-auto rounded shadow shadow-blue_l h-auto py-4 ">


                <nav className="text-blue text-md font-bold inline-block max-lg:text-xs space-y-5">

                    {/* Imagem */}
                    <div className='flex flex-row items-center place-items-center space-x-32 sm:hidden'>

                        <a href="/">
                            <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto' />
                        </a>
                        <span className='sr-only'>Open Menu</span>
                        <button onClick={() => handleMenu()}>
                            {close ? <AiOutlineClose className='border border-blue rounded-md animate-pulse text-blue text-3xl block m-auto sm:hidden cursor-pointer' /> :
                                < FiMenu className='border border-blue rounded-md animate-pulse text-blue  m-auto text-3xl block sm:hidden cursor-pointer' />}
                        </button>
                    </div>

                    {/* MENU VERSAO MOBILE */}
                    {close && <ul className=' flex flex-row items-center sm:hidden space-x-3 max-sm:flex-col max-sm:space-y-6 max-sm:space-x-0
                    duration-1000 ease-in-out transition-all'>


                        {menu.map((item, index) => (
                            <li key={index} className='w-full'>
                                <a className="hover:bg-blue p-2 rounded-md tracking-wide  hover:text-white duration-300 hover:ease-in-out transition-all" href={item.link}>
                                    {item.title}
                                </a>
                            </li>
                        ))}

                    </ul>}

                    {/* MENU VERSAO DESKTOP */}
                    <ul className='flex flex-row items-center max-sm:hidden space-x-4'>
                        <a href="/">
                            <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto cursor-pointer' />
                        </a>
                        {menu.map((item, index) => (
                            <li key={index} className='w-36 rounded-md tracking-wide hover:bg-blue  hover:text-white duration-300 hover:ease-in-out transition-all'>
                                <a href={item.link}>
                                    {item.title}
                                </a>
                            </li>
                        ))}

                    </ul>

                </nav>
            </div>
        </>

    );

}

export default nav;
