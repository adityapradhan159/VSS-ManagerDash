import React, { useState } from "react";
import TripFilters from "../TripFilters/TripFilters";
import "./SosTable.css";
import TripTabTables from "../TripTabTables/TripTabTables";
import { useAnimation } from "framer-motion";
import AddSlidingWindow from "../AddSlidingWindow/AddSlidingWindow";
import SosLogs from "./SosLogs/SosLogs";

export default function SosTable() {
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
	// const SlidingWindowTabs = [
	// 	{
	// 		name: "Basic Details",
	// 		id: 1,
	// 		component: <TruckBasicDetails missingCheck={missingCheck} />,
	// 	},
	// 	{
	// 		name: "Upload Documents",
	// 		id: 2,
	// 		component: <TrucksUploadDocuments missingCheck={missingCheck} />,
	// 	},
	// ];
	const Tabletabs = [
		{
			name: "SOS Notifications",
			url: "/SosData.json",
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
	const handleFiltering = () => {
		//filtering
	};
	const filters = [
		{
			name: "source",
			Onclick: handleFiltering,
		},
		{
			name: "source",
			Onclick: handleFiltering,
		},
		{
			name: "Client",
			Onclick: handleFiltering,
		},
		{
			name: "Zone",
			Onclick: handleFiltering,
		},
		{
			name: "Category",
			Onclick: handleFiltering,
		},
	];
	return (
		<div
			style={{
				width: "100vw",
				flex: 1,
			}}
			className='DetailsIndividualPage sosTableDesing'>
			<TripFilters filters={filters} />
			<TripTabTables
				tabs={Tabletabs}
				addBtn={handleAddSlidingWindow}
				deleteBtn={deleteBtn}
				chatBtn={chatBtn}
				type='Sos'
			/>
			{/* <SosLogs
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				title='truck'
			/> */}
		</div>
	);
}
