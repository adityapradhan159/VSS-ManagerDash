import React, { useState } from "react";
import { motion } from "framer-motion";
import "./DriverDetailsSlidingWindow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SlideWindow from "../../../../TripSidebarAndSlide/SlideWindow/SlideWindow";
import { Tab, Tabs } from "react-bootstrap";
import PersonalDetailsTab from "./PersonalDetailsTab/PersonalDetailsTab";
import DocumentsTab from "./DocumentsTab/DocumentsTab";
import TripHistory from "./TripHistory/TripHistory";
import BankDetails from "./BankDetails/BankDetails";

export default function DriverDetailsSlidingWindow({
	driverDetailsAnimation,
	driverDetails,
}) {
	const [key, setKey] = useState("Personal Details");
	// console.log(driverDetails);
	const handleClose = () => {
		driverDetailsAnimation.start({
			x: 700,
			transition: {
				duration: 0.15,
			},
		});
	};

	return (
		<motion.div
			className='DriverDetailsSlidingWindow'
			initial={{
				x: 700,
			}}
			animate={driverDetailsAnimation}>
			<div className='sliderWrapper h-100'>
				<div className='topLevel'>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='driverBasicInfo'>
							<div className='img'></div>
							<div className='d-flex flex-column'>
								<span className='name'>Rajesh Kumar</span>
								<span className='timeStatus d-flex align-items-center '>
									<span className='time'>
										2:00 AM 24 Jan 2022
									</span>
									<span className='mx-2'>|</span>
									<span>
										{" "}
										<img
											src='/assets/DriverDetailsSlideWindow/car.png'
											alt=''
											className='img-fluid'
										/>{" "}
										<span className='text-info ms-2'>
											Driving
										</span>
									</span>
								</span>
							</div>
						</div>
						<div className='d-flex align-items-center'>
							<img
								src='/assets/DriverDetailsSlideWindow/editor.png'
								alt=''
								className='img-fluid ms-4'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/delete.png'
								alt=''
								className='img-fluid ms-4'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/more-vertical.png'
								alt=''
								className='img-fluid ms-4'
							/>
							<img
								style={{ cursor: "pointer" }}
								onClick={handleClose}
								src='/assets/DriverDetailsSlideWindow/times.png'
								alt=''
								className='img-fluid ms-4'
							/>
						</div>
					</div>
					<div className='driverDetailsInfo row row-cols-4 g-4 my-3'>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Age
								</span>
								<span className='infoText'>36 years</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Gender
								</span>
								<span className='infoText'>Male</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Phone number
								</span>
								<span className='infoText'>9872514623</span>
							</div>
						</div>
						<div className='col'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Blood Group
								</span>
								<span className='infoText'>O+</span>
							</div>
						</div>
						<div className='col-6'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									License Number
								</span>
								<span className='infoText'>
									MH-12-2009-0033020
								</span>
							</div>
						</div>
						<div className='col-6'>
							<div className='d-flex flex-column'>
								<span
									className='title'
									style={{ whiteSpace: "nowrap" }}>
									Preferred Langauge
								</span>
								<span className='infoText'>Hindi</span>
							</div>
						</div>
					</div>
				</div>
				{/* ==============================================================
                                    Tab contents
            ============================================================== */}
				<div className='my-2 bottomTabs'>
					<div>
						<ul className='mb-2 nav nav-tabs' role='tablist'>
							{[
								"Personal Details",
								"Documents",
								"Bank Details",
								"Trip History",
							].map((item, index) => {
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
							})}
						</ul>
					</div>
					<Tabs
						id='controlled-tab-driverDetails'
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className='mb-3'>
						{/* ========================================================
                                          Personal Details
                        ======================================================== */}
						<Tab eventKey='Personal Details'>
							<div className='PersonalDetails'>
								<PersonalDetailsTab />
							</div>
						</Tab>
						{/* ========================================================
                                            Documents
                        ======================================================== */}
						<Tab eventKey='Documents'>
							<div className='Documents'>
								<DocumentsTab />
							</div>
						</Tab>
						{/* ========================================================
                                           Bank Details
                        ======================================================== */}
						<Tab eventKey='Bank Details'>
							<div className='BankDetails'>
								<BankDetails />
							</div>
						</Tab>
						{/* ========================================================
                                             Trip History 
                        ======================================================== */}
						<Tab eventKey='Trip History'>
							<TripHistory />
						</Tab>
					</Tabs>
				</div>
			</div>
		</motion.div>
	);
}
