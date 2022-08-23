import React, { useState } from "react";
import { motion } from "framer-motion";
import "./TruckDetailsSlidingWindow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SlideWindow from "../../../../TripSidebarAndSlide/SlideWindow/SlideWindow";
import { Tab, Tabs } from "react-bootstrap";

export default function TruckDetailsSlidingWindow({
	TruckDetailsAnimation,
	truckDetails,
}) {
	const [key, setKey] = useState("Basic Details");
	// console.log(truckDetails);
	const handleClose = () => {
		TruckDetailsAnimation.start({
			x: 700,
			transition: {
				duration: 0.15,
			},
		});
	};

	return (
		<motion.div
			className='TruckDetailsSlidingWindow'
			initial={{
				x: 700,
			}}
			animate={TruckDetailsAnimation}>
			<div className='sliderWrapper h-100'>
				<div className='topLevel'>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex flex-column align-items-start justify-content-center'>
							<span className='LicensePlate'>
								{truckDetails?.["Truck Details"].License}
							</span>
							<span className='d-flex align-items-center companyAndStatus'>
								<span className='me-2'>
									{truckDetails?.["Truck Details"].company}
								</span>
								{" | "}
								<img
									src={truckDetails?.["Status"].icon}
									alt=''
									className='img-fluid mx-2'
								/>
								<span
									className={`${
										truckDetails?.["Status"].type ===
											"Driving" && "text-success"
									}`}>
									{truckDetails?.["Status"].type}{" "}
								</span>
							</span>
						</div>

						<div
							className='d-flex align-items-center'
							style={{ gap: "24px" }}>
							<div
								className='d-flex align-items-center'
								style={{ gap: "13px" }}>
								<img
									src='/assets/truckDetailsSlideWindow/editor.png'
									alt=''
									className='img-fluid '
								/>
								<img
									src='/assets/truckDetailsSlideWindow/delete.png'
									alt=''
									className='img-fluid '
								/>
								<img
									src='/assets/truckDetailsSlideWindow/location.png'
									alt=''
									className='img-fluid '
								/>
							</div>
							<img
								style={{ cursor: "pointer" }}
								onClick={handleClose}
								src='/assets/truckDetailsSlideWindow/times.png'
								alt=''
								className='img-fluid '
							/>
						</div>
					</div>
					{/* =======================================================
                            truckDetailsSlideInfo
                ======================================================= */}
					<div className='truckDetailsSlideInfo row row-cols-4 gy-4 my-3'>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Make</span>
								<span className='infoText'>
									{
										truckDetails?.["Make & Model"].split(
											" "
										)[0]
									}
								</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Model</span>
								<span className='infoText'>
									{
										truckDetails?.["Make & Model"].split(
											" "
										)[1]
									}
								</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Load Capacity</span>
								<span className='infoText'>
									{truckDetails?.["Load Capacity"]}
								</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Unladen weight</span>
								<span className='infoText'>
									{truckDetails?.["Load Capacity"]}
								</span>
							</div>
						</div>
						{/* <div className='col'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Year of Manufacture
								</span>
								<span className='infoText'>2016</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Registration City</span>
								<span className='infoText'>
									{truckDetails?.["Registration"].City}
								</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>
									Registration State
								</span>
								<span className='infoText'>
									{truckDetails?.["Registration"].State}
								</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Class</span>
								<span className='infoText'>Tata</span>
							</div>
						</div>

						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Chasis Number</span>
								<span className='infoText'>12345</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span className='title'>Engine Number</span>
								<span className='infoText'>22112</span>
							</div>
						</div> */}
					</div>
					{/* =======================================================
                          end of truckDetailsSlideInfo
                ======================================================= */}
					<div className='d-flex align-items-center justify-content-between driverPersonal'>
						<span className='label'>Current Driver</span>
						<div className='d-flex align-items-center'>
							<span className='driverName'>Rajesh Kumar</span>

							<img
								src='/assets/truckDetailsSlideWindow/Chat.png'
								alt=''
								className='img-fluid mx-4'
							/>

							<img
								src='/assets/truckDetailsSlideWindow/phone.png'
								alt=''
								className='img-fluid'
							/>
						</div>
					</div>
				</div>
				{/* ==============================================================
            Tab contents
            ============================================================== */}
				<div className='my-2 bottomTabs'>
					<div>
						<ul className='mb-2 nav nav-tabs' role='tablist'>
							{["Basic Details", "Documents", "Trip History"].map(
								(item, index) => {
									return (
										<li
											eventKey={item}
											class='nav-item'
											role='presentation'>
											<button
												onClick={() => setKey(item)}
												type='button'
												id='controlled-tab-example-tab-TruckDetails'
												role='tab'
												data-rr-ui-event-key={item}
												aria-controls={`controlled-tab-example-tabpane-${item}`}
												className={`nav-link ${
													key === item ? "active" : ""
												}`}
												aria-selected='true'>
												{item}
											</button>
										</li>
									);
								}
							)}
						</ul>
					</div>
					<Tabs
						id='controlled-tab-truckDetails'
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className='mb-3'>
						<Tab eventKey='Basic Details'>
							<div className='basicDetails'>
								<div className='row row-cols-3 gy-4 mt-3'>
									<div className='col'>
										<div className='d-flex flex-column'>
											<span className='title'>
												Registration City
											</span>
											<span className='infoText'>
												{
													truckDetails?.[
														"Registration"
													].City
												}
											</span>
										</div>
									</div>
									<div className='col'>
										<div className='d-flex flex-column'>
											<span className='title'>
												Registration State
											</span>
											<span className='infoText'>
												{
													truckDetails?.[
														"Registration"
													].State
												}
											</span>
										</div>
									</div>
									<div className='col'>
										<div className='d-flex flex-column'>
											<span className='title'>Class</span>
											<span className='infoText'>
												Tata
											</span>
										</div>
									</div>

									<div className='col'>
										<div className='d-flex flex-column'>
											<span className='title'>
												Chasis Number
											</span>
											<span className='infoText'>
												12345
											</span>
										</div>
									</div>
									<div className='col'>
										<div className='d-flex flex-column'>
											<span className='title'>
												Engine Number
											</span>
											<span className='infoText'>
												22112
											</span>
										</div>
									</div>
									<div className='col'>
										<div className='d-flex flex-column'>
											<span
												className='title'
												style={{
													whiteSpace: "nowrap",
												}}>
												Year of Manufacture
											</span>
											<span className='infoText'>
												2016
											</span>
										</div>
									</div>
								</div>
							</div>
						</Tab>
						<Tab eventKey='Documents'>
							<div className='documents'>
								<div className='reg_certificate'>
									<div className='d-flex flex-column'>
										<span className='title'>
											Registration Certificate
										</span>
										<span className='reg-no'>
											19798290101
										</span>
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
										<span className='d-flex align-items-center'>
											<span className='company'>
												XXX Company
											</span>
											<span className='status ms-3'>
												Active
											</span>
										</span>
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
										<span className='d-flex align-items-center'>
											<span className='company'>
												XXX Test centre
											</span>
											<span className='status ms-3'>
												Active
											</span>
										</span>
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
						{/* ========================================================
                                             Trip History 
                        ======================================================== */}
						<Tab eventKey='Trip History'>
							<div className='TripHistory'>
								<div className='tripHistoryFilter'>
									<input
										className='search'
										style={{ borderRadius: "8px" }}
										type='text'
										placeholder='&#128269; Search'
									/>
									<div className='d-flex align-items-center '>
										<div className='sortByDate'>
											<span
												style={{
													whiteSpace: "nowrap",
												}}>
												Sort by date
											</span>
											<FontAwesomeIcon
												icon={faAngleDown}
											/>
										</div>
										<div className='sortByCalendar ms-2'>
											<img
												src='/assets/truckDetailsSlideWindow/calendar.png'
												alt=''
												className='img-fluid'
											/>
											<span>Today</span>
											<FontAwesomeIcon
												icon={faAngleDown}
											/>
										</div>
									</div>
								</div>
								<div className='trips'>
									<div className='tripItem'>
										<div className='title'>
											VN Cosmetics
										</div>
										<div className='route'>
											Mumbai-Kerala via Pune
										</div>
										<div className='date'>
											Date: 25 Jun - 27 Jun 2022
										</div>
									</div>
									<div className='tripItem'>
										<div className='title'>
											The Walt Disney Company
										</div>
										<div className='route'>
											Mumbai-Kerala via Pune
										</div>
										<div className='date'>
											Date: 25 Jun - 27 Jun 2022
										</div>
									</div>
									<div className='tripItem'>
										<div className='title'>
											Johnson & Johnson
										</div>
										<div className='route'>
											Mumbai-Kerala via Pune
										</div>
										<div className='date'>
											Date: 25 Jun - 27 Jun 2022
										</div>
									</div>
									<div className='tripItem'>
										<div className='title'>McDonald's</div>
										<div className='route'>
											Mumbai-Kerala via Pune
										</div>
										<div className='date'>
											Date: 25 Jun - 27 Jun 2022
										</div>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</motion.div>
	);
}
