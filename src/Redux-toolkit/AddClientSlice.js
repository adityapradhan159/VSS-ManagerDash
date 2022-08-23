import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addClient: {},
};

export const AddClientSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setClientBasicDetails: (state, action) => {
			state.addClient["basicDetails"] = action.payload;
		},

		setClientTruck: (state, action) => {
			state.addClient["trucks"] = action.payload;
			// console.log(action.payload, state.addClient);
		},
	},
});

export const { setClientBasicDetails, setClientTruck } = AddClientSlice.actions;
export default AddClientSlice.reducer;
