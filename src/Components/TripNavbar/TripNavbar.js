import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./TripNavbar.css";
import { motion, useAnimation } from "framer-motion";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import AddSlidingWindow from "../AddSlidingWindow/AddSlidingWindow";
// import RouteDetails from "./RouteDetails/RouteDetails";
import TripDetails from "./TripDetails/TripDetails";
import RouteDetails from "./RouteDetails/RouteDetails";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux-toolkit/LoginSlice";

export default function TripNavbar() {
	const [missing, setMissing] = useState([]);
	const [showProfileDropDown, setshowProfileDropDown] = useState(false);
	const [PrevActiveNav, setPrevActiveNav] = useState("dash");
	const { url, path } = useRouteMatch();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const navClick = (e) => {
		const prev = document.querySelector(`[data-link=${PrevActiveNav}]`);
		prev?.classList.remove("active");
		const current = e.currentTarget;
		current.classList.add("active");
		setPrevActiveNav(current.dataset.link);
		handleNavigation(e);
	};
	const AddSlidingWindowAnimation = useAnimation();
	const handleAddSlidingWindow = () => {
		AddSlidingWindowAnimation.start({
			width: 600,
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.1,
			},
		});
	};
	const missingCheck = (id, payload) => {
		console.log(id, payload);
		if (payload) {
			setMissing((prev) => {
				const newData = [id, ...prev];
				return newData;
			});
		} else {
			setMissing((prev) => {
				const newData = [...prev].filter((item) => item != id);
				console.log(newData);
				return newData;
			});
		}
	};
	const handleNavigation = (e) => {
		// const prev = document.querySelector(`[data-link=${PrevActiveNav}]`);
		// prev.classList.remove("active");
		const target = e.currentTarget;
		let link = target.dataset.link;
		link = link === "dash" ? "" : link;
		history.push(path + "/" + link);
		setshowProfileDropDown(false);
	};
	const SlidingWindowTabs = [
		{
			name: "Route details",
			id: 1,
			component: <RouteDetails />,
		},
		{
			name: "Trip details",
			id: 2,
			component: <TripDetails missingCheck={missingCheck} />,
		},
	];
	return (
		<>
			<div className='tripNavbar'>
				<div className='nav-left'>
					<div className='logo'>
						<img
							src='/assets/navlogo.png'
							className='img-fluid'
							alt=''
							srcset=''
						/>
					</div>
					<div className='nav-items'>
						<div
							data-link='dash'
							onClick={navClick}
							className='nav-links active'>
							<span className='nav-link-icon'>
								<img
									src='/assets/dashIcon.svg'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='text-uppercase'>Dashboard</span>
						</div>
						<div
							onClick={navClick}
							data-link='trucks'
							className='nav-links'>
							<span className='nav-link-icon'>
								<img
									src='/assets/truckIcon.svg'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='text-uppercase'>Trucks</span>
						</div>
						<div
							onClick={navClick}
							data-link='drivers'
							className='nav-links'>
							<span className='nav-link-icon'>
								<img
									src='/assets/driverIcon.svg'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='text-uppercase'>Drivers</span>
						</div>
						<div
							onClick={navClick}
							data-link='clients'
							className='nav-links'>
							<span className='nav-link-icon'>
								<img
									src='/assets/client.svg'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='text-uppercase'>Clients</span>
						</div>
					</div>
				</div>
				<div className='nav-right'>
					<div
						onClick={navClick}
						data-link='SOS'
						className='sosNotify'>
						<div className='sosBtn'>SOS LOGS</div>
					</div>
					<div
						onClick={handleAddSlidingWindow}
						className='planTripBtn'>
						<span
							className='text-capitalize'
							style={{ whiteSpace: "nowrap" }}>
							plan trip{" "}
						</span>
						<FontAwesomeIcon icon={faPlus} />
					</div>
					<div className='d-flex align-items-center position-relative'>
						<div
							style={{ cursor: "pointer" }}
							onClick={() =>
								setshowProfileDropDown(!showProfileDropDown)
							}
							className='position-relative d-flex align-items-center'>
							<div className='userIcon'>
								<img
									className='img-fluid'
									src='/assets/userIcon.png'
									alt=''
									srcset=''
								/>
							</div>
							<span
								className='userName'
								style={{ whiteSpace: "nowrap" }}>
								Hi! anubhav
							</span>
							<span>
								<FontAwesomeIcon icon={faAngleDown} />
							</span>
						</div>
						{showProfileDropDown && (
							<div className='profileDropDown'>
								<div className='d-flex align-items-center justify-content-evenly w-100 border-bottom py-2'>
									<div className='nameBox'>A</div>
									<div className='d-flex flex-column'>
										<span className='name'>Anubhav</span>
										<span className='designation'>
											Manager
										</span>
									</div>
								</div>
								<div
									onClick={() => {}}
									className='d-flex align-items-center  w-100 border-bottom p-2'>
									<img
										src='/assets/profileDropDown/user.png'
										alt=''
										className='img-fluid'
									/>
									<span className='DropDownItems'>
										{" "}
										my profile
									</span>
								</div>
								<div className='d-flex align-items-center  w-100 border-bottom p-2'>
									<img
										src='/assets/profileDropDown/Chat.png'
										alt=''
										className='img-fluid'
									/>
									<span
										onClick={navClick}
										data-link='MessageLogs'
										className='DropDownItems'>
										Message logs
									</span>
								</div>
								<div className='d-flex align-items-center  w-100 border-bottom p-2'>
									<img
										src='/assets/profileDropDown/logout.png'
										alt=''
										className='img-fluid'
									/>
									<span
										onClick={() =>
											dispatch(setLogin(false))
										}
										className='DropDownItems logout'>
										Logout
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<AddSlidingWindow
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				title='trip'
				components={SlidingWindowTabs}
				missing={missing}
			/>
		</>
	);
}
