import React from "react";
import "./PersonalDetailsTab.css";
export default function PersonalDetailsTab() {
	return (
		<div>
			<div className='addressDetails my-3'>
				<span className='sectionTitle '>Address Details</span>
				<div
					className='addressInfo row row-cols-4 gy-4    '
					style={{ marginTop: "1px" }}>
					<div className='col-6'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								Address Line 1
							</span>
							<span className='infoText'>
								2021, Sector 23 D, opp. Bank
							</span>
						</div>
					</div>
					<div className='col'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								City
							</span>
							<span className='infoText'>Chandigarh</span>
						</div>
					</div>
					<div className='col'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								State
							</span>
							<span className='infoText'>Chandigarh</span>
						</div>
					</div>
					<div className='col'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								Country
							</span>
							<span className='infoText'>India</span>
						</div>
					</div>
					<div className='col'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								Pin
							</span>
							<span className='infoText'>160047</span>
						</div>
					</div>
				</div>
			</div>
			<div className='emergencyContacts mt-4'>
				<span className='sectionTitle '>Emergency contacts</span>
				<div>
					<div className='d-flex align-items-center justify-content-between my-4'>
						<div className='name'>Mrs Kumar</div>
						<div className='d-flex align-items-center'>
							<img
								src='/assets/DriverDetailsSlideWindow/Chat.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/phone.png'
								alt=''
								className='img-fluid ms-4'
							/>
						</div>
					</div>
					<div className='d-flex align-items-center justify-content-between '>
						<div className='name'>Mrs Kumar</div>
						<div className='d-flex align-items-center'>
							<img
								src='/assets/DriverDetailsSlideWindow/Chat.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/phone.png'
								alt=''
								className='img-fluid ms-4'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
