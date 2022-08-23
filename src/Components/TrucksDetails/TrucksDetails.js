import React, { useState } from "react";
import TripFilters from "../TripFilters/TripFilters";
import "./TrucksDetails.css";
import TripTabTables from "../TripTabTables/TripTabTables";
import { useAnimation } from "framer-motion";
import AddSlidingWindow from "../AddSlidingWindow/AddSlidingWindow";
import TruckBasicDetails from "./TruckBasicDetails/TruckBasicDetails";
import TrucksUploadDocuments from "./TrucksUploadDocuments/TrucksUploadDocuments";
import TrucksPermits from "./TrucksPermits/TrucksPermits";
export default function TrucksDetails() {
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
			component: <TruckBasicDetails missingCheck={missingCheck} />,
		},
		{
			name: "Upload Documents",
			id: 2,
			component: <TrucksUploadDocuments missingCheck={missingCheck} />,
		},
	];
	const Tabletabs = [
		{
			name: "Active",
			url: "/activeTrucks.json",
		},
		{
			name: "Inactive",
			url: "/inactiveTrucks.json",
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
			name: "class",
			Onclick: handleFiltering,
		},
		{
			name: "capacity",
			Onclick: handleFiltering,
		},
		{
			name: "model",
			Onclick: handleFiltering,
		},
		{
			name: "company",
			Onclick: handleFiltering,
		},
	];
	return (
		<div
			style={{
				width: "100vw",
				flex: 1,
			}}
			className='DetailsIndividualPage'>
			<TripFilters filters={filters} />
			<TripTabTables
				tabs={Tabletabs}
				addBtn={handleAddSlidingWindow}
				deleteBtn={deleteBtn}
				chatBtn={chatBtn}
				type='truck'
			/>
			<AddSlidingWindow
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				title='truck'
				components={SlidingWindowTabs}
				missing={missing}
			/>
		</div>
	);
}
