import LegLayout from "../leg/Leg";
import {useGetAllFlightsQuery} from "../../app/services/flightApi";
import {Flight} from "../../app/types/flight";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    activeAirlineFilterSelector,
    activeMaxPriceSelector,
    activeSortSelector,
    activeTransferFilterSelector,
    activeAirlineListChanged,
} from "../../app/services/flightSlice";
import Spinner from "../spinner/Spinner";


const FlightLayout = () => {
    const {data, isLoading, isError} = useGetAllFlightsQuery();
    const activeTransfer = useSelector(activeTransferFilterSelector);
    const activeAirline = useSelector(activeAirlineFilterSelector);
    const activeMaxPrice = useSelector(activeMaxPriceSelector);
    const activeSort = useSelector(activeSortSelector);
    const [activeAirlineList, setActiveAirlineList] = useState<Array<string>>();

    const dispatch = useDispatch();
    let containedAirlines: Array<string> = [];

    useEffect(() => {
        setActiveAirlineList(containedAirlines)
        changeActiveAirlineList()
    }, [containedAirlines])

    let sortedFlights: Array<Flight>;

    if(activeSort === 'upPrice'){
        sortedFlights = [...data.flights].sort((a, b) => Number(a.flight.price.total.amount) > Number(b.flight.price.total.amount) ? 1 : -1)
    }else if(activeSort === 'downPrice'){
        sortedFlights = [...data.flights].sort((a, b) => Number(a.flight.price.total.amount) < Number(b.flight.price.total.amount) ? 1 : -1)
    } else if(activeSort === 'upDuration'){
        sortedFlights = [...data.flights].sort((a, b) => (a.flight.legs.reduce((a: any, b: any) => a.duration + b.duration) > b.flight.legs.reduce((a: any, b: any) => a.duration + b.duration)) ? 1 : -1)
    }else if(activeSort === 'downDuration'){
        sortedFlights = [...data.flights].sort((a, b) => (a.flight.legs.reduce((a: any, b: any) => a.duration + b.duration) < b.flight.legs.reduce((a: any, b: any) => a.duration + b.duration)) ? 1 : -1)
    }else{
        sortedFlights = data?.flights;
    }

    const changeActiveAirlineList = () => {
        dispatch(activeAirlineListChanged(activeAirlineList));
    }

    const transferFilteredFlights = useMemo(() => {
        const transferFilteredFlights = sortedFlights?.slice();

        if (activeTransfer === 'allOptionsTransfer'){
            return transferFilteredFlights;
        } else if(activeTransfer === 'transfer') {
            const res = transferFilteredFlights?.filter((flight: Flight) => flight.flight.legs.some(leg => leg.segments.length > 1));
            containedAirlines = Array.from(new Set(res.map((flight: Flight) => flight.flight.carrier.caption)));
            return res
        }else{
            const res = transferFilteredFlights?.filter((flight: Flight) => flight.flight.legs.every(leg => leg.segments.length == 1));
            containedAirlines = Array.from(new Set(res.map((flight: Flight) => flight.flight.carrier.caption)));
            return res
        }
    }, [activeTransfer, sortedFlights]);

    const airlineFilteredFlights = useMemo(() => {
        const airlineFilteredFlights = transferFilteredFlights?.slice();
        if (activeAirline === 'allAirlines'){
            return airlineFilteredFlights;
        }
        else{
            return airlineFilteredFlights?.filter((flight: Flight) => flight.flight.carrier.caption === activeAirline);
        }
    }, [activeAirline, transferFilteredFlights]);

    const priceFilteredFlights = useMemo(() => {
        const priceFilteredFlights = airlineFilteredFlights?.slice();
        if (activeMaxPrice === 0){
            return priceFilteredFlights;
        } else{
            const res = priceFilteredFlights?.filter((flight: Flight) => Number(flight.flight.price.total.amount) <= activeMaxPrice)
            containedAirlines = Array.from(new Set(res?.map((flight: Flight) => flight.flight.carrier.caption)));
            return res
        }
    }, [activeMaxPrice, airlineFilteredFlights]);

    if (isLoading) {
        return <Spinner/>
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return(
        <div>
            {priceFilteredFlights?.length > 0 ? priceFilteredFlights?.map((flight: Flight) => {
                return(
                    <div key={flight.flightToken} className="grid grid-cols-5 bg-white rounded-xl mb-6">
                        <div className="grid col-span-2 items-center justify-center border-r border-gray-200">
                            <div className="flex flex-col items-center justify-center">
                                <p className="font-semibold text-2xl text-gray-700">{flight.flight.price.total.amount} {flight.flight.price.total.currency}</p>
                                <button className="rounded-lg bg-orange-400 mt-5 py-2 px-10 text-white text-lg">Выбрать</button>

                            </div>
                        </div>
                        <div className="grid col-span-3">
                            <LegLayout legs={flight.flight.legs}/>
                        </div>
                    </div>
                )
            })
            :
                <div className="h-full text-xl">Рейсы не найдены :(</div>
            }
        </div>
    )

}
export default FlightLayout;