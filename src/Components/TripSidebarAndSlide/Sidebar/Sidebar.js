import React, { useState } from "react";
import "./Sidebar.css";

import SlidingBar from "../SlidingBar/SlidingBar";
import { useSelector } from "react-redux";
import { useAnimation } from "framer-motion";
import { Tab, Tabs } from "react-bootstrap";
export default function Sidebar() {
	const { allMarkers } = useSelector((state) => state.allMarkers);
	const [currentId, setCurrentId] = useState(null);
	const [prevActiveId, setPrevActiveId] = useState(null);
	const [key, setKey] = useState("ActiveTrips");
	const { MapRef } = useSelector((state) => state.MapRef);

	const controlAnimation = useAnimation();

	const slidebarOpen = (type, id, TripId) => {
		const displacement = document.querySelector(".sidebar").offsetWidth;
		if (prevActiveId == null) {
			setPrevActiveId(type + "-" + id);
			const swithToActive = document.querySelector(
				`[data-markerId=${type + "-" + id}]`
			);
			swithToActive.classList.add("active");
		} else {
			setPrevActiveId(type + "-" + id);
			const swithToNotActive = document.querySelector(
				`[data-markerId=${prevActiveId}]`
			);
			swithToNotActive.classList.remove("active");

			const swithToActive = document.querySelector(
				`[data-markerId=${type + "-" + id}]`
			);
			swithToActive.classList.add("active");
		}
		controlAnimation.start({
			x: displacement + 8,
			opacity: 1,
			transition: {
				duration: 0.1,
			},
		});
		setCurrentId(TripId);
	};
	const slidebarClose = () => {
		const swithToNotActive = document.querySelector(
			`[data-markerId=${prevActiveId}]`
		);
		swithToNotActive.classList.remove("active");
		controlAnimation.start({
			x: -500,
			opacity: 0,
			transition: {
				duration: 0.1,
			},
		});
	};
	const centerFocusedMarker = (e, id) => {
		e.stopPropagation();
		const pos = {
			lat: allMarkers[id].currentLocation.latitude,
			lng: allMarkers[id].currentLocation.longitude,
		};
		// console.log(MapRef, id, e, allMarkers[id]);
		MapRef?.setCenter(pos);
		MapRef?.setZoom(10);
	};

	const handleTabActive = (e) => {
		const clickeItem = e.currentTarget;
		const prev = document.querySelector(`[data-tabId=${key}]`);
		prev.classList.remove("active");
		clickeItem.classList.add("active");
		// slidebarClose();
		setKey(clickeItem.dataset.tabid);
	};
	return (
		<div className='sidebar py-3'>
			<div className='tab-menu'>
				<div
					onClick={handleTabActive}
					data-tabid='ActiveTrips'
					className='active'>
					Active Trips
				</div>
				<div
					onClick={handleTabActive}
					data-tabid='ScheduledTrips'
					className=''>
					Scheduled Trips
				</div>
			</div>
			<Tabs
				id='controlled-tab-example'
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className='mb-3'>
				<Tab
					eventKey='ActiveTrips'
					title='Active Trips'
					className='markerWrapper'
					style={{ flex: 1, overflowY: "scroll" }}>
					{allMarkers?.map((item, index) => (
						<div
							key={"marker-" + index}
							data-markerId={"active-" + index}
							onClick={() =>
								slidebarOpen("active", index, item.id)
							}
							className={`markerBox`}>
							<div className='markerBoxCarLogo'>
								<img
									src='/assets/truck.svg'
									alt=''
									className='img-fluid'
								/>
							</div>
							<div style={{ flex: 1 }}>
								<div className='truckDetail'>
									<div className='col-8 d-flex flex-column'>
										<span className='truckLiciense'>
											{item.truck.registrationNumber}
										</span>
										<span className='truckCompany'>
											{
												item.truck.truckCompany
													.companyName
											}
										</span>
										<span className='truckRoute'>
											{item.source}-{item.destination}
										</span>
									</div>
									<div className='col-4 sosBtn'>
										<img
											src='/assets/sos.png'
											alt=''
											className='img-fluid'
											srcset=''
										/>
									</div>
								</div>
								<div className='d-flex iconOptions'>
									<span style={{ marginRight: "28px" }}>
										<img
											src='/assets/pen.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
									<span style={{ marginRight: "28px" }}>
										<img
											src='/assets/chat.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
									<span
										onClick={(e) =>
											centerFocusedMarker(e, index)
										}>
										<img
											src='/assets/marker.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
								</div>
							</div>
						</div>
					))}
				</Tab>

				<Tab
					eventKey='ScheduledTrips'
					title='Scheduled Trips'
					className='markerWrapper'
					style={{ flex: 1, overflowY: "scroll" }}>
					{allMarkers?.map((item, index) => (
						<div
							key={"marker-" + index}
							data-markerId={"schedule-" + index}
							onClick={() =>
								slidebarOpen("schedule", index, item.id)
							}
							className={`markerBox`}>
							<div className='markerScheduleDate'>
								<span className='month'>Jan</span>
								<span className='date'>22</span>
								<span className='year'>2022</span>
							</div>
							<div style={{ flex: 1 }}>
								<div className='truckDetail'>
									<div className=' d-flex flex-column'>
										<span className='truckLiciense'>
											{item.License}
										</span>
										<span className='truckCompany'>
											{item.company}
										</span>
										<span className='truckRoute'>
											{item.source}-{item.destinatin}
										</span>
									</div>
								</div>
								<div className='d-flex iconOptions'>
									<span style={{ marginRight: "28px" }}>
										<img
											src='/assets/pen.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
									<span style={{ marginRight: "28px" }}>
										<img
											src='/assets/chat.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
									<span
										onClick={(e) =>
											centerFocusedMarker(e, index)
										}>
										<img
											src='/assets/marker.svg'
											alt=''
											className='img-fluid'
										/>
									</span>
								</div>
							</div>
						</div>
					))}
				</Tab>
			</Tabs>

			<SlidingBar
				controlAnimation={controlAnimation}
				slidebarClose={slidebarClose}
				currentId={currentId}
			/>
		</div>
	);
}
