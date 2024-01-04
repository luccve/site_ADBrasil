import { useEffect, useState } from 'react';
import { BiSolidFoodMenu } from "react-icons/bi";
import { MdMenuBook } from "react-icons/md";

const GetLegendsMaps = () => {

    useEffect(() => { }, [])

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [icon, setIcon] = useState(false);
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

    const colorRanges = [
        { min: 1.84, max: null, color: "#8500A8", text: "faixa do valor máximo" },
        { min: 1.4, max: 1.84, color: "#005CE6", text: "a menor que" },
        { min: 1.06, max: 1.4, color: "#00C4FF", text: "a menor que" },
        { min: 0.8, max: 1.06, color: "#37A800", text: "a menor que" },
        { min: 0.61, max: 0.8, color: "#4DE600", text: "a menor que" },
        { min: 0.46, max: 0.61, color: "#FFAB00", text: "a menor que" },
        { min: 0.34, max: 0.46, color: "#FFFF73", text: "a menor que" },
        { min: 0, max: 0.34, color: "#9C9C9C", text: "a menor que" },
    ];

    const handleMouseDown = (e: any) => {
        // e.stopPropagation();
        // e.preventDefault();
        setDragging(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: any) => {
        // e.stopPropagation();
        // e.preventDefault();

        if (dragging) {
            const deltaX = e.clientX - startPosition.x;
            const deltaY = e.clientY - startPosition.y;
            setPosition(() => ({ x: deltaX, y: deltaY }));

            setStartPosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleChangeIcon = () => {
        setIcon(!icon)
    }


    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);



        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);


    return <div className='flex justify-around p-5 flex-col absolute top-1/5 right-4 bg-white max-w-[300px] max-h-[350px] rounded-md shadow border border-gray'
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, cursor: dragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}>

        <button onClick={handleChangeIcon} className='absolute hover:scale-110 top-0 right-0 p-2'>
            {icon ? <MdMenuBook className={'text-blue text-[22px]'} /> : <BiSolidFoodMenu className={'text-blue text-[22px]'} />}
        </button>

        <div className='leading-tight text-blue' style={{ display: icon ? 'none' : 'initial' }}>
            <h1 className='font-bold text-lg max-md:text-md'>Legenda</h1>
            <h3 className='text-md max-md:text-sm'>Água disponível no solo</h3>
            <h5 className='text-md max-md:text-sm'>(mm/cm)</h5>

        </div>

        <div className='self-center flex flex-col justify-between h-auto text-sm space-y-2' style={{ display: icon ? 'none' : 'initial' }}>
            {colorRanges.map((item, index) => {
                return <div key={`${index}-${item.min + item.color}`} className='flex flex-row justify-between items-center space-x-2 '>
                    <span style={{ background: item.color, width: "25px", height: "25px" }} />
                    <span>{item.min}</span>
                    <h5> {item.text}</h5 >
                    <span>{item.max}</span>

                </div >

            })}
        </div>



    </div >;
}

export default GetLegendsMaps;