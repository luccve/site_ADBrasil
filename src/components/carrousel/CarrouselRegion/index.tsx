import { useState } from "react";
import '../../../App.css'
import type { CarrouselRegionProps, ListaRegionsProps } from "../../../@types/components";


const CarrouselRegion = ({ Array, onSelect, title, initialPosition }: CarrouselRegionProps) => {

    const [selectedItemIndex, setSelectedItemIndex] = useState(initialPosition);

    const handleItemPress = (index: number) => {
        console.log(index);
        setSelectedItemIndex(index);
        onSelect(index);
    };

    return (
        <div className="bg-blue p-4 border-b-2 border-b-white">
            {title && <h1 className="block text-lg font-bold  text-white">{title}</h1>}
            <div>
                {Array.map((item: ListaRegionsProps, index: number) => (
                    <button className="" key={index} onClick={() => handleItemPress(index)} >
                        {<div style={{ backgroundColor: selectedItemIndex === index ? '#fff' : "#6E867D" }} className="flex flex-row items-center mt-2 bg-gray rounded-md px-2 mx-2 hover:bg-blue h-[40px] max-md:h-auto">
                            <h1 style={{ color: selectedItemIndex === index ? "#006666" : "#fff" }} className="text-lg font-bold px-2 text-white  hover:text-white">{item.label}</h1>
                        </div>}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CarrouselRegion;
