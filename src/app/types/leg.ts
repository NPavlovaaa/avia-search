import {Info} from "./detail";

export type Leg = {
    "duration" : number,
    "segments" :
        [
            {
                "classOfServiceCode" : string,
                "classOfService" : Info,
                "departureAirport" : Info,
                "departureCity" : Info,
                "aircraft" : Info,
                "travelDuration" : number,
                "arrivalCity" : Info,
                "arrivalDate" : string,
                "flightNumber" : string,
                "techStopInfos" : [],
                "departureDate" : string,
                "stops" : number,
                "servicesDetails" :
                    {
                        "freeCabinLuggage" : {},
                        "paidCabinLuggage" : {},
                        "tariffName" : string,
                        "fareBasis" :
                            {
                                "ADULT" : string
                            },
                        "freeLuggage" :
                            {
                                "ADULT" :
                                    {
                                        "pieces" : number,
                                        "nil" : boolean,
                                        "unit" : string
                                    }
                            },
                        "paidLuggage" : {}
                    },
                "airline" : Info & { "airlineCode": string },
                "starting" : boolean,
                "arrivalAirport" : Info
             },
        ],
}