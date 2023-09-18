import { useState } from "react";
import CarrouselRegion from "../../components/carrousel/CarrouselRegion";
import CarrouselTabs from "../../components/carrousel/CarrouselTabs";
import FormPTf from "../../components/formPTF";

const Ptf = () => {

    const Array = [
        { type: 'Areia + Silte + Argila - ASA', name: "SIM", tab: 0 },
        { type: 'ASA + Densidade - ASAD', name: "ITM", tab: 1 },
        { type: 'ASAD + Complementos', name: "AVC", tab: 2 },
    ]

    const arrayRegions = [
        { label: 'Nacional' },
        { label: 'Norte' },
        { label: 'Nordeste' },
        { label: 'Centro Oeste' },
        { label: 'Sudeste' },
        { label: 'Sul' },
    ];

    const [region, selectRegion] = useState<number | null | string>(null);
    const [tabs, selectTabs] = useState<number | null | string>(0);
    const [type, setType] = useState('SIM');

    const handleTabSelect = (index: number) => {
        selectTabs(index);
        setType(Array[index].name);
    }

    return (

        <>
            <div className="min-h-screen w-full flex flex-col  text-blue bg-blue_l font-bold text-3xl max-md:h-full">


                <CarrouselRegion onSelect={selectRegion} title={"Escolha a área de abrangência da função (PTF):"} initialPosition={null} Array={arrayRegions} />



                <CarrouselTabs Array={Array} onSelect={handleTabSelect} />


                <FormPTf tab={tabs} region={region} type={type} />


            </div>
        </>


    );

}

export default Ptf;
