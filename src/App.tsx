
import './App.css'
import Map from './pages/map'
import Logo from '/icon.svg'

function App() {


  return (
    <>
      <div className='grid'>
        <img className='justify-self-center' src={Logo} alt="ADBrasil" />
        <h1 className="text-blue m-12 text-4xl font-bold tracking-wide">
          Site demonstração ADBrasil
        </h1>
        <div className='flex flex-row'>

          <div className='m-12'>

            <Map width='30vw' height='70vh' />
          </div>
          <div className='grid m-12 content-center'>

            <p>A plataforma ADBrasil também disponível em mobile, oferece informações de água disponivel para análise de solos no Brasil. Com recursos de mapeamento de unidades de água no solo, detalhes dos componentes do solo, um banco de dados para salvar pontos no mapa, catálogo de disponibilidade de água e 14 funções de pedotransferência</p>
          </div>



        </div>
      </div>

    </>
  )
}

export default App
