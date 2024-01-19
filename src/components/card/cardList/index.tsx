import React from 'react';
import type { CardListProps } from '../../../@types/components';
import '../../../App.css'


const CardList: React.FC<CardListProps> = ({ ArrayRes, ArrayTitle }) => {

    return <>
        <div className='grid place-items-center' >


            <div className='bg-blue w-full h-auto rounded flex flex-row space-x-3 p-3 justify-center items-center max-md:w-3/4'>
                {ArrayTitle.map((item: string, index: number) => {
                    return <>
                        <h1 key={`title-${index*Math.random()}-${item}`} className='text-white text-sm p-2 w-[120px] max-md:w-[80px] max-md:text-[11px]'>{item}</h1>
                    </>
                })}
            </div>
            <div className='bg-white w-full h-auto rounded flex flex-row space-x-3 p-3 justify-center items-center max-md:w-3/4 relative'>
                {ArrayRes.map((item: string, index: number) => {
                    return <>
                        <h1 key={`res-${index*Math.random()}-${item}`} className='text-blue text-sm p-2 w-[120px] max-md:w-[80px] max-md:text-[11px]'>{item}</h1>
                    </>
                })}

            </div>

        </div>
    </>


}

export default CardList;