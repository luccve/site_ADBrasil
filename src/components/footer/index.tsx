
import Embrapa from '/logo_embrapa.png'
import '../../App.css'

const footer = () => {


    return (

        <>
            <div className="h-auto bg-white rounded shadow shadow-blue_l ">
                <footer className="flex flex-col justify-center items-center space-x-0 md:flex-row md:space-x-12 ">


                    <img src={Embrapa} alt="Logo da Embrapa" className='h-auto w-24' />


                    <p className=" w-1/4 py-4 ">
                        Empresa Brasileira de Pesquisa Agropecuária - Embrapa
                        Embrapa Solos UEP Recife</p>



                    <p className="w-1/4 py-4">Parque Estação Biológica - PqEB s/nº Brasília, DF - Brasil - CEP 70770-901
                        <br/>SAC:
                        <a className=' text-blue' href="https://www.embrapa.br/fale-conosco"> Fale conosco</a>
                    </p>


                </footer>


            </div>
        </>

    );

}

export default footer;
