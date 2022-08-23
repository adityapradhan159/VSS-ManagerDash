import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addTrip: {},
};

export const AddTripSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setRouteDetails: (state, action) => {
			state.addTrip["routeDetails"] = action.payload;
		},
		setTripDetails: (state, action) => {
			state.addTrip["tripDetails"] = action.payload;
			console.log(action.payload, state.addTrip);
		},
	},
});

export const { setRouteDetails, setTripDetails } = AddTripSlice.actions;
export default AddTripSlice.reducer;
