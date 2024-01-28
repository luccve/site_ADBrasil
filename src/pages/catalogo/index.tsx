import CarrouselRegion from "../../components/carrousel/CarrouselRegion";
import { useEffect, useState } from "react";
import Select from "../../components/input/select";
import dataCatalogo from "../../database/data";
import CardList from "../../components/card/cardList";
import type { perfis, perfisSubOrdem, textura, adProps, ValueMapProps } from "../../@types/data";
import Catalog2 from '../../database/data/catalog2.json'
import SelectText from "../../components/input/selectText"
import Catalogo from '/catalogo_pub-min.jpg'
import ModalAlert from "../../components/modal/modalAlert";



const Catalog = () => {


    const [modal, setModal] = useState(true);

    const searchQuery = (value: number | null | string) => {

        const valueMap: ValueMapProps[] = [];
        if (value) {
            Catalog2.ad.map((item: adProps) => {

                if (item.solo_subordem.toLowerCase().includes(value.toString().toLowerCase())) {
                    valueMap.push({ textura: item.textura, ad: item.mediana });
                }
            })
        }
        if (valueMap.length === 0) {
            console.log("No search results")
            setData2(null);
        }

        setData2(valueMap);


    }

    const getSubOrdem = async () => {
        const subordem: perfis[] = [];

        await Catalog2.ad.map((item: adProps, index: number) => {

            let index2 = index + 1;

            if (subordem.find((item2: perfis) => item2.value === item.solo_subordem) === undefined) {
                subordem.push({ value: item.solo_subordem, mediana: item.mediana, key: index2.toString() });
            }

        })

        setSubOrdem(subordem);
    };

    const arrayRegions = [
        { label: 'Ordem' },
        { label: 'Subordem' },
        { label: 'Textura do perfil' },
        { label: 'Subordem e textura do perfil' },
        { label: 'Catálogo' }

    ];

    const [view, setView] = useState(false);
    const [subordem, setSubOrdem] = useState<null | perfis[]>(null);
    const [data2, setData2] = useState<ValueMapProps[] | null>(null);
    const [region, selectRegion] = useState<number | null | string>(null);
    const [name, selectName] = useState<number | null | string>(null);
    const [value, selectValue] = useState<number | null | string>(null);
    const [data, setData] = useState<perfis[] | perfisSubOrdem[] | textura[] | null>(null);

    const toggleView = () => {
        setView(true);

    }

    useEffect(() => {



        if (region === 0) {

            setData(dataCatalogo.perfis);
        }
        else if (region === 1) {

            setData(dataCatalogo.perfisSubOrdem);
        }
        else if (region === 2) {

            setData(dataCatalogo.textura);
        }
        else if (region === 3) {
            searchQuery(name);

        } else {
            setData(null);
        }




    }, [region, name]);

    useEffect(() => {
        getSubOrdem();
    }, [])

    useEffect(() => {
        setView(false);
    }, [region])


    return (

        <>
            <div className="min-h-screen w-full flex flex-col  text-blue bg-blue_l font-bold text-3xl max-md:h-full">
                <CarrouselRegion Array={arrayRegions} initialPosition={null} onSelect={selectRegion} title="Selecione um filtro: " />

                {region != 3 ? <div className="flex flex-col justify-center items-center">
                    {data && <Select onClick={toggleView} onSelect={selectName} onValue={selectValue} array={data} inputTitle={arrayRegions[Number(region)].label} />}

                    {view && <CardList ArrayRes={[`${value}`]} ArrayTitle={[`AD (mm/cm)`]} />}

                </div> :
                    <div className="flex flex-col justify-center items-center">
                        {subordem &&
                            <SelectText SelectName={selectName} onClick={toggleView} Valores={subordem} />
                        }

                        {view &&
                            <>

                                <div className="flex flex-col text-lg  text-white rounded bg-blue my-2  w-[90%] p-2">
                                    <div className="flex flex-row my-1">
                                        <h1 className="w-[50%] text-start">Textura</h1>
                                        <h1 className="w-[50%] text-end">AD (mm/cm)</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col text-sm  rounded bg-white w-[90%] p-2 shadow">

                                    {data2?.map((item, index: number) => {
                                        return <div key={item.ad + index} className="flex flex-row my-1 py-2">

                                            <h1 className="w-[50%] text-start ">{item.textura}</h1>
                                            <h1 className="w-[50%] text-end">{item.ad}</h1>

                                        </div>
                                    })}
                                </div>
                            </>}

                    </div>}

                {region == 4 && <div className="">
                    <img title="Dê double click para acessar o boletim" className="cursor-pointer" onDoubleClick={() => window.open('https://ainfo.cnptia.embrapa.br/digital/bitstream/item/243230/1/CNPS-BPD-282-2022.pdf', '_blank')} src={Catalogo} alt="Catálogo Boletim" />
                    <ModalAlert onClose={setModal} visible={modal} title="Catálogo" message={"O catálogo estará disponível após carregar a imagem. \n\nPara acessar o boletim técnico click duas vezes na imagem."} />
                </div>}

            </div >
        </>


    );

}

export default Catalog;
