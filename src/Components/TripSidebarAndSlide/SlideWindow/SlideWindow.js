import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./SlideWindow.css";
export default function SlideWindow() {
	const [key, setKey] = useState("Personal Details");
	return (
		<div className='slideWindow'>
			<div className='slideWindow-hearder d-flex align-items-center justify-content-between'>
				<div className='slideWindow-header-left'>
					<span style={{ marginRight: "24px" }}>
						<img
							src='/assests/angleleft.svg'
							alt=''
							className='img-fluid'
						/>
					</span>
					<div className='d-flex align-items-center'>
						<div className='userImage'></div>
						<div className='d-flex flex-column'>
							<span className='driverName'>Rajesh Kumar</span>
							<span className='d-flex align-items-center'>
								<img
									src='/assests/truckBlue.svg'
									alt=''
									className='img-fluid me-2'
								/>
								<span className='text-info'>Available</span>
							</span>
						</div>
					</div>
				</div>
				<div className='slideWindow-header-right'>
					<span style={{ marginRight: "39px" }}>
						<img
							src='/assests/editPen.svg'
							alt=''
							className='img-fluid'
						/>
					</span>
					<span style={{ marginRight: "39px" }}>
						<img
							src='/assests/trash.svg'
							alt=''
							className='img-fluid'
						/>
					</span>
					<span>
						<img
							src='/assests/markerLocation.svg'
							alt=''
							className='img-fluid'
						/>
					</span>
				</div>
			</div>
			<div className='slideWindow-driver-details'>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						Age
					</label>
					<div className='title'>36 years</div>
				</div>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						Gender
					</label>
					<div className='title'>Male</div>
				</div>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						Phone number
					</label>
					<div className='title'>9872514623</div>
				</div>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						Blood Group
					</label>
					<div className='title'>O+</div>
				</div>
			</div>
			<div className='slideWindow-truck-details'>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						License Number
					</label>
					<div className='title'>MH-12-2009-0033020</div>
				</div>
				<div className='d-flex flex-column'>
					<label htmlFor='' className='label'>
						Preferred Langauge
					</label>
					<div className='title'>Hindi</div>
				</div>
			</div>
			<div className='slideWindowTabs'>
				<Tabs
					id='controlled-tab-example'
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className='mb-3'>
					<Tab eventKey='Personal Details' title='Personal Details'>
						<div className='personalDetails'>
							<div className='address-details'>
								<span className='address-details-title'>
									Address Details
								</span>
								<div className='address-info'>
									<div className='d-flex flex-column'>
										<label htmlFor='' className='label'>
											Address Line 1
										</label>
										<div className='title'>
											2021, Sector 23 D, opp. Bank
										</div>
									</div>
									<div className='d-flex flex-column'>
										<label htmlFor='' className='label'>
											City
										</label>
										<div className='title'>Chandigarh</div>
									</div>
									<div className='d-flex flex-column'>
										<label htmlFor='' className='label'>
											State
										</label>
										<div className='title'>Chandigarh</div>
									</div>
								</div>
							</div>
							<div className='country-details'>
								<div className='d-flex flex-column'>
									<label htmlFor='' className='label'>
										Country
									</label>
									<div className='title'>India</div>
								</div>
								<div className='d-flex flex-column'>
									<label htmlFor='' className='label'>
										Pin
									</label>
									<div className='title'>160047</div>
								</div>
							</div>
						</div>
						<div className='emergency-contacts'>
							<span className='emergency-title'>
								Emergency contacts
							</span>
							<div style={{ marginTop: "15px" }}>
								{[1, 2].map((item, index) => (
									<div
										key={index}
										style={{ marginBottom: "30px" }}
										className='d-flex align-items-center justify-content-between'>
										<span className='name'>Mrs Kumar</span>
										<div className='phoneChatIcons'>
											<span
												className=''
												style={{ marginRight: "46px" }}>
												<img
													src='/assests/ChatIcon.svg'
													alt=''
													className='img-flui'
												/>
											</span>
											<span>
												<img
													src='/assests/phone.svg'
													alt=''
													className='img-flui'
												/>
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</Tab>

					<Tab eventKey='Bank Details' title='Bank Details'>
						2
					</Tab>
					<Tab eventKey='Documents' title='Documents'>
						2
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
