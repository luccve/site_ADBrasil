interface CardProps {
    Title: string;
    Text: string;
}

const Card = ({ Title, Text }: CardProps) => {
    return (<>
        <div className="m-4  p-4 flex flex-col relative justify-center  items-center bg-blue rounded w-3/6 h-60 max-lg:h-auto max-lg:w-2/3">
            <h1 className=" top-2 left-3 font-bold text-2xl py-2 absolute  text-white">{Title}</h1>
            <p className=" mt-8 ml-2 font-semibold text-left text-lg max-lg:text-sm text-white">{Text}</p>
        </div>
    </>)
}

export default Card;