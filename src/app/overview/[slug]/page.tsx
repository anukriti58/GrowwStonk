'use client'
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/navbar";
import Graph from "@/app/Components/Graph/graph";
import {CircularLoader} from "../../Components/loader/circularLoader";

export default function Product({params}:{params: {slug: string}}) {
    const [data, setData] = useState<Record<any, any>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        setIsLoading(true);
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${params.slug}&apikey=LFDXVYPALRS23ZH4`)
        .then((res) =>{
            return res.json();
        })
        .then((res) =>{
            setData(res);
            setIsLoading(false);
        })
    },[params.slug])

    return (
        <main className="bg-white w-full">
            <Navbar />
            <div className="flex flex-col items-center justify-center">

                <div className="pt-1 pb-5 pl-9 pr-3 text-blue-700 mt-3 flex-col justify-center items-center">
                    <h1 className="mt-5 text-3xl text-center"> {data['Name']} {data['Symbol']? (data['symbol']): ''}</h1>
                    <h1 className="mt-1 text-sm text-center"> {data['Industry']} </h1>
                </div>
                <Graph slug={params.slug}/>
                <div className="relative w-[52vw] flex flex-col items-center justify-center border-2 rounded-lg pl-5 pr-5 pb-3 mt-2 pt-2 mb-5">
                {isLoading ? <CircularLoader/> : null}
                    <p className="text-stone-950 text-lg pt-1 mb-1 font-medium border-b-2" >Know about us</p>
                    <div className="flex text-stone-950 pt-1 mb-1">
                        <p>Beta: {data['Beta']}&emsp; | &emsp; </p>
                        <p>PERatio: {data['PERatio']} &emsp; | &emsp;</p>
                        <p>Profit Margin: {data['ProfitMargin']}</p>
                    </div>
                    <p className="text-stone-950 pt-1 pb-1">
                        {data['Description']}
                    </p>
                </div>
            </div>
        </main>
    )
}