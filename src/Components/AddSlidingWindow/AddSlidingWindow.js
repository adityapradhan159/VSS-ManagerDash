import React, { useState } from "react";
import "./AddSlidingWindow.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
	faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tab, Tabs } from "react-bootstrap";
export default function AddSlidingWindow({
	AddSlidingWindowAnimation,
	title,
	components,
	missing,
}) {
	const [key, setKey] = useState(1);
	const [submitFlag, setsubmitFlag] = useState(false);
	const handleCloseAddSlidingWindow = () => {
		AddSlidingWindowAnimation.start({
			x: 700,
			opacity: 0,
			transition: {
				duration: 0.15,
			},
		});
	};

	return (
		<motion.div
			className='AddSlidingWindow'
			style={{ zIndex: 600 }}
			initial={{ x: 700, opacity: 0 }}
			animate={AddSlidingWindowAnimation}>
			<div className=' d-flex flex-column h-100'>
				<div className='headNav '>
					<div className='d-flex align-items-center justify-content-between'>
						<span className='title'>Add {title}</span>
						<span
							style={{ cursor: "pointer" }}
							onClick={handleCloseAddSlidingWindow}
							className='CloseBtn'>
							<FontAwesomeIcon icon={faTimes} />
						</span>
					</div>
					<div className='d-flex align-items-center justify-content-end mt-2'>
						<span
							onClick={() => (key !== 1 ? setKey(key - 1) : "")}
							className={`PrevNextBtn secondary d-flex align-items-center ${
								key === 1 && "d-none"
							}`}>
							<span className='me-1 d-flex align-items-center'>
								<FontAwesomeIcon icon={faAngleLeft} />
							</span>
							<span>Previous</span>
						</span>
						{key !== components.length ? (
							<span
								onClick={() =>
									key !== components.length
										? setKey(key + 1)
										: ""
								}
								className='ms-3 PrevNextBtn d-flex align-items-center'>
								<span className='me-1'>Next</span>
								<span className='d-flex align-items-center'>
									<FontAwesomeIcon icon={faAngleRight} />
								</span>
							</span>
						) : (
							<span
								onClick={() => {}}
								className={`ms-3 PrevNextBtn d-flex align-items-center ${
									!submitFlag && "disabled"
								}`}>
								<span className=''>Submit</span>
							</span>
						)}
					</div>
				</div>
				<div className='tabControl d-flex '>
					{components.map((item, index) => (
						<div
							style={{ cursor: "pointer" }}
							onClick={() => setKey(index + 1)}
							className={`me-3 ${item.id === key && "active"}`}>
							{missing.includes(item.id) && item.id !== key ? (
								<div className='d-flex align-items-center'>
									<span>
										<img
											src='/assets/missingIcon.png'
											alt=''
											className='img-fluid'
										/>
									</span>
									<div className='missingTabTitle'>
										<span>{item.name}</span>
										<span>Missing details</span>
									</div>
								</div>
							) : (
								<>
									<div className='circle me-2'>
										{index + 1}
									</div>
									<span>{item.name}</span>
								</>
							)}
						</div>
					))}
				</div>
				<Tabs
					id='addWindow'
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className=''>
					{components.map((item, index) => {
						console.log(item);
						return (
							<Tab
								style={{ flex: 1, height: "100%" }}
								className='tabs'
								eventKey={index + 1}>
								{item.component}
							</Tab>
						);
					})}
				</Tabs>
			</div>
		</motion.div>
	);
}
