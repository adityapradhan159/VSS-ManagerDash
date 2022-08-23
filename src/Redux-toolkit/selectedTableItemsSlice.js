import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedTableItems: [],
};

export const selectedTableItemsSlice = createSlice({
	name: "selectedItems",
	initialState,
	reducers: {
		clearSelectedTableItems: (state, action) => {
			state.selectedTableItems = [];
			const allCheckBox = document.querySelectorAll("." + action.payload);
			allCheckBox?.forEach((item) => {
				item.dataset.checked = "true";
				selectedTableItemsSlice.caseReducers.checkStateChange(
					state,
					item
				);
			});
		},
		setSelectedtableItems: (state, payload) => {
			console.log(payload);
			if (state.selectedTableItems != null)
				state.selectedTableItems = [
					...new Set([payload, ...state.selectedTableItems]),
				];
			else state.selectedTableItems = [payload];
			console.log(state.selectedTableItems);
		},
		removeSelectedTableItems: (state, payload) => {
			state.selectedTableItems = state.selectedTableItems.filter(
				(item) => item !== payload
			);
		},
		checkStateChange: (state, action) => {
			// console.log(action);
			const target = action;
			const isChecked = JSON.parse(target.dataset.checked);
			if (!isChecked) {
				console.log(isChecked, target);
				target.setAttribute("src", "/assets/checkBoxChecked.png");
				target.dataset.checked = "true";
				// console.log(target.dataset/);
				selectedTableItemsSlice.caseReducers.setSelectedtableItems(
					state,
					target.dataset.checkboxid
				);
				return;
			}
			target.setAttribute("src", "/assets/checkBoxUnChecked.png");
			target.dataset.checked = "false";
			selectedTableItemsSlice.caseReducers.removeSelectedTableItems(
				state,
				target.dataset.checkboxid
			);
		},
		handleCheck: (state, action) => {
			console.log(action);
			const target = action.payload[0].currentTarget;
			const type = target.dataset.checkboxid;
			if (type === "all") {
				selectedTableItemsSlice.caseReducers.checkStateChange(
					state,
					target
				);
				const allCheckBox = document.querySelectorAll(
					"." + action.payload[1]
				);
				allCheckBox.forEach((item) => {
					const isChecked = JSON.parse(target.dataset.checked);
					if (isChecked) {
						item.dataset.checked = "false";
					} else item.dataset.checked = "true";
					selectedTableItemsSlice.caseReducers.checkStateChange(
						state,
						item
					);
				});
				return;
			}
			selectedTableItemsSlice.caseReducers.checkStateChange(
				state,
				target
			);
		},
	},
});

export const {
	setSelectedtableItems,
	removeSelectedTableItems,
	clearSelectedTableItems,
	handleCheck,
	checkStateChange,
} = selectedTableItemsSlice.actions;
export default selectedTableItemsSlice.reducer;
