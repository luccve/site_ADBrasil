import Icone from '/Icone.svg';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';






const nav = () => {

    const [close, setClose] = useState(false);

    const menu = [
        { title: 'Projeto', link: "#section4" },
        { title: 'AD por tipo de solo e textura', link: "#" },
        { title: 'AD Funções para cálculo (PTF)', link: "#" },
        { title: 'Educacional', link: "#section2" },
        { title: 'Balanço Hídrico', link: "#" },
    ]

    const handleMenu = () => {
        setClose(!close);
    }

    return (

        <>
            <div className="bg-white w-auto rounded shadow shadow-blue_l h-auto py-4">

                <nav className="text-blue text-md font-bold inline-block max-lg:text-xs space-y-5">

                    <span className='sr-only'>Open Menu</span>
                    <button onClick={() => handleMenu()}>
                        {close ? <AiOutlineClose className='text-blue text-3xl block m-auto sm:hidden cursor-pointer' /> :
                            < FiMenu className='text-blue  m-auto text-3xl block sm:hidden cursor-pointer' />}
                    </button>

                    {close && <ul className='flex flex-row items-center sm:hidden space-x-3 max-sm:flex-col max-sm:space-y-6 max-sm:space-x-0'>
                        <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto cursor-pointer' />

                        {menu.map((item, index) => (
                            <li key={index} className='w-full'>
                                <a className="hover:bg-blue p-2 rounded-md hover:text-white duration-300 hover:ease-in-out transition-all" href="#section4">
                                    {item.title}
                                </a>
                            </li>
                        ))}

                    </ul>}

                    <ul className='flex flex-row items-center  space-x-3 max-sm:hidden'>
                        <img src={Icone} alt="Icone do Aplicativo" className='w-24 max-lg:w-16 h-auto max-sm:m-auto cursor-pointer' />

                        {menu.map((item, index) => (
                            <li key={index} className='w-full'>
                                <a className="hover:bg-blue p-2 rounded-md hover:text-white duration-300 hover:ease-in-out transition-all" href="#section4">
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
