import {ClockIcon} from "@heroicons/react/24/outline";
import {Leg} from "../../app/types/leg";
import React from "react";
import moment from "moment";


type LegProps = {
    legs: Array<Leg>,
}

const LegLayout = ({legs}: LegProps) => {
    const renderLeg = legs.map(leg => {
        let segments: Array<any> = leg.segments;
        const dateDeparture = segments[0].departureDate
        const departureCity = segments[0].departureCity?.caption
        const departureAirport = segments[0].departureAirport?.uid
        let transferAirport = '';

        let dateArrival;
        let arrivalCity;
        let arrivalAirport;

        if(segments.length > 1){
            dateArrival = segments[segments.length - 1].arrivalDate
            arrivalCity = segments[segments.length - 1].arrivalCity?.caption
            arrivalAirport = segments[segments.length - 1].arrivalAirport?.uid
            transferAirport = segments[0].arrivalAirport.uid
        }else{
            dateArrival = segments[0].arrivalDate
            arrivalCity = segments[0].arrivalCity?.caption
            arrivalAirport = segments[0].arrivalAirport?.uid
        }

        function getTimeFromMins(mins: number) {
            let hours = Math.trunc(mins/60);
            let minutes = mins % 60;
            return hours + ':' + minutes;
        }

        return(
            <div className="">
                <div className="flex px-10 py-5 items-center justify-between text-base">
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-2xl font-semibold text-gray-900">{moment(dateDeparture).format("HH:mm")}</p>
                        <p className="text-sm text-gray-500">{departureCity}</p>
                        <p className="text-sm text-gray-500">{moment(dateDeparture).format("DD MMM")}</p>
                    </div>
                    <div className="flex flex-col w-full items-center justify-center">
                        <div className="flex flex-col items-center border-b border-gray-400 pb-6 w-1/2">
                            <div className="flex">
                                <ClockIcon width={16} color='#333333'/>
                                <p className="ml-1 text-sm text-gray-500">В пути: {getTimeFromMins(leg.duration)}</p>
                            </div>
                        </div>
                        <div className="flex justify-between w-1/2 mt-1">
                            <p className="text-sm text-gray-700 font-medium">{departureAirport}</p>
                            <p className="text-sm text-gray-500">{transferAirport}</p>
                            <p className="text-sm text-gray-700 font-medium">{arrivalAirport}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-2xl font-semibold text-gray-900">{moment(dateArrival).format("HH:mm")}</p>
                        <p className="text-sm text-gray-500">{arrivalCity}</p>
                        <p className="text-sm text-gray-500">{moment(dateArrival).format("DD MMM")}</p>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <>
            {renderLeg}
        </>
    )

}

export default LegLayout;