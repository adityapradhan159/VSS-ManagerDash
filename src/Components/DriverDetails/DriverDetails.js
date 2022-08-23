import React, { useState } from "react";
import TripFilters from "../TripFilters/TripFilters";
import "./DriverDetails.css";
import TripTabTables from "../TripTabTables/TripTabTables";
import AddSlidingWindow from "../AddSlidingWindow/AddSlidingWindow";
import { useAnimation } from "framer-motion";
import DriverBasicDetails from "./DriverBasicDetails/DriverBasicDetails";
import DriverBankDetails from "./DriverBankDetails/DriverBankDetails";
import UploadDocuments from "./UploadDocuments/UploadDocuments";
export default function DriverDetails() {
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
	const [missing, setMissing] = useState([]);
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
	const [SlidingWindowTabs, setSlidingWindowTabs] = useState([
		{
			name: "Basic Details",
			id: 1,
			component: <DriverBasicDetails missingCheck={missingCheck} />,
		},
		{
			name: "Upload Documents",
			id: 2,
			component: <UploadDocuments missingCheck={missingCheck} />,
		},
	]);
	const [Tabletabs, setTabletabs] = useState([
		{
			name: "Occupied",
			url: "/Drivers.json",
		},
		{
			name: "Available",
			url: "/Drivers.json",
		},
		{
			name: "Deactivated",
			url: "/Drivers.json",
		},
	]);

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
			name: "status",
			Onclick: handleFiltering,
		},
		{
			name: "zone",
			Onclick: handleFiltering,
		},
		{
			name: "language",
			Onclick: handleFiltering,
		},
		{
			name: "last trip",
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
				type='driver'
			/>
			<AddSlidingWindow
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				title='Driver'
				components={SlidingWindowTabs}
				missing={missing}
			/>
		</div>
	);
}
