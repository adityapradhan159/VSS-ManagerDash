import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./TripHistory.css";
export default function TripHistory() {
	return (
		<div>
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
							<FontAwesomeIcon icon={faAngleDown} />
						</div>
						<div className='sortByCalendar ms-2'>
							<img
								src='/assets/truckDetailsSlideWindow/calendar.png'
								alt=''
								className='img-fluid'
							/>
							<span>Today</span>
							<FontAwesomeIcon icon={faAngleDown} />
						</div>
					</div>
				</div>
				<div className='trips'>
					<div className='tripItem'>
						<div>
							<div className='title'>VN Cosmetics</div>
							<div className='company'>VN Cosmetics</div>
							<div className='route'>Mumbai-Kerala via Pune</div>
							<div className='date'>
								Date: 25 Jun - 27 Jun 2022
							</div>
						</div>
						<div className='d-flex align-items-center my-2'>
							<img
								src='/assets/DriverDetailsSlideWindow/eye.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/download.png'
								alt=''
								className='img-fluid ms-3'
							/>
						</div>
					</div>
					<div className='tripItem'>
						<div>
							<div className='title'>The Walt Disney Company</div>
							<div className='company'>
								The Walt Disney Company
							</div>
							<div className='route'>Mumbai-Kerala via Pune</div>
							<div className='date'>
								Date: 25 Jun - 27 Jun 2022
							</div>
						</div>
						<div className='d-flex align-items-center my-2'>
							<img
								src='/assets/DriverDetailsSlideWindow/eye.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/download.png'
								alt=''
								className='img-fluid ms-3'
							/>
						</div>
					</div>
					<div className='tripItem'>
						<div>
							<div className='title'>Johnson & Johnson</div>
							<div className='company'>Johnson & Johnson</div>
							<div className='route'>Mumbai-Kerala via Pune</div>
							<div className='date'>
								Date: 25 Jun - 27 Jun 2022
							</div>
						</div>
						<div className='d-flex align-items-center my-2'>
							<img
								src='/assets/DriverDetailsSlideWindow/eye.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/download.png'
								alt=''
								className='img-fluid ms-3'
							/>
						</div>
					</div>
					<div className='tripItem'>
						<div>
							<div className='title'>McDonald's</div>
							<div className='company'>McDonald's</div>
							<div className='route'>Mumbai-Kerala via Pune</div>
							<div className='date'>
								Date: 25 Jun - 27 Jun 2022
							</div>
						</div>
						<div className='d-flex align-items-center my-2'>
							<img
								src='/assets/DriverDetailsSlideWindow/eye.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/download.png'
								alt=''
								className='img-fluid ms-3'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
