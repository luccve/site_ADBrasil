
import '../../App.css'

const LoadingPage = () => {


    return (

        <>
            <div className='h-screen w-full flex items-center justify-center bg-blue_l absolute top-0 left-0 z-50'>
                <button className='flex flex-col items-center justify-center text-blue font-bold' type="button" disabled>
                    <svg className="animate-spin h-5 w-12" viewBox="0 0 24 24">
                        <circle className="opacity-50" cx="12" cy="12" r="12" stroke="currentColor" strokeWidth="12"></circle>
                    </svg>
                    Carregando...
                </button>
            </div>
        </>

    );

}

export default LoadingPage;
