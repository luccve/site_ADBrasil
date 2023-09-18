import '../../../App.css'
import type { CarrouselTabs, ListaTabsProps } from '../../../@types/components';
import { useState } from 'react';

const CarrouselTabs = ({ Array, onSelect }: CarrouselTabs) => {

    const [selectIndexArray, setSelectIndexArray] = useState(0);

    const handleSelectIndex = (index: number) => {
        setSelectIndexArray(index);
        onSelect(index);
    }

    return <>
        <div className="bg-blue p-4  max-md:space-y-8 ">
            <div>
                {Array.map((item: ListaTabsProps, index: number) => (
                    <button className="" key={index} onClick={() => handleSelectIndex(index)} >
                        {<div style={{ backgroundColor: selectIndexArray === index ? '#fff' : "#6E867D" }} className="flex flex-row  max-md:space-x-0  bg-gray rounded-md px-2 mx-2 h-[55px] my-2 max-md:h-auto items-center hover:bg-blue">
                            <h1 style={{ color: selectIndexArray === index ? "#006666" : "#fff" }} className=" text-lg font-bold px-2 text-white  hover:text-white">{item.type}</h1>
                        </div>}
                    </button>
                ))}
            </div>
        </div>
    </>;
}

export default CarrouselTabs;