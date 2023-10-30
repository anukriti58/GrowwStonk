import Link from "next/link"

export const DropDown = ({suggestions=[]}) => {
    return (
        <div id="dropdown-search-city " className={`z-10 ${suggestions.length ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-full text-black absolute top-[45px]`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2" >
          {suggestions.map((items)=>{
            return (
              <Link key={items['1. symbol']} href={`/overview/${items['1. symbol']}`}>
              <li>
                <button type="button" className="inline-flex w-[150px] px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 text-ellipsis overflow-ellipsis whitespace-nowrap overflow-hidden" role="menuitem">
                    <div className="inline-flex items-center text-left">          
                        {items['2. name']}({items['1. symbol']})
                    </div>
                </button>
            </li>
              </Link>
            )
          })}
        </ul>
    </div>
    )
}