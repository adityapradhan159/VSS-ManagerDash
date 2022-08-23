import React from "react";
import { motion } from "framer-motion";
import "./ClientDetailsSlidingWindow.css";

export default function ClientDetailsSlidingWindow({ ClientDetailsAnimation }) {
	const handleClose = () => {
		ClientDetailsAnimation.start({
			x: 700,
			transition: {
				duration: 0.15,
			},
		});
	};
	return (
		<motion.div
			className='ClientDetailsSlidingWindow'
			initial={{
				x: 700,
				transition: {
					duration: 0.15,
				},
			}}
			animate={ClientDetailsAnimation}>
			<div className='d-flex align-items-center justify-content-between'>
				<div className='clientBasicInfo'>
					<div className='img'></div>
					<div className='d-flex flex-column'>
						<span className='name'>VN cosmetics</span>
						<span className='Status d-flex align-items-center '>
							<span className='viewAssociated'>
								view associated trucks
							</span>
							<span className='mx-2'>|</span>
							<span>
								{" "}
								<span className='text-info ms-2'>Active</span>
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
						style={{ cursor: "pointer" }}
						onClick={handleClose}
						src='/assets/DriverDetailsSlideWindow/times.png'
						alt=''
						className='img-fluid ms-4'
					/>
				</div>
			</div>
			<div className='mt-5 mb-3'>
				<div className='col my-3'>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Address
						</span>
						<span className='infoText'>
							Lorem ipsum hijawhgfsd idhfjksdfhshuirh uiwi78793987
						</span>
					</div>
				</div>
				<div className='row row-cols-2 my-3'>
					<div className='col-3'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								Registration City
							</span>
							<span className='infoText'>Chandigarh</span>
						</div>
					</div>
					<div className='col-3'>
						<div className='d-flex flex-column'>
							<span
								className='title'
								style={{ whiteSpace: "nowrap" }}>
								Registration State
							</span>
							<span className='infoText'>Chandigarh</span>
						</div>
					</div>
				</div>
				<div className='col my-3'>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Email
						</span>
						<span className='infoText'>rahul@vncosmetic.com</span>
					</div>
				</div>
			</div>
			<div className='d-flex align-items-center justify-content-between ContactpersonInfo'>
				<span className='label'>Contact person</span>
				<div className='d-flex align-items-center'>
					<span className='Contactperson'>Rajesh Kumar</span>

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
			<div className='ClientPanCard d-flex align-items-center justify-content-between my-3'>
				<div>
					<div className='sectionTitle'>Pan Card</div>
					<div className='proofId'>19798290101</div>
				</div>
				<div className='d-flex align-items-center'>
					<div className='box'></div>
				</div>
			</div>
		</motion.div>
	);
}
