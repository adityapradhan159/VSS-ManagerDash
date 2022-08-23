import React, { useState, useEffect } from "react";
import "./activeScheduled.css";
import ActiveCards from "../ActiveCard/ActiveCards";
import ScheduleCards from "../ScheduledCard/ScheduleCards";
import ClientDetails from "../../ClientDetailsPage/ClientDetails";
import Consignment from "../../Consignment/Consignment";

const ActiveScheduled = () => {
	// Toggle Tabs Between Active and Schedule Trips
	const [AStoggleState, setASToggleState] = useState(1);
	const toggleTab = (index) => {
		setASToggleState(index);
	};

	// --------------------------------Active Trip----------------------------------------------------

	// State to store Active data from json
	const [activeData, setActiveData] = useState([]);

	// Fetch Data..
	const getActiveData = () => {
		fetch("/activeTrip.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				setShowActiveId(0);
				setActiveData(myJson);
			});
	};
	useEffect(() => {
		getActiveData();
	}, []);

	// For Storing Id for Consigment Component.....
	const [showActiveId, setShowActiveId] = useState(null);

	const storeActiveId = (id) => {
		setShowActiveId(id);
	};

	// For Storing Id for Client Details Component.....
	const [showActiveClientId, setShowActiveClientId] = useState(null);

	const storeActiveClientId = (id) => {
		setShowActiveClientId(id);
		setScreenShown(true);
	};

	// ----------------------------------------Schedule Trip----------------------------------------------------------------

	const [isScreenShown, setScreenShown] = useState(false);

	const [isAccordion, setAccordion] = useState(true);

	// For Storing id for Schedule Trip and showing Cllient Details in Schedule Trip
	const [showId, setShowId] = useState(null);
	const storeId = (id) => {
		setShowId(id);
		setScreenShown(true);
	};

	// State to store Schedule data from json
	const [scheduleData, setScheduleData] = useState([]);

	// Fetch Data..
	const getScheduleData = () => {
		fetch("/scheduleTrip.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				setScheduleData(myJson);
			});
	};
	useEffect(() => {
		getScheduleData();
	}, []);

	return (
		<>
			<div className='ASTabContainer'>
				{/* ------------Tabs--------- */}
				<div className='ASBloc-tabs'>
					<button
						className={
							AStoggleState === 1
								? "AStabs active-tabs"
								: "AStabs"
						}
						onClick={() => toggleTab(1)}>
						Active Trips
					</button>

					<button
						className={
							AStoggleState === 2
								? "AStabs active-tabs"
								: "AStabs"
						}
						onClick={() => toggleTab(2)}>
						Schedule Trips
					</button>
				</div>

				<div className='AScontent-tabs'>
					{/* ------------Active Trip----------------- */}
					<div
						className={
							AStoggleState === 1
								? "AScontent  active-content"
								: "AScontent"
						}>
						{activeData.map((item) => (
							<ActiveCards
								item={item}
								storeActiveId={storeActiveId}
								storeActiveClientId={storeActiveClientId}
							/>
						))}

						{showActiveId !== null && (
							<Consignment item={activeData?.[showActiveId]} />
						)}

						{showActiveClientId !== null && (
							<ClientDetails
								item={activeData[showActiveClientId]}
								isScreenShown={isScreenShown}
								setScreenShown={setScreenShown}
							/>
						)}
					</div>

					{/* -----------Schedule Trip--------------- */}
					<div
						className={
							AStoggleState === 2
								? "AScontent  active-content"
								: "AScontent"
						}>
						<div className='months'>
							<div
								className='month-container'
								onClick={() => {
									setAccordion(!isAccordion);
								}}>
								<div className='month-para'>
									<p>Current Month (5)</p>
								</div>
								<div className='month-dropDown'>
									<img src='/images/dropDown.svg' alt='' />
								</div>
							</div>
						</div>

						<div
							className={
								isAccordion
									? "scheduleCard-Container"
									: "schedulecarD-Cont-None"
							}>
							{scheduleData.map((item) => (
								<ScheduleCards
									item={item}
									storeId={storeId}
									scheduleData={scheduleData}
									setScheduleData={setScheduleData}
								/>
							))}

							{showId !== null && (
								<ClientDetails
									item={scheduleData[showId]}
									isScreenShown={isScreenShown}
									setScreenShown={setScreenShown}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActiveScheduled;
