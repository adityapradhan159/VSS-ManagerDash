import React from "react";
import "./SosLogs.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
export default function SosLogs({ SosvehicleId, AddSlidingWindowAnimation }) {
	const handleCloseAddSlidingWindow = () => {
		AddSlidingWindowAnimation.start({
			x: 700,
			transition: {
				duration: 0.15,
			},
		});
	};
	return (
		<motion.div
			initial={{
				x: 700,
				transition: {
					duration: 0.15,
				},
			}}
			animate={AddSlidingWindowAnimation}
			className='sosSlidingWindow'>
			<div className='py-3 border-bottom'>
				<div className='d-flex align-items-start justify-content-between'>
					<div className=''>
						<h5 className='fw-bold'>{SosvehicleId}</h5>
						<div className='d-flex aling-items-center'>
							<span>VN Cosmetics</span>
							<span className='mx-2'>|</span>
							<span>
								<span className='text-danger d-flex align-items-center'>
									<img
										src='/assets/alarm.png'
										alt=''
										className='img-fluid'
									/>
									<span className='mx-2'>Emergency</span>
								</span>
							</span>
						</div>
					</div>

					<span
						style={{ cursor: "pointer" }}
						onClick={handleCloseAddSlidingWindow}>
						<img
							// style={{ cursor: "pointer" }}
							// onClick={handleCloseAddSlidingWindow}
							src='/assets/truckDetailsSlideWindow/times.png'
							alt=''
							className='img-fluid '
						/>
					</span>
				</div>
				<div className='d-flex justify-content-end'>
					<div className='d-flex align-items-center justify-content-end'>
						<span className='text-secondary slideText me-2'>
							Update 5 min ago
						</span>
						<span className='btn btn-outline-dark slideText d-flex align-items-center justify-content-between'>
							<span className='me-2'>Refresh</span>
							<FontAwesomeIcon icon={faRefresh} />
						</span>
					</div>
				</div>
			</div>
			<div className='py-3'>
				{[1, 1, 1].map((item, ind) => {
					return (
						<div className='my-3 d-flex align-items-start'>
							<span>
								<img
									src='/assets/phone.svg'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='mx-4 sostime'>06:30</span>
							<div className='d-flex flex-column'>
								<span className='sosType mb-1'>
									Repaire service done
								</span>
								<span className='associateCompany mb-1'>
									Ayan towing service
								</span>
								<span className='road mb-1'>
									Delhi- Mumbai Highway
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
