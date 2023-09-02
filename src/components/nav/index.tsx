import Icone from '/Icone.svg';



const nav = () => {


    return (

        <>
            <div className="bg-white w-auto rounded shadow shadow-blue_l h-auto py-4">

                <nav className="text-blue text-lg font-bold ">

                    <ul className='flex flex-col justify-center items-center space-y-3 md:h-auto md:flex-row space-x-6'>
                        <li >
                            <a href=""><img src={Icone} alt="Icone do Aplicativo" className='w-32 h-auto' /></a>

                        </li>
                        <li>
                            <a className="hover:text-turquoise" href="#section1">Home</a>

                        </li>
                        <li>
                            <a className=" hover:text-turquoise" href="#section2">AD por tipo de solo e textura</a>

                        </li>

                        <li>
                            <a className=" hover:text-turquoise" href="#section3">AD funções para cálculo (PTF)</a>

                        </li>
                        <li>
                            <a className=" hover:text-turquoise" href="#section4">Educacional</a>

                        </li>
                        <li><a className=" hover:text-turquoise" href="#section1">Balanço Hídrico</a></li>
                    </ul>
                </nav>
            </div>
        </>

    );

}

export default nav;
