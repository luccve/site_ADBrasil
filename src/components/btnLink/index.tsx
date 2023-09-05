import '../../App.css'

interface btnLinkProps {
    Title: string;

}

const BtnLink = ({ Title }: btnLinkProps) => {
    return (<>
        <button className="bg-blue_l p-2 rounded m-2"><h2>{Title}</h2></button>
    </>)
}
export default BtnLink;