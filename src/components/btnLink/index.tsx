import '../../App.css'
import { useNavigate } from "react-router-dom";

interface BtnLinkProps {
    Title: string;
    Path: string;
}

const BtnLink = ({ Title, Path }: BtnLinkProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(Path);
    };

    return (
        <button onClick={handleClick} className="bg-black p-2 rounded-md m-2 cursor-pointer link">
            <h2 className='text-white max-md:text-xs'>{Title}</h2>
        </button>
    );
}

export default BtnLink;
