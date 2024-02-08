import React, { useState } from 'react';
import { VictoryChart, VictoryLine, VictoryContainer, VictoryScatter } from 'victory';

const TriangleTexture: React.FC = () => {
    const [clickedPoint, setClickedPoint] = useState({ x: 0, y: 0 });

    const handleChartClick = (evt: any) => {
        const { clientX, clientY } = evt;
        const svgWidth = 400;
        const svgHeight = 400;
    
        // Converter as coordenadas do clique para o espaço do gráfico
        const x = Math.abs(319.25-(clientX / svgWidth)*100);
        const y = Math.abs(200 -(clientY / svgHeight)*100);
    
        setClickedPoint({ x, y });
      };

    const triangleData = [
        { x: 50, y: 100 },
        { x: 100, y: 0 },
        { x: 0, y: 0 },
        { x: 50, y: 100 }
    ];

    return (
        <div>
            <h2>Coordenadas Clicadas: ({clickedPoint.x.toFixed(2)}, {clickedPoint.y.toFixed(2)})</h2>
            <VictoryChart
                width={400}
                height={400}
                domain={{ x: [0, 100], y: [0, 100] }}
                containerComponent={
                    <VictoryContainer
                        responsive={false}
                        events={{
                            onClick: handleChartClick
                        }}
                    />
                }
            >
                <VictoryLine
                    data={triangleData}
                    style={{
                        data: { stroke: 'white', strokeWidth: 2, fill: '#000000' }
                    }}
                />
                {clickedPoint.x !== 0 && clickedPoint.y !== 0 && (
                    <VictoryScatter
                        data={[{ x: clickedPoint.x, y: clickedPoint.y }]}
                        style={{ data: { fill: 'red', zIndex: 450 } }}
                    />
                )}
            </VictoryChart>
        </div>
    );
};

export default TriangleTexture;
