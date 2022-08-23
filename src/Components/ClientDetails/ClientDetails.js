import React, { useState } from "react";
import TripFilters from "../TripFilters/TripFilters";
import "./ClientDetails.css";
import TripTabTables from "../TripTabTables/TripTabTables";
import AddSlidingWindow from "../AddSlidingWindow/AddSlidingWindow";
import { useAnimation } from "framer-motion";
import BasicDetailsComponent from "./BasicDetailsComponent/BasicDetailsComponent";
import AddTrucks from "./AddTrucks/AddTrucks";
export default function ClientDetails() {
	const [missing, setMissing] = useState([]);
	const AddSlidingWindowAnimation = useAnimation();
	const handleAddSlidingWindow = () => {
		AddSlidingWindowAnimation.start({
			width: 600,
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.1,
			},
		});
	};

	const missingCheck = (id, payload) => {
		console.log(id, payload);
		if (payload) {
			setMissing((prev) => {
				const newData = [id, ...prev];
				return newData;
			});
		} else {
			setMissing((prev) => {
				const newData = [...prev].filter((item) => item != id);
				console.log(newData);
				return newData;
			});
		}
	};
	const SlidingWindowTabs = [
		{
			name: "Basic Details",
			id: 1,
			component: <BasicDetailsComponent missingCheck={missingCheck} />,
		},
		{
			name: "add truck",
			id: 2,
			component: <AddTrucks missingCheck={missingCheck} />,
		},
	];
	const tabs = [
		{
			name: "Active",
			url: "/Clients.json",
		},
		{
			name: "Deactivated",
			url: "/Clients.json",
		},
	];
	const handleFiltering = () => {
		//filtering
	};
	const filters = [
		{
			name: "status",
			Onclick: handleFiltering,
		},
		{
			name: "ongoing",
			Onclick: handleFiltering,
		},
		{
			name: "state",
			Onclick: handleFiltering,
		},
		{
			name: "city",
			Onclick: handleFiltering,
		},
	];
	const addBtn = () => {
		//do add function
	};
	const deleteBtn = () => {
		//delete function
	};
	const chatBtn = () => {
		//chat
	};
	return (
		<div
			style={{
				width: "100vw",
				flex: 1,
			}}
			className='DetailsIndividualPage'>
			<TripFilters filters={filters} />
			<TripTabTables
				tabs={tabs}
				addBtn={handleAddSlidingWindow}
				deleteBtn={deleteBtn}
				chatBtn={chatBtn}
				type='client'
			/>
			<AddSlidingWindow
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				title='Client'
				components={SlidingWindowTabs}
				missing={missing}
			/>
		</div>
	);
}
