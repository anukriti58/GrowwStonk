'use client'
import { useEffect, useState } from 'react';
import Cards from  './Components/Cards/cards';
import Navbar from './Components/Navbar/navbar';
import Styles from './page.module.css';
import Shimmer from './Components/Shimmer/shimmer';
import React from 'react';

export type cardType = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export default function Home() {
    const [data, setData] = useState<Record<any, any>>({});
    const[selectedTab, setSelectedTab] = useState("gainer");
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo',{
      headers:{
        'content-type': 'application/json'
      }
      })
      .then((res) => {
        return res.json();
      })
      .then((res) =>{
        setData(res);
        setLoading(false);
      })
    }, []);
   // if(isLoading) return <Shimmer/>

    const handleTabSelection = (tab: string) =>{
      setSelectedTab(tab);
    }
  return (
    <>
    <main className='bg-[#fff] w-full'>
    <Navbar/>
    <div className="justify-center align-center mb-7 mt-2 w-full">
      
      <div className="font-medium text-center text-black">
          <ul className="flex flex-wrap -mb-px items-center justify-center">
            
              <li className="cursor-pointer" onClick={()=> handleTabSelection('gainer')}>
                  <span className={`${selectedTab=='gainer' ? Styles.tabActive : Styles.tab} inline-block p-3 pb-2 rounded-t-lg mr-6 text-lg`} aria-current="page">Top Gainers</span>
              </li>
              <li className="mr-2 cursor-pointer" onClick={()=> handleTabSelection('loser')}>
                  <span className={`${selectedTab=='loser' ? Styles.tabActive : Styles.tab} inline-block p-3 pb-2 ml-6 rounded-t-lg text-lg`} >Top Losers</span>
              </li>
          </ul>
      </div>
    </div>
    <div className='flex flex-row w-full justify-center align-center flex-wrap'>
    { isLoading ? <div className='flex flex-row flex-wrap justify-between mb-[20px]'><Shimmer /> <Shimmer /> <Shimmer /> <Shimmer /> <Shimmer /> <Shimmer /></div>:
      data[selectedTab=== "gainer"?'top_gainers': 'top_losers']?.map((item: cardType)=>{ 
        return( 
          <React.Fragment key={item.ticker}>
            <Cards {...item}/>
          </React.Fragment>
        )
      })
    }
    </div>
    </main>
    </>
  )
}

// LFDXVYPALRS23ZH4