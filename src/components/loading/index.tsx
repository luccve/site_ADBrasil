
import '../../App.css'

const LoadingPage = () => {



    return (

        <>
            <div className='flex text-center z-50'>
                <button className='flex flex-col items-center justify-center text-blue font-bold' type="button" disabled>
                    <span className="animate-spin h-5 w-5 mr-3 ...">
                        ---
                    </span>
                    Carregando...
                </button>
            </div>
        </>

    );

}

export default LoadingPage;
