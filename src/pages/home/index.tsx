
import Ptf from '/ptf.svg'
import Mapa from '/localizacao.svg'
import Catalog from '/catalogo.svg'
import BtnLink from '../../components/btn/btnLink'
import Logo from '/agua_logo.svg'
import Balaco from '/BalanceLogo.svg'
import Mockup from '/mockup.png'
import GooglePlay from '/google_play.png'
import Card from '../../components/card'
import BtnSave from '../../components/btn/btnSave'
import { SiGooglescholar, SiSmartthings } from "react-icons/si";



const Home = () => {

    const text_home = [

        {
            title: 'Projeto',
            text: `A plataforma AD Brasil é uma iniciativa da Embrapa Solos para apoiar estudos sobre o manejo, 
        a retenção e o armazenamento de água dos solos do Brasil; e o aperfeiçoamento de métodos (diretos e indiretos) 
        Fpara estimativa da condutividade hidráulica e do teor de água no solo.` },

        {
            title: 'Objetivos',
            text: (
                <div>
                    Ampliar e suprir a demanda de informações sobre a disponibilidade de água e o conhecimento das características físico-hídricas das principais classes de solos brasileiros;<br />
                    <br />
                    1 - Aperfeiçoamento de uso dos métodos integrados de análise de sistemas interpretativos do uso do solo e da água,
                    visando subsidiar políticas públicas de planejamento, manejo e conservação para utilização dos solos brasileiros em base sustentável;<br />
                    <br />
                    2 - Melhorar a estimativa de métodos diretos e indiretos de predição (pedotransferência) de condutividade hidráulica e da retenção de água no solo;<br />
                    <br />
                    3 - Propor protocolos experimentais de análises de estimativas de água no solo;<br />
                    <br />
                    4 - Prover informações para o uso e manejo racional da água no solo;<br />
                    <br />
                    5 - Conhecer o comportamento físico-hídrico de distintas classes de solos brasileiros para contribuir com as inovações para o uso eficiente da água, principalmente quanto à implantação de sistemas de zoneamentos, monitoramento, apoio à decisão e serviços ambientais, diante às incertezas climáticas e à intensificação de estresses bióticos e abióticos previstos para as próximas décadas.
                </div>
            ),
        },


        {
            title: 'Público',
            text: `Usuários da informação do  teor de água  no solo`
        },
        {
            title: 'Contéudo',
            text: (
                <div>
                    <p>
                        A plataforma AD Brasil contempla o aplicativo AD Brasil desenvolvido para dispositivos Android e a interface online WebGis,
                        a qual comunica-se diretamente com o aplicativo e permiti prover os usuários de forma rápida aos dados e informações sobre Avaliação,
                        Predição e Mapeamento de Água Disponível em Solos do Brasil.

                    </p>
                    <br />
                    <p>Baseado no conceito WebGIS, no qual integra um ambiente de Sistemas de Informações Geográficas (SIG), viabiliza o acesso às informações
                        espaciais, juntamente com as informações coletadas em campo, para realização de consultas e análises de informações físico-hídricas dos solos do Brasil.
                    </p>
                </div>)

        },
    ]



    return (
        <>
            <section id="section1" className='
        flex
        flex-col
        justify-center
        items-center
        section_right min-h-screen rounded shadow shadown-blue_l drop-shadow drop-shadow-blue_l
        space-y-5
        py-[52px]
        ' >
                <h1 className="text-white text-xl max-lg:text-3sm font-bold tracking-wide">
                    Plataforma sobre Avaliação, Predição e Mapeamento de Água Disponível em Solos do Brasil.
                </h1>

                <p className='text-blue w-3/4 text-base max-lg:text-sm font-semibold p-5 bg-white rounded'>
                    Diante às dimensões do país e da diversidade produtiva e ambiental das diferentes características hidrodinâmicas dos solos do território nacional,
                    a estratégia da plataforma visa estabelecer um sistema de apoio aos estudos sobre água dos solos do Brasil.
                </p>




                <h1 className="text-white text-xl max-lg:text-lg font-bold tracking-wide">
                    Funcionalidades
                </h1>


                <div className='flex flex-row p-5 w-[150px] h-auto items-center justify-around 
                max-lg:flex-col max-lg:space-x-0 max-lg:space-y-5 max-lg:w-auto font-bold sm:flex-row sm:space-y-0 sm:space-x-0'>


                    <BtnLink Title='Mapa' Path={"/map"} >
                        <img className=' w-28 max-lg:w-16' src={Mapa} alt="Icone do Mapa" />
                    </BtnLink>

                    <BtnLink Title='Catálogo' Path={"/catalogo"} >
                        <img src={Catalog} className='w-28 max-lg:w-16' alt="Icone da ferramenta do catalogo" />

                    </BtnLink>


                    <BtnLink Title='Pedotransferência' Path={"/ptf"} >
                        <img className=' w-28 max-lg:w-16' src={Ptf} alt="Icone da ferramenta de pedotransferencia" />

                    </BtnLink>

                    <BtnLink Title='Educação' Path={"/edu"} >
                        <SiGooglescholar className='text-white w-16 h-28 max-lg:w-16 max-lg:h-28' />

                    </BtnLink>

                    <BtnLink Title='IA' Path={"/balance"} >
                        <SiSmartthings className='text-white w-16 h-28 max-lg:w-16 max-lg:h-28' />

                    </BtnLink>



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


                    <BtnLink Title='Água disponível' Path={"/"} >
                        <img className=' w-28 max-lg:w-16' src={Logo} alt="Icone de água disponivel" />

                    </BtnLink>

                    <BtnLink Title='Pedotransferência' Path={"/ptf"} >
                        <img className=' w-28 max-lg:w-16' src={Ptf} alt="Icone da ferramenta de pedotransferencia" />

                    </BtnLink>



                    <BtnLink Title='AI Soil' Path={"/balance"} >
                        <img src={Balaco} className='w-28 max-lg:w-16' alt="Icone da ferramenta do catalogo" />

                    </BtnLink>


                </div>

                <BtnSave Title='Educacional' Path='/edu' />
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

            <section id='section4' className='flex flex-col justify-center min-h-screen p-2 section_grass rounded shadow shadow-blue_l max-lg:h-full '>
                <div className='grid grid-cols-2 justify-items-center max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 '>
                    {text_home.map((item: { title: string, text: string | JSX.Element }, index: number) =>
                        <Card key={index + Math.random()} Title={item.title} Text={item.text} />

                    )}

                </div>
            </section>
        </>
    )
}

export default Home;