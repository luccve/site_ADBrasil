import '../../../App.css'
import type { BtnRegularProps } from '../../../@types/components';


const BtnRegular = ({ Title, handleClick, children }: BtnRegularProps) => {


    return (
        <button onClick={handleClick} className="bg-gray p-1 rounded-md cursor-pointer 
        link transition-all duration-300 ease-in-out active:translate-x-1 active:translate-y-1 shadow-md">
            <div className='text-white flex flex-row items-center'>
                <h2 className='text-white max-md:text-xs w-[100px] max-md:w-auto'>{Title}</h2>
                <div className='text-3xl'>
                    {children}
                </div>
            </div>

        </button>
    );
}

export default BtnRegular;
