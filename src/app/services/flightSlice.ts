import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Flight} from "../types/flight";
import {flightApi} from "./flightApi";
import {Info} from "../types/detail";


interface InitialState{
    flights: any,
    activeAirlineFilter: string,
    airlineFilters: Array<any>
    activeTransferFilter: string,
    activeMaxPrice: number,
    activeSort: string,
    activeAirlineFilters: Array<any>,
}

const initialState: InitialState = {
    flights: null,
    activeAirlineFilter: 'allAirlines',
    airlineFilters: [],
    activeTransferFilter: 'allOptionsTransfer',
    activeMaxPrice: 300000,
    activeSort: 'none',
    activeAirlineFilters: [],
}

const flightSlice = createSlice({
    name: 'flights',
    initialState,
    reducers: {
        activeTransferFilterChanged(state, action: PayloadAction<string>){
            state.activeTransferFilter = action.payload;
        },
        activeAirlineFilterChanged(state, action: PayloadAction<string>){
            state.activeAirlineFilter = action.payload;
        },
        priceFilterChanged(state, action: PayloadAction<any>){
            state.activeMaxPrice = action.payload;
        },
        sortChanged(state, action: PayloadAction<string>){
            state.activeSort = action.payload;
        },
        activeAirlineListChanged(state, action: PayloadAction<any>){
            state.activeAirlineFilters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(flightApi.endpoints.getAllFlights.matchFulfilled, (state, action) => {
                state.flights = action.payload;
                let airlinesArray: Array<Info> = [];
                state.airlineFilters = action.payload.flights.map((flight: Flight) => {
                    airlinesArray.push(flight.flight.carrier)
                })

                state.airlineFilters = Array.from(new Set(airlinesArray.map(item => item.caption)));
            })
    }
})

const {actions, reducer} = flightSlice;
export const {activeTransferFilterChanged, activeAirlineFilterChanged, priceFilterChanged, sortChanged, activeAirlineListChanged} = actions;

export default reducer;

export const flightsSelector = (state: RootState) => state.flights.flights;
export const activeTransferFilterSelector = (state: RootState) => state.flights.activeTransferFilter;
export const airlineFilters = (state: RootState) => state.flights.airlineFilters;
export const activeAirlineFilterSelector = (state: RootState) => state.flights.activeAirlineFilter;
export const activeMaxPriceSelector = (state: RootState) => state.flights.activeMaxPrice;
export const activeSortSelector = (state: RootState) => state.flights.activeSort;
export const activeAirlineListSelector = (state: RootState) => state.flights.activeAirlineFilters;
