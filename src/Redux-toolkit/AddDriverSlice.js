import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	addDriver: {},
};

export const AddDriverSlice = createSlice({
	name: "loginState",
	initialState,
	reducers: {
		setBasicDetails: (state, action) => {
			state.addDriver["basicDetails"] = action.payload;
		},
		setBankDetails: (state, action) => {
			console.log(action.payload);
			state.addDriver["bankDetails"] = action.payload;
		},
		setUploadDoc: (state, action) => {
			state.addDriver["uploadDoc"] = action.payload;
			console.log(action.payload, state.addDriver);
		},
	},
});

export const { setBasicDetails, setBankDetails, setUploadDoc } =
	AddDriverSlice.actions;
export default AddDriverSlice.reducer;
