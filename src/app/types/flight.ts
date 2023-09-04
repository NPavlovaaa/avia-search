import {Leg} from "./leg";
import {Currency, Info, Price} from "./detail";

export type Flight = {
    "hasExtendedFare" : boolean,
    "flight" :
        {
            "carrier" : Info & { "airlineCode": string },
            "price" :
                {
                    "total" : Price,
                    "totalFeeAndTaxes" : Price,
                    "rates" :
                        {
                            "totalUsd" : Currency,
                            "totalEur" : Currency,
                        },
                    "passengerPrices" :
                        [
                            {
                                "total" : Price,
                                "passengerType" : Price,
                                "singlePassengerTotal" : Price,
                                "passengerCount" : number,
                                "tariff" : Price,
                                "feeAndTaxes" : Price
                            }
                        ]
                },
            "servicesStatuses" :
                {
                    "baggage" :Info,
                    "exchange" : Info,
                    "refund" : Info
                },
            "legs" : [Leg],
            "exchange" :
                {
                    "ADULT" :
                        {
                            "exchangeableBeforeDeparture" : boolean,
                            "exchangeAfterDeparture" : Price,
                            "exchangeBeforeDeparture" : Price,
                            "exchangeableAfterDeparture" : boolean
                        }
                },
            "isTripartiteContractDiscountApplied" : boolean,
            "international" : boolean,
            "seats" :
                [
                    {
                        "count" : 1,
                        "type" : Info
                    }
                ],
            "refund" :
                {
                    "ADULT" :
                        {
                            "refundableBeforeDeparture" : boolean,
                            "refundableAfterDeparture" : boolean
                        }
                }
        },
    "flightToken" : string
}
