import { configureStore } from "@reduxjs/toolkit";
import AddDriverSlice from "./AddDriverSlice";
import loginSlice from "./LoginSlice";
import MapSlice from "./MapSlice";
import MarkerSlice from "./MarkerSlice";
import AddTruckSlice from "./AddTruckSlice";
import AddClientSlice from "./AddClientSlice";
import AddTripSlice from "./AddTripSlice";
import selectedTableItemsSlice from "./selectedTableItemsSlice";

export const store = configureStore({
	reducer: {
		isLoggedIn: loginSlice,
		allMarkers: MarkerSlice,
		MapRef: MapSlice,
		addDriver: AddDriverSlice,
		addTruck: AddTruckSlice,
		addClient: AddClientSlice,
		addTrip: AddTripSlice,
		selectedTableItems: selectedTableItemsSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
