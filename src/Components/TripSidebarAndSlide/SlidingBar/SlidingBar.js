import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faPhone,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import "./SlidingBar.css";

export default function SlidingBar({
	controlAnimation,
	slidebarClose,
	currentId,
}) {
	const { allMarkers } = useSelector((state) => state.allMarkers);
	const [tripDetails, setTripDetails] = useState(null);
	const [key, setKey] = useState("Tracking");
	const setHeight = () => {
		const heightToSubtract =
			document.querySelector(".SlidingWindow-top").offsetHeight;

		const tabElement = document.querySelector(".SlidingWindowTabs");
		console.log(heightToSubtract, tabElement);
		tabElement.style.height = `calc(100% -  ${heightToSubtract}px)`;
	};
	const getTheTripData = (tripId) => {
		fetch(
			`https://devser.vahan247.com/logisticsManager/getTrip?id=${tripId}`
		)
			.then((res) => res.json())
			.then((result) => setTripDetails(result))
			.catch((err) => console.log(err, tripId));
	};

	useEffect(() => {
		setHeight();
		getTheTripData(currentId);
	}, [currentId]);
	return (
		<motion.div
			className='slidingBar'
			initial={{ opacity: 1, x: -5000 }}
			animate={controlAnimation}>
			<div className='SlidingWindow-top'>
				<div className='d-flex align-items-start justify-content-between '>
					<div className='d-flex align-item-start'>
						<span
							style={{ cursor: "pointer" }}
							onClick={slidebarClose}
							className='me-2'>
							<FontAwesomeIcon icon={faAngleLeft} />
						</span>
						<div>
							<span>
								{tripDetails?.trip?.truck.registrationNumber}
							</span>
							{tripDetails?.trip?.truck.isActive === true ? (
								<div>
									<img
										src='/assets/drivingSignal.png'
										alt=''
										className='img-fluid'
									/>
									<span className='ms-3'>driving</span>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
					<div>
						<span>
							<img
								src='/assets/pen.svg'
								alt=''
								className='img-fluid'
							/>
						</span>
						<span className='mx-3'>
							<img
								src='/assets/trashCan.svg'
								alt=''
								className='img-fluid'
							/>
						</span>
						<span>
							<img
								src='/assets/marker.svg'
								alt=''
								className='img-fluid'
							/>
						</span>
					</div>
				</div>
				<div className='d-flex flex-wrap align-items-center justify-content-between my-2'>
					<div className='row row-cols-3 col-9 gy-2'>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>Source</small>
							<span className='slideText'>
								{tripDetails?.trip?.source}
							</span>
						</div>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>
								Destination
							</small>
							<span className='slideText'>
								{tripDetails?.trip?.destination}
							</span>
						</div>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>Client</small>
							<span className='slideText'>
								{
									tripDetails?.trip?.truck.truckCompany
										.companyName
								}
							</span>
						</div>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>Start Date</small>
							<span className='slideText'>
								{tripDetails?.trip?.startDate.split("T")[0]}
							</span>
						</div>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>End Date</small>
							<span className='slideText'>
								{tripDetails?.trip?.expectedEndDate.split(
									"T"
								)[0] || "not selected"}
							</span>
						</div>
						<div className='col d-flex flex-column '>
							<small className='text-secondary'>Zone</small>
							<span className='slideText'>
								{tripDetails?.trip?.via}
							</span>
						</div>
					</div>
					<div className='col-3 d-flex align-items-center justify-content-center'>
						<span>
							<img
								src='/assets/sosBlue.png'
								alt=''
								className='img-fluid'
							/>
						</span>
					</div>
				</div>
				<div className='py-2 d-flex align-items-center justify-content-between'>
					<span className='slideText text-secondary'>
						Driver Name
					</span>
					<div className='d-flex align-items-center'>
						<a href className='text-dark'>
							{allMarkers[currentId]?.driver.firstname}
						</a>
						<span className='mx-3'>
							<img
								src='/assets/ChatIcon.svg'
								alt=''
								className='img-fluid'
							/>
						</span>
						<span>
							<FontAwesomeIcon icon={faPhone} />
						</span>
					</div>
				</div>
			</div>
			<div className='SlidingWindowTabs'>
				<Tabs
					id='slidingBar'
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className='mb-3 '>
					{/* ==================================
                    tracking Tab
                    ================================== */}
					<Tab
						className=' w-100'
						eventKey='Tracking'
						title='Tracking'>
						<div className='SlidebartrackingTab'>
							<div className='d-flex align-items-center justify-content-end'>
								<span className='text-secondary slideText me-2'>
									Update 5 min ago
								</span>
								<span className='btn btn-outline-dark slideText d-flex align-items-center justify-content-between'>
									<span className='me-2'>Refresh</span>
									<FontAwesomeIcon icon={faRefresh} />
								</span>
							</div>
							<div className='tracking'>
								{[1, 2, 3, 4, 4].map((item, index) => {
									return (
										<div className=' trackingCard d-flex align-items-start '>
											<span className='statusIcon'>
												<img
													src='/assets/drivingSignal.png'
													alt=''
													className='img-fluid'
												/>
											</span>
											<div className='d-flex flex-column me-5'>
												<span className='status'>
													Now
												</span>
												<span className='time '>
													18:05
												</span>
											</div>
											<div>
												<div className='status'>
													Driving
												</div>
												<div className='location'>
													Delhi -XXX Highway
												</div>
												<div className='d-flex align-items-center justify-content-between speed'>
													<span>55 Km/hr</span>
													<span className='mx-4'>
														50 min
													</span>
													<span>48 km </span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</Tab>
					{/* ==================================
                    Truck details Tab
                    ================================== */}
					<Tab
						className=' w-100'
						eventKey='TruckDetails'
						title='Truck Details'>
						<div className='row row-cols-3 col-12 gy-2'>
							<div className='col d-flex flex-column '>
								<small className='text-secondary'>Make</small>
								<span className='slideText'>
									{
										allMarkers[currentId]?.truck
											.classOfVehicle
									}
								</span>
							</div>
							<div className='col d-flex flex-column '>
								<small className='text-secondary'>Model</small>
								<span className='slideText'>
									{
										allMarkers[currentId]?.truck
											.classOfVehicle
									}
								</span>
							</div>
							<div className='col d-flex flex-column '>
								<small className='text-secondary'>
									Load Capacity
								</small>
								<span className='slideText'>{"1 ton"}</span>
							</div>
							<div className='col d-flex flex-column '>
								<small className='text-secondary'>
									Registration State
								</small>
								<span className='slideText'>
									{
										allMarkers[currentId]?.truck
											.registeredState
									}
								</span>
							</div>
							<div className='col d-flex flex-column '>
								<small
									className='text-secondary'
									style={{ whiteSpace: "nowrap" }}>
									Year of Manufacture
								</small>
								<span className='slideText'>
									{
										allMarkers[currentId]?.truck
											.registeredDate
									}
								</span>
							</div>
						</div>
					</Tab>
					{/* ==================================
                    Documents Tab
                    ================================== */}
					<Tab eventKey='Documents' title='Documents'>
						<div className='documents'>
							<div className='reg_certificate'>
								<div className='d-flex flex-column'>
									<span className='title'>
										Registration Certificate
									</span>
									<span className='reg-no'>19798290101</span>
								</div>
								<div className='d-flex'>
									<div className='docfile me-2'></div>
									<div className='docfile'></div>
								</div>
							</div>
							<div className='insurance d-flex align-items-center justify-content-between py-2'>
								<div className='d-flex flex-column'>
									<span className='title'>
										Insurance details
									</span>
									<span className='company'>XXX Company</span>
									<span className='validity'>
										From: 12 Jan 2025 | To: 12 Jan 2025{" "}
									</span>
									<div>
										<span>
											<img
												src='/assets/downloadBtn.png'
												alt=''
												className='img-fluid'
											/>
										</span>
										<span className='mx-4'>
											<img
												src='/assets/editPen.svg'
												alt=''
												className='img-fluid'
											/>
										</span>
										<span>
											<img
												src='/assets/trash.svg'
												alt=''
												className='img-fluid'
											/>
										</span>
									</div>
								</div>
								<div className='d-flex'>
									<div className='docfile me-2'></div>
									<div className='docfile'></div>
								</div>
							</div>
							<div className='emissionTest d-flex align-items-center justify-content-between py-2'>
								<div className='d-flex flex-column'>
									<span className='title'>
										Emission Test Report
									</span>
									<span className='company'>XXX Company</span>
									<span className='validity'>
										From: 12 Jan 2025 | To: 12 Jan 2025{" "}
									</span>
									<div>
										<span>
											<img
												src='/assets/downloadBtn.png'
												alt=''
												className='img-fluid'
											/>
										</span>
										<span className='mx-4'>
											<img
												src='/assets/editPen.svg'
												alt=''
												className='img-fluid'
											/>
										</span>
										<span>
											<img
												src='/assets/trash.svg'
												alt=''
												className='img-fluid'
											/>
										</span>
									</div>
								</div>
								<div className='d-flex'>
									<div className='docfile '></div>
									{/* <div className='docfile'></div> */}
								</div>
							</div>
						</div>
					</Tab>
					{/* ==================================
                    Permit Tab
                    ================================== */}
					<Tab eventKey='Permit' title='Permit'>
						<div className='permit'>
							<Accordion defaultActiveKey='0'>
								<Accordion.Item eventKey='0'>
									<Accordion.Header>
										<span className='headerTitle'>
											Permit Number
										</span>
										<span className='headerStatus  mx-2'>
											Expired
										</span>
										<span className='lastUpdate'>
											Updated 1 year ago
										</span>
									</Accordion.Header>
									<Accordion.Body>
										<span>Permit Details </span>
										<div className='row row-cols-3 gy-2'>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Father Name
												</small>
												<span className='slideText'>
													Rakesh Kumar
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Valid From
												</small>
												<span className='slideText'>
													11 April 2021
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Valid To
												</small>
												<span className='slideText'>
													11 April 2022
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Permit Holder
												</small>
												<span className='slideText'>
													Rakesh Kumar
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Address
												</small>
												<span className='slideText'>
													11 April 2021
												</span>
											</div>
										</div>
										<div className='my-2'>
											<div className='tableHeader row row-cols-4'>
												<span className='fw-bold'>
													From
												</span>
												<span className='fw-bold'>
													To
												</span>
												<span className='fw-bold'>
													Via
												</span>
												<span className='fw-bold'>
													Actions
												</span>
											</div>
											{[1, 2, 3, 4].map((item, index) => (
												<div
													key={index}
													className='tableBody row row-cols-4'>
													<span className='text-secondary'>
														Punjab
													</span>
													<span className='text-secondary'>
														Kerala
													</span>
													<span className='text-secondary'>
														Mumbai
													</span>
													<span className='text-secondary '>
														<span className='me-3'>
															<img
																src='/assets/pen.svg'
																alt=''
																className='img-fluid'
															/>
														</span>
														<span>
															<img
																src='/assets/trashCan.svg'
																alt=''
																className='img-fluid'
															/>
														</span>
													</span>
												</div>
											))}
										</div>
									</Accordion.Body>
								</Accordion.Item>
								<Accordion.Item eventKey='1'>
									<Accordion.Header>
										<span className='headerTitle'>
											Permit Number
										</span>
										<span className='headerStatus expired mx-2'>
											Expired
										</span>
										<span className='lastUpdate'>
											Punjab to Kerala
										</span>
									</Accordion.Header>
									<Accordion.Body>
										<span>Permit Details </span>
										<div className='row row-cols-3 gy-2'>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Father Name
												</small>
												<span className='slideText'>
													Rakesh Kumar
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Valid From
												</small>
												<span className='slideText'>
													11 April 2021
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Valid To
												</small>
												<span className='slideText'>
													11 April 2022
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Permit Holder
												</small>
												<span className='slideText'>
													Rakesh Kumar
												</span>
											</div>
											<div className='col d-flex flex-column '>
												<small className='text-secondary'>
													Address
												</small>
												<span className='slideText'>
													11 April 2021
												</span>
											</div>
										</div>
										<div className='my-2'>
											<div className='tableHeader row row-cols-4'>
												<span className='fw-bold'>
													From
												</span>
												<span className='fw-bold'>
													To
												</span>
												<span className='fw-bold'>
													Via
												</span>
												<span className='fw-bold'>
													Actions
												</span>
											</div>
											{[1, 2, 3, 4].map((item, index) => (
												<div
													key={index}
													className='tableBody row row-cols-4'>
													<span className='text-secondary'>
														Punjab
													</span>
													<span className='text-secondary'>
														Kerala
													</span>
													<span className='text-secondary'>
														Mumbai
													</span>
													<span className='text-secondary '>
														<span className='me-3'>
															<img
																src='/assets/pen.svg'
																alt=''
																className='img-fluid'
															/>
														</span>
														<span>
															<img
																src='/assets/trashCan.svg'
																alt=''
																className='img-fluid'
															/>
														</span>
													</span>
												</div>
											))}
										</div>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						</div>
					</Tab>
				</Tabs>
			</div>
		</motion.div>
	);
}
