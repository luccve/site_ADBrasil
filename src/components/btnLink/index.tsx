import '../../App.css'

interface btnLinkProps {
    Title: string;

}

const BtnLink = ({ Title }: btnLinkProps) => {
    return (<>
        <button className="bg-black p-2 rounded-md m-2 cursor-pointer link "><h2 className='text-white max-md:text-xs'>{Title}</h2></button>
    </>)
}
export default BtnLink;