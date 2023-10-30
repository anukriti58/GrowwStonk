import { useEffect, useState } from "react";
import chart from "chart.js/auto"
import {CircularLoader} from "../loader/circularLoader"
import ErrorCard from "../ErrorCard/errorCard";

export default function Graph({slug}: {slug: string}){
    const [graphFilter, setGraphFilter] = useState('1D');
    const [isLoading, setIsLoading] = useState(true);
    const [iserror, setIserror] = useState(false);
    const [graph, setGraph] = useState<Record<any, any>>({});
    const url = 'https://www.alphavantage.co/query';

    const parseResponse = (filterVal: string,res:Record<any, any>) => {
        let result = res;
        switch(filterVal){
            case '1D':
                result = res['Time Series (5min)'];
                break;
            case '1M': 
                result =res['Monthly Time Series'];
                break;
            case '3M':
            case '6M':
                result= res['Time Series (Daily)'];
                break;
            default: result = res['Time Series (5min)'];    
        }

        return result;
    }

    const handleOnClick = (filter:string) => {
        setIserror(false);
        setGraphFilter(filter)
    }

    const generateUrl = (filter:string) =>{
        let updatedUrl = new URL(url);
        switch(filter){
            
            case '1D': 
            updatedUrl.searchParams.set('function', 'TIME_SERIES_INTRADAY');
            updatedUrl.searchParams.set('symbol', slug);
            updatedUrl.searchParams.set('interval', '5min');
            updatedUrl.searchParams.set('apikey', 'LFDXVYPALRS23ZH4');
            break;

            case '1M':
        
            updatedUrl.searchParams.set('function', 'TIME_SERIES_MONTHLY');
            updatedUrl.searchParams.set('symbol', slug);
            updatedUrl.searchParams.set('apikey', 'LFDXVYPALRS23ZH4')
            break;

            case '3M':
        
            updatedUrl.searchParams.set('function', 'TIME_SERIES_DAILY');
            updatedUrl.searchParams.set('symbol', slug);
            updatedUrl.searchParams.set('apikey', 'LFDXVYPALRS23ZH4')
            break;

            case '6M':
            updatedUrl.searchParams.set('function', 'TIME_SERIES_DAILY');
            updatedUrl.searchParams.set('symbol', slug);
            updatedUrl.searchParams.set('outputsize', 'full');
            updatedUrl.searchParams.set('apikey', 'LFDXVYPALRS23ZH4')
            break;
            
        }
         return updatedUrl.href;
    }

    useEffect(() =>{
        setIsLoading(true);
        setIserror(false);
        const url = generateUrl(graphFilter);
        fetch(url)
        .then((res) =>{
            return res.json();
        })
        .then((res)=>{
            const result = parseResponse(graphFilter, res);
            if(result) setGraph(result);
            else setIserror(true);
            setIsLoading(false);
        })
        .catch(() =>{
            setIserror(true);
            setIsLoading(false);
        })
    },[graphFilter])
    
    useEffect(()=>{
        try{ 
            setIserror(false);
            const ctx = document.getElementById("id_chart") as HTMLCanvasElement;
            const ctx2D = ctx?.getContext('2d')
            if(ctx)
            {   
                var myChart =  new chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(graph),
                    datasets: [{
                        data: Object.keys(graph).map((item) =>{
                            return graph[item]['4. close']
                        }),
                        label: "Price",
                    }]
                }
            })}
        }
        catch{
            setIserror(true);
        }
        return () =>{
            myChart.destroy();
        }
    },[graph])


    return(
        <div className="relative flex flex-col items-center justify-center w-[52vw] border-2 pl-3 pr-3 pb-3 pt-2 rounded-lg"> 
        {isLoading ? <CircularLoader/> : null}
                    {!isLoading &&iserror? <ErrorCard/> : <canvas id="id_chart"></canvas>}
                    <div className="flex flex-row bg-sky-50 border-2 p-3 mt-2 rounded-3xl">
                        {
                            ['1D', '1M', '3M', '6M'].map((items)=>{
                                return(
                                    <div key={items} className="center relative inline-block select-none whitespace-nowrap rounded-3xl bg-sky-600 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white ml-2 mr-2 cursor-pointer" 
                                    onClick={() =>handleOnClick(items)}>
                                        {items}
                                    </div>
                                )
                            }) 
                        }
                    </div>
                </div>
    )
}