import {ReactNode} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    activeTransferFilterChanged,
    activeAirlineFilterChanged,
    activeTransferFilterSelector,
    airlineFilters,
    activeAirlineFilterSelector,
    priceFilterChanged,
    activeMaxPriceSelector,
    activeAirlineListSelector
} from "../../app/services/flightSlice";


const Filters = () => {
    const activeTransfer = useSelector(activeTransferFilterSelector);
    const activeAirline = useSelector(activeAirlineFilterSelector);
    const listAirline = useSelector(airlineFilters);
    const activeMaxPrice = useSelector(activeMaxPriceSelector);
    const activeAirlineList = useSelector(activeAirlineListSelector);

    const dispatch = useDispatch();

    return(
        <div className="p-5">
            <h2 className="text-lg font-semibold mb-3">Фильтры</h2>
            <div className="flex flex-col text-sm justify-center items-start">
                <h3 className="text-base font-semibold mb-3">Пересадки</h3>
                <button
                    className={`${activeTransfer === 'direct' ? 'text-orange-400' : ''} mb-2 outline-0`}
                    onClick={() => dispatch(activeTransferFilterChanged('direct'))}
                >
                    Без пересадок
                </button>
                <button
                    className={`${activeTransfer === 'transfer' ? 'text-orange-400' : ''} outline-0`}
                    onClick={() => dispatch(activeTransferFilterChanged('transfer'))}
                >
                    1 пересадка
                </button>
            </div>
            <div className="flex flex-col justify-center items-start mt-6">
                <h3 className="text-base font-semibold mb-3">Авиакомпании</h3>
                {listAirline.length === 0 ? <div>Загрузка...</div> : listAirline.map((airline: string): ReactNode => {
                    return activeAirlineList?.length > 0 && !activeAirlineList?.includes(airline) ?
                        <button
                            className={`${activeAirline === airline ? 'text-orange-400' : ''} mb-2 lg:text-sm disabled:text-gray-400 outline-0 md:text-xs`}
                            onClick={() => dispatch(activeAirlineFilterChanged(airline))}
                            disabled
                        >
                            {airline}
                        </button>
                        :
                        <button
                            className={`${activeAirline === airline ? 'text-orange-400' : ''} mb-2 lg:text-sm outline-0 md:text-xs`}
                            onClick={() => dispatch(activeAirlineFilterChanged(airline))}
                        >
                            {airline}
                        </button>
                })}
            </div>
            <div className="flex flex-col justify-center items-start mt-6">
                <h3 className="text-base font-semibold mb-3">Стоимость</h3>
                <div>
                    <label htmlFor="range" className="text-sm bg-blue-500 rounded-xl px-2.5 py-1 text-white items-start">до {activeMaxPrice}</label>
                    <input type="range" name="price" min="1" max="300000" value={activeMaxPrice}
                           onChange={(e) => dispatch(priceFilterChanged(e.target.value))}
                           className="w-full h-1 bg-blue-300 appearance-none outline-0"/>
                </div>
            </div>
        </div>

    )
}
export default Filters;