import { ChangeEvent, useState } from "react";
import { DropDown } from "./dropDown";

export const SearchBar = () => {
    const [suggestions, setSuggestions] = useState([]);
  
    const handleSearch = (ev:ChangeEvent<HTMLInputElement>)=>{
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ev.target.value}&apikey=demo`)
      .then((res) =>{
        return res.json();
      })
      .then((res)=>{
        var data = res['bestMatches'] || [];
        setSuggestions(data);
      })
  
    }
    return (
        <div className="relative hidden md:block">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search icon</span>
        
      </div>
      <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white position-relative focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." onChange={handleSearch} />
      <DropDown suggestions={suggestions}/>
      </div>
    )
}