import React, { useState } from 'react';
import BtnToggleArrow from '../btn/BtnToggleArrow';
import '../../App.css'
import { ResultadoPTFProps } from '../../@types/components';

import ChartLine from '../chart/ChartLine';
import CardList from '../card/cardList';
import PTF from '../../ptfFunctions';

const ResultadoPTF: React.FC<ResultadoPTFProps> = ({ ptf, author, cc, unidade, parametros, url, curva }) => {

    const [pin, setPin] = useState(true);

    const handleExport = () => {
        const data = PTF.van_genuchtenList(ptf[0], ptf[1], ptf[2], ptf[3]).curva;
        const csvContent = "potencial,theta\n" + data.map(item => `${item.potencial},${item.theta}`).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'curva.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
    }

    const togglePin = () => {
        setPin(!pin);
    }

    if (ptf instanceof Array) {
        if (ptf.length > 3) {

            return (
                <>

                    <div className='relative bg-blue rounded-xl my-3 pb-5 flex flex-col w-[80%] justify-center items-center shadow-md'>


                        <CardList ArrayTitle={['Autor (es)', 'Tipo']} ArrayRes={[author, curva]} />
                        <a className='text-sm text-white py-5 hover:scale-105' href={url} rel="noreferrer noopener" target='_blank'>Acesse o trabalho referência do autor</a>

                        {pin &&
                            <div className='rounded flex flex-col space-x-3 p-3 pt-5 justify-center items-center max-md:w-3/4
                                animate-stagger-menu'>

                                <CardList ArrayTitle={['Parâmetros de Entrada', 'Unidade']}
                                    ArrayRes={[parametros, unidade]} />

                                <h1 className='text-sm text-white py-5'>Parâmetros de Saída</h1>
                                <CardList ArrayRes={[ptf[0].toPrecision(3), ptf[1].toPrecision(3), ptf[2].toPrecision(3), ptf[3].toPrecision(3)]}
                                    ArrayTitle={["alpha (kPa⁻¹)", "n", "theta_r (m³/m³)", "theta_s (m³/m³)"]} />


                                <ChartLine alpha={ptf[0]} n={ptf[1]} theta_r={ptf[2]} theta_s={ptf[3]} />
                                <button onClick={handleExport} className='text-white text-sm flex flex-row hover:scale-105'>
                                    <span>Exportar Curva</span>
                                </button>
                            </div>}

                        <BtnToggleArrow pin={pin} togglePin={togglePin} />


                    </div>


                </>
            )
        }
        else if (ptf.length === 3) {
            return <div className='relative bg-blue rounded-xl my-3 pb-5 flex flex-col w-[80%] justify-center items-center shadow-md'>


                <CardList ArrayTitle={['Autor', 'AD (mm/cm)', 'Tipo']} ArrayRes={[author, ((Number(ptf[0]) - Number(ptf[2])) * 10).toFixed(3), curva]} />
                <a rel="noreferrer noopener" className='text-sm text-white py-5 hover:scale-105' href={url} target='_blank'>Acesse o trabalho referência do autor</a>

                {pin &&
                    <div className='rounded flex flex-col space-x-3 p-3 pt-5 justify-center items-center max-md:w-3/4
                                animate-stagger-menu'>

                        <CardList ArrayTitle={['Parâmetros', 'Unidade']}
                            ArrayRes={[parametros, unidade]} />


                        {cc && <CardList ArrayRes={[ptf[0].toPrecision(3), ptf[1].toPrecision(3), ptf[2].toPrecision(3)]}
                            ArrayTitle={[`CC ${cc}`, 'CC 33', 'PMP']} />}


                    </div>}

                <BtnToggleArrow pin={pin} togglePin={togglePin} />

            </div>
        }
        else {
            return <div className='relative bg-blue rounded-xl my-3 pb-5 flex flex-col w-[80%] justify-center items-center shadow-md'>


                <CardList ArrayTitle={['Autor', 'AD (mm/cm)', 'Tipo']} ArrayRes={[author, ((Number(ptf[0]) - Number(ptf[1])) * 10).toFixed(3), curva]} />
                <a rel="noreferrer noopener" className='text-sm text-white py-5 hover:scale-105' href={url} target='_blank'>Acesse o trabalho referência do autor</a>

                {pin &&
                    <div className='rounded flex flex-col space-x-3 p-3 pt-5 justify-center items-center max-md:w-3/4
                                animate-stagger-menu'>

                        <CardList ArrayTitle={['Parâmetros', 'Unidade']}
                            ArrayRes={[parametros, unidade]} />


                        {cc && <CardList ArrayRes={[ptf[0].toPrecision(3), ptf[1].toPrecision(3)]}
                            ArrayTitle={[`CC ${cc}`, 'PMP']} />
                        }


                    </div>}

                <BtnToggleArrow pin={pin} togglePin={togglePin} />

            </div>
        }

    }
    else {
        return <div className='relative bg-blue rounded-xl my-3 pb-5 flex flex-col w-[80%] justify-center items-center shadow-md'>


            <CardList ArrayTitle={['Autor', 'AD (mm/cm)', 'Tipo']} ArrayRes={[author, Number(ptf).toFixed(3), curva]} />
            <a rel="noreferrer noopener" className='text-sm text-white py-5 hover:scale-105' href={url} target='_blank'>Acesse o trabalho referência do autor</a>

            {pin &&
                <div className='rounded flex flex-col space-x-3 p-3 pt-5 justify-center items-center max-md:w-3/4
                                animate-stagger-menu'>

                    <CardList ArrayTitle={['Parâmetros']}
                        ArrayRes={[parametros]} />


                </div>}

            <BtnToggleArrow pin={pin} togglePin={togglePin} />

        </div>
    }
}

export default ResultadoPTF;