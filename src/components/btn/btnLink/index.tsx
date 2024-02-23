import '../../../App.css'
import { useNavigate } from "react-router-dom";
import type { BtnLinkProps } from '../../../@types/components';


const BtnLink: React.FC<BtnLinkProps> = ({ Title, Path, children }: BtnLinkProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(Path);
    };

    return (
        <button onClick={handleClick} className='flex flex-col items-center'>
            {children}
            <div className="bg-black p-2 hover:scale-125 rounded-md mx-5 cursor-pointer 
        link transition-all duration-300 ease-in-out hover:translate-x-1 hover:translate-y-1">

                <h2 className='text-white max-md:text-xs w-[150px]'>{Title}</h2>
            </div>
        </button>
    );
}

export default BtnLink;
