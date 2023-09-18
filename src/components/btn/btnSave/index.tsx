import { useNavigate } from 'react-router-dom';
import '../../../App.css'

interface btnLinkProps {
    Title: string;
    Path: string;

}

const BtnSave = ({ Title, Path }: btnLinkProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(Path);
    };
    
    return (<>
        <button onClick={handleClick} className="p-4 rounded-md cursor-pointer btn_save"><h1 className='text-white font-bold text-xl w-[150px] hover:scale-110 
        transition-all duration-300 '>{Title}</h1></button>
    </>)
}
export default BtnSave;