import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addTruck: {},
};

export const AddTruckSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setTruckBasicDetails: (state, action) => {
			state.addTruck["basicDetails"] = action.payload;
		},
		setTruckPermit: (state, action) => {
			console.log(action.payload);
			state.addTruck["permit"] = action.payload;
		},
		setTruckUpDoc: (state, action) => {
			state.addTruck["uploadDoc"] = action.payload;
			console.log(action.payload, state.addTruck);
		},
	},
});

export const { setTruckBasicDetails, setTruckPermit, setTruckUpDoc } =
	AddTruckSlice.actions;
export default AddTruckSlice.reducer;
