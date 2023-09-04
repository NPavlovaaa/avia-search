import {api} from "./services/api";
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit/dist";
import flights from "./services/flightSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    flights
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
