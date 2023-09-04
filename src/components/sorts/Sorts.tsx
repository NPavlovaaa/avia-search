import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {activeSortSelector, sortChanged} from "../../app/services/flightSlice";


const Sorts = () => {
    const activeSort = useSelector(activeSortSelector);
    const dispatch = useDispatch();

    return(
        <div>
            <div className="flex p-5 items-center">
                <h3 className="text-base text-gray-400 mr-10">Сортировать по:</h3>
                <div className="flex items-center justify-center">
                    <button className="flex items-center" onClick={() => {dispatch(sortChanged(activeSort === 'upPrice' ? 'downPrice' : 'upPrice'))}}>
                        <p className={`${activeSort === 'upPrice' || activeSort === 'downPrice' ? 'text-orange-400' : ''} mr-1`}>Цене</p>
                        {activeSort === 'upPrice'
                            ? <ArrowUpIcon width={15} color={activeSort === 'upPrice' ? '#d38d29' : '#111111'}/>
                            : <ArrowDownIcon width={15} color={activeSort === 'downPrice' ? '#d38d29' : '#111111'}/>
                        }
                    </button>
                </div>
                <div className="flex items-center justify-center ml-7">
                    <button className="flex items-center" onClick={() => {dispatch(sortChanged(activeSort === 'upDuration' ? 'downDuration' : 'upDuration'))}}>
                        <p className={`${activeSort === 'upDuration' || activeSort === 'downDuration' ? 'text-orange-400' : ''} mr-1`}>Времени в пути</p>
                        {activeSort === 'upDuration'
                            ? <ArrowUpIcon width={15} color={activeSort === 'upDuration' ? '#d38d29' : '#111111'}/>
                            : <ArrowDownIcon width={15} color={activeSort === 'downDuration' ? '#d38d29' : '#111111'}/>
                        }
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Sorts;