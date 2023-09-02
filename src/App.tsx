
import './App.css'
import Ptf from '/ptf.svg'
import Nav from './components/nav'
import Footer from './components/footer'
import Mapa from '/localizacao.svg'
import Catalog from '/catalogo.svg'

function App() {


  return (
    <>
      <Nav />

      <section id="section1 " className='flex
        flex-col
        justify-center
        items-center
        section_right h-screen rounded shadow shadown-blue_l drop-shadow drop-shadow-blue_l
        space-y-16'

      >

        <h1 className="text-white text-5xl font-bold tracking-wide">
          Plataforma ADBrasil
        </h1>

        <p className='text-white w-3/4 text-lg font-semibold'>Oferece informações de água disponivel para análise de solos no Brasil.
          Com recursos de mapeamento de unidades de água no solo, detalhes dos componentes do solo,
          um banco de dados para salvar pontos no mapa, catálogo de disponibilidade de água e 14 funções de pedotransferência.</p>

        <div className='flex flex-col space-x-20 md:flex-row'>
          <img className='h-auto w-28' src={Mapa} alt="Icone do Mapa" />
          <img src={Catalog} className='h-auto w-28' alt="Icone da ferramenta do catalogo" />
          <img className='h-auto w-28 ' src={Ptf} alt="Icone da ferramenta de pedotransferencia" />
        </div>

      </section>

      <section id='section2' className=' grid h-screen content-center bg-white rounded shadow shadow-blue_l'>

        <div className=" text-5xl font-bold tracking-wide">
          <h1 >
            <a className='text-blue'>Aprenda</a> os principais conceitos sobre o tema!
          </h1>
        </div>

        <div className=''>

        </div>
      </section>

      <section id='section3' className='grid h-screen content-center section_left  rounded shadow shadow-blue_l'>
        <div className='grid  content-center'>
          <p className=" text-5xl font-bold tracking-wide" >TESTE</p>
        </div>
      </section>

      <section id='section4' className='grid h-screen content-center section_grass rounded shadow shadow-blue_l'>
        <div className='grid  content-center'>
          <p className="text-white text-5xl font-bold tracking-wide" >TESTE</p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
