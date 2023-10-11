import { useEffect, useRef, useState } from "react";
import type { CardProps } from "../../@types/data";

const Card = ({ Title, Text }: CardProps) => {

    let cardRef = useRef<HTMLDivElement>(null);

    const listAnimated = ["animate-home", "animate-home1", "animate-home2"]

    const [isVisible, setIsVisible] = useState(false);
    const [animated, setAnimated] = useState('');
    const RandomChoices = () => {

        setAnimated(listAnimated[Math.floor(Math.random() * 2)]);
    }

    useEffect(() => {
        const checkVisibility = () => {
            if (cardRef.current) {
                const rect = cardRef.current.getBoundingClientRect();

                setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);

            }
        };

        window.addEventListener('scroll', checkVisibility);
        RandomChoices();
        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, []);

    return (<>
        {<div ref={cardRef} className={`m-4 p-4 flex flex-col relative justify-center items-center bg-blue rounded w-3/6 h-auto max-lg:h-auto max-lg:w-2/3 max-md:w-42  ${isVisible ? animated : ""}`}>
            <h1 className=" top-2 left-3 font-bold text-xl py-2 absolute  text-white max-md:text-lg">{Title}</h1>
            <p className=" mt-8 ml-2 font-semibold text-left text-sm max-lg:text-xs text-white">{Text}</p>
        </div >}
    </>)
}

export default Card;