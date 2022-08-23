import React, { useState } from "react";
import "./activeCards.css";

const ActiveCards = ({ item, storeActiveId, storeActiveClientId }) => {
	const [showPhoneNumber, setShowPhoneNumber] = useState(false);

	const handleActiveId = (id) => {
		storeActiveId(id);
	};

	const handleActiveClientId = (id) => {
		storeActiveClientId(id);
	};

	const handleShowPhoneNo = () => {
		setShowPhoneNumber(!showPhoneNumber);
	};

	return (
		<div
			style={
				item.status == "alert"
					? { backgroundColor: "#FFEFEF" }
					: { backgroundColor: " " }
			}
			className='ActiveCards'
			onClick={() => handleActiveId(item.id, item)}>
			<div className='ActiveCard-container'>
				<div className='main-icon'>
					<div className='mainIconContainer'>
						<img src={item.icon} alt='' />
					</div>
				</div>

				<div className='ActiveTripDetails'>
					<div className='activeTripName'>
						<span
							style={
								item.status == "alert"
									? { color: "#FF0000",textDecoration:"underline" }
									: item.status == "driving"
									? { color: "#44B49C",textDecoration:"underline" }
									: item.status == "warning"
									? { color: "#E78911",textDecoration:"underline" }
									: { color: "" }
							}>
							{item.name}
						</span>
					</div>
					<div
						className='companyName'
						onClick={() => handleActiveClientId(item.id)}>
						<p style={{textDecoration:"underline"}}>
							{" "}
							{item.company[0].company1} + {item.company.length}{" "}
							others{" "}
						</p>
					</div>
					<div className='route'>
						<p>{item.route}</p>
					</div>
					<div className='person'>
						<div className='person-img'>
							<img src='' alt='' />
						</div>
						<p style={{textDecoration:"underline"}}>{item.person}</p>
					</div>
				</div>

				<div className='tripContact'>
					{/* ----------Contact Icons--------- */}
					<div className='tripContact-icons'>
						<div
							className='call'
							onClick={() => handleShowPhoneNo()}>
							<img src='/images/phone.svg' alt='' />
							<div
								className='customerPhoneNo'
								style={{
									display: showPhoneNumber ? "flex" : "none",
								}}>
								<div className='triangleDiv'></div>
								{item.phoneNo}
							</div>
						</div>

						<div className='message'>
							<img src='/images/Chat.svg' alt='' />
						</div>
						<div className='menu'>
							<img src='/images/verticalMenu.svg' alt='' />
						</div>
					</div>

					{/* ----------SOS Button---------- */}

					{item.status == "alert" ? (
						<button
							style={{
								backgroundColor: "#BB0606",
								color: "white",
							}}
							className='sos-btn'>
							View SOS Logs
						</button>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default ActiveCards;
