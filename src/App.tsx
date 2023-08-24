
import './App.css'
import Map from './pages/map'
import Logo from '../public/icon.svg'

function App() {


  return (
    <>
      <div className='grid'>
        <img className='justify-self-center' src={Logo} alt="ADBrasil" />
        <h1 className="text-blue m-12 font-bold tracking-wide">
          Site demonstração ADBrasil
        </h1>
        <Map width='auto' height='50vh' />
      </div>

    </>
  )
}

export default App
