
import Ptf from '/ptf.svg'
import Mapa from '/localizacao.svg'
import Catalog from '/catalogo.svg'
import BtnLink from '../../components/btnLink'
import Logo from '/agua_logo.svg'
import Balaco from '/BalanceLogo.svg'
import Mockup from '/mockup.png'
import GooglePlay from '/google_play.png'
import Card from '../../components/card'
import BtnSave from '../../components/btnSave'

const Home = () => {

    return (
        <>
            <section id="section1" className='
        flex
        flex-col
        justify-center
        items-center
        section_right h-screen rounded shadow shadown-blue_l drop-shadow drop-shadow-blue_l
        space-y-5
    
        ' >
                <h1 className="text-white text-5xl max-lg:text-3xl font-bold tracking-wide">
                    Plataforma ADBrasil
                </h1>

                <p className='text-white w-3/4 text-lg max-lg:text-base font-semibold'>Oferece informações de água disponivel para análise de solos no Brasil.
                    Com recursos de mapeamento de unidades de água no solo, detalhes dos componentes do solo,
                    um banco de dados para salvar pontos no mapa, catálogo de disponibilidade de água e 14 funções de pedotransferência.</p>

                <div className='flex flex-row space-x-24 items-center max-lg:flex-col max-lg:space-x-0 max-lg:space-y-5 font-bold sm:flex-row sm:space-y-0 sm:space-x-0'>

                    <div className='flex flex-col items-center'>
                        <img className=' w-28 max-lg:w-16' src={Mapa} alt="Icone do Mapa" />
                        <BtnLink Title='Mapa' />
                    </div>

                    <div className=' flex flex-col items-center '>
                        <img src={Catalog} className='w-28 max-lg:w-16' alt="Icone da ferramenta do catalogo" />
                        <BtnLink Title='Catálogo' />
                    </div>

                    <div className='flex flex-col items-center '>
                        <img className=' w-28 max-lg:w-16' src={Ptf} alt="Icone da ferramenta de pedotransferencia" />
                        <BtnLink Title='Pedotransferência' />
                    </div>


                </div>

            </section>

            <section id='section2' className=' flex p-2 flex-col h-screen  justify-center
        items-center space-y-8 bg-white rounded shadow shadow-blue_l'>

                <div className=" text-5xl max-lg:text-3xl font-bold tracking-wide">
                    <h1 >
                        <a className='text-blue'>Aprenda</a> os principais conceitos sobre o tema!
                    </h1>
                </div>

                <div className='flex flex-row space-x-24 items-center max-lg:flex-col max-lg:space-x-0 max-lg:space-y-5 font-bold sm:flex-row sm:space-y-0  sm:space-x-0'>

                    <div className=' flex flex-col items-center '>
                        <img className=' w-28 max-lg:w-16' src={Logo} alt="Icone de água disponivel" />
                        <BtnLink Title='Água disponível' />
                    </div>



                    <div className='flex flex-col items-center '>
                        <img className=' w-28 max-lg:w-16' src={Ptf} alt="Icone da ferramenta de pedotransferencia" />
                        <BtnLink Title='Pedotransferência' />
                    </div>

                    <div className=' flex flex-col items-center '>
                        <img src={Balaco} className='w-28 max-lg:w-16' alt="Icone da ferramenta do catalogo" />
                        <BtnLink Title='Balanço Hídrico' />
                    </div>

                </div>
                <BtnSave Title='Educacional' />
            </section>

            <section id='section3' className='flex p-2 flex-col h-screen items-center justify-center section_left relative rounded shadow shadow-blue_l'>
                <div className='flex  flex-col items-center justify-center'>
                    <h1 className=" text-5xl max-lg:text-3xl font-bold tracking-wide" >Faça o download do aplicativo!</h1>

                    <div className='flex flex-row items-center justify-center'>
                        <p className='text-3xl w-2/3 max-lg:text-lg'>Acesse também o aplicativo ADBrasil, contanto com as principais funcionalidades Mapa, Catálogo, PTF e um Banco de Dados.</p>
                        <img className='max-lg:w-24 h-auto' src={Mockup} alt="Imagem de um celular com o splash screen do aplicativo adbrasil" />
                    </div>
                    <img className='object-contain h-auto w-64 max-lg:w-40 cursor-pointer' src={GooglePlay} alt="Google Play Imagem com link para o aplicativo adbrasil" />
                </div>

            </section>

            <section id='section4' className='flex flex-col justify-center h-screen p-2 section_grass rounded shadow shadow-blue_l max-lg:h-full '>
                <div className='grid grid-cols-2 justify-items-center max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 '>

                    <Card Title='Projeto' Text='Uma iniciativa da Embrapa Solos UEP Recife adivinda dos esforços do ZARC...' />
                    <Card Title='Público' Text='Um dos principais públicos beneficiados serão agricultores e fazendeiros que querem aperfeiçoar suas produtividade agricola.' />
                    <Card Title='Objetivos' Text='Democratizar todo o conhecimento de água disponivel em função da agricultura' />
                    <Card Title='Contéudo' Text='Haverá 5  funcionalidades, o Mapa, Catálogo, PTF, Educacional e Balanço hídrico.' />
                </div>
            </section>
        </>
    )
}

export default Home;