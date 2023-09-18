import React from 'react';
import { HiOutlineArrowCircleDown, HiOutlineArrowCircleUp } from 'react-icons/hi'
import '../../../App.css'
import type { BtnToggleArrowProps } from '../../../@types/components';

const BtnToggleArrow: React.FC<BtnToggleArrowProps> = ({pin, togglePin}) => {
    return <>
        <button onClick={togglePin} className='absolute text-3xl rounded-full bg-white p-1 max-md:text-2xl 
                        bottom-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 hover:scale-125'>
            {pin ? <HiOutlineArrowCircleUp /> : <HiOutlineArrowCircleDown />
            }
        </button>
    </>;
}

export default BtnToggleArrow;