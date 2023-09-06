import '../../App.css'

interface btnLinkProps {
    Title: string;

}

const BtnSave = ({ Title }: btnLinkProps) => {
    return (<>
        <button className="p-4 rounded-md cursor-pointer btn_save"><h1 className='text-white font-bold text-xl '>{Title}</h1></button>
    </>)
}
export default BtnSave;