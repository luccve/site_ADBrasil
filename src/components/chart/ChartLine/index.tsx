import React, { useState } from 'react';
import '../../../App.css'
import { VictoryScatter, VictoryLine, VictoryAxis, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';
import PTF from '../../../ptfFunctions';
import { CharLineProps } from '../../../@types/components';
import theme from '../../../themes/colors';

const ChartLine: React.FC<CharLineProps<number>> = ({ alpha, n, theta_r, theta_s }: CharLineProps<number>) => {

    const [data, setSelectedData] = useState<number|null>(null);

    return <>
        <div className='h-[400px] max-[869px]:h-[300px] w-full relative m-3 bg-white rounded-md' id={alpha.toString()}>

            <VictoryChart

                theme={VictoryTheme.material}

            >
                <VictoryLabel
                    y={30}
                    x={40}
                    text={'Curva de retenção de água no solo'}
                    style={{ fill: theme.colors.blue }}
                />

                <VictoryLabel
                    y={340}
                    x={80}
                    style={{ fill: theme.colors.blue }}
                    text={'Umidade do solo (m⁻³.m⁻³)'} />


                <VictoryAxis
                    dependentAxis

                    animate={{
                        duration: 2000,
                        easing: "bounce"
                    }}


                />
                <VictoryAxis


                    tickFormat={(_, i) => {
                        // console.log(x);
                        if (i === 1) {
                            return "6";
                        } else if (i === 2) {
                            return "10";
                        } else if (i === 3) {
                            return "33";
                        } else if (i === 4) {
                            return "100"
                        } else if (i === 5) {
                            return "500"
                        } else if (i === 6) {
                            return "1000"
                        } else if (i === 11) {
                            return "1500";
                        }
                    }}



                />

                <VictoryLine
                    interpolation={"basis"}

                    data={PTF.van_genuchtenList(alpha, n, theta_r, theta_s).list}
                    x="index"
                    y="theta"
                />


                <VictoryScatter
                    size={9}
                    style={{ data: { stroke: theme.colors.blue } }}
                    data={PTF.van_genuchtenList(alpha, n, theta_r, theta_s).list}
                    x="index"
                    y="theta"

                    events={[
                        {
                            target: "data",
                            eventHandlers: {
                                onClick: () => {
                                    return [
                                        {
                                            target: "data",
                                            mutation: (props) => {
                                                const { datum } = props;
                                                
                                                setSelectedData(datum.theta.toFixed(3));
                                            },
                                        },
                                    ];
                                },

                            },
                        },
                    ]}
                />

            </VictoryChart>

             {data&&<h1 className='bg-white text-sm absolute block rounded-md p-2 top-[30%] left-[50%] text-black max-md:text-[11px]'>{data} (m⁻³.m⁻³)</h1>}
        </div>
    </>;
}

export default ChartLine;