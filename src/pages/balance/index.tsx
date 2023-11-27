import { useEffect } from "react";
import BalanceLogo from "/BalanceLogo.svg";

const Balance = () => {

    const raw = JSON.stringify({ "sand": 30, "clay": 40, "silt": 30, "density": 1.5, "org_mat": 0.02, "porosity": 0.15 });

    useEffect((

    ) => { fetch_ptf() }, []);

    const fetch_ptf = async () => {
        const dados = await fetch("https://api-ptf.onrender.com/ptf", {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: raw, redirect: 'follow'
        })
        console.log(dados.json());
    }

    return (

        <>
            <div className="h-screen bg-blue flex items-center justify-center text-white text-2xl font-bold">
                <img src={BalanceLogo} alt="Icone de Balanço Hídrico" />
                <h1>AI Soil</h1>
            </div>
        </>


    );

}

export default Balance;
