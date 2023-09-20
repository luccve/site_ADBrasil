interface CardProps {
    Title: string;
    Text: string;
}

const Card = ({ Title, Text }: CardProps) => {
    return (<>
        <div className="m-4 p-4 flex flex-col relative justify-center items-center bg-blue rounded w-3/6 
            h-auto max-lg:h-auto max-lg:w-2/3 max-md:w-42">
            <h1 className=" top-2 left-3 font-bold text-2xl py-2 absolute  text-white max-md:text-lg">{Title}</h1>
            <p className=" mt-8 ml-2 font-semibold text-left text-lg max-lg:text-xs text-white">{Text}</p>
        </div>
    </>)
}

export default Card;