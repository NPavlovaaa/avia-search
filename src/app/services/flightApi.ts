import {api} from "./api";


export const flightApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlights: builder.query<any, void>({
            query: () => ({
                url: "/result",
                method: "GET",
            }),
        })
    }),
});

export const {useGetAllFlightsQuery} = flightApi;

export const {endpoints: {getAllFlights}} = flightApi;

