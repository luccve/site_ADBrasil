import React, { useState } from 'react';

interface OpacitySliderProps {
    setOpacity: (opacity: number) => void;
}

const OpacitySliderMap: React.FC<OpacitySliderProps> = ({ setOpacity }) => {
    const [opacity, setLocalOpacity] = useState<number>(1);

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(event.target.value);
        setLocalOpacity(newOpacity);
        setOpacity(newOpacity);
    };

    return (
        <div className="text-sm flex flex-col  w-[120px] max-md:w-[90px]  h-[50px] bg-white  rounded
        border-gray shadow-sm  z-50 max-md:text-[10px] ">

            <h1 className="inline-block">Opacidade: {opacity}</h1>
            <div className="p-2 opacity-80 flex flex-row items-center space-x-2
            ">

                <span>0</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacity}
                    onChange={handleSliderChange}
                    alt="Opacity slider"
                    className=" h-full w-full"
                />
                <span>1</span>
            </div>
        </div>

    );
};

export default OpacitySliderMap;
