import React, { useState } from "react";
import "./InactiveTrucksTable.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";

import { useAnimation } from "framer-motion";

import PermitSlidingWindow from "../PermitSlidingWindow/PermitSlidingWindow";
import TruckDetailsSlidingWindow from "../TruckDetailsSlidingWindow/TruckDetailsSlidingWindow";
import { useDispatch } from "react-redux";
import { handleCheck } from "../../../../../Redux-toolkit/selectedTableItemsSlice";
export default function InactiveTrucksTable({ activeTrip }) {
	const [ClickedTruckId, setClickedTruckId] = useState(null);
	const dispatch = useDispatch();
	const PermitAnimatinoSlide = useAnimation();
	const handlePermitOpen = () => {
		PermitAnimatinoSlide.start({
			x: 0,
			transition: {
				duration: 0.15,
			},
		});
	};
	const TruckDetailsAnimation = useAnimation();
	const handleTruckDetailsOpen = (e) => {
		console.log(e.currentTarget.dataset.id, activeTrip);
		setClickedTruckId(e.currentTarget.dataset.id);
		TruckDetailsAnimation.start({
			x: 0,
			transition: {
				duration: 0.15,
			},
		});
	};
	// const checkStateChange = (item) => {
	// 	const target = item;
	// 	const isChecked = JSON.parse(target.dataset.checked);
	// 	if (!isChecked) {
	// 		console.log(isChecked, target);
	// 		target.setAttribute("src", "/assets/checkBoxChecked.png");
	// 		target.dataset.checked = "true";
	// 		return;
	// 	}
	// 	target.setAttribute("src", "/assets/checkBoxUnChecked.png");
	// 	target.dataset.checked = "false";
	// };
	// const handleCheck = (e) => {
	// 	const target = e.currentTarget;
	// 	const type = target.dataset.checkbox;
	// 	if (type === "all") {
	// 		checkStateChange(target);
	// 		const allCheckBox = document.querySelectorAll(
	// 			".inactive_individualCheckbox"
	// 		);
	// 		allCheckBox.forEach((item) => {
	// 			const isChecked = JSON.parse(target.dataset.checked);
	// 			if (isChecked) {
	// 				item.dataset.checked = "false";
	// 			} else item.dataset.checked = "true";
	// 			checkStateChange(item);
	// 		});
	// 		return;
	// 	}
	// 	checkStateChange(target);
	// };
	const checkboxHandle = (e) => {
		dispatch(handleCheck([e, "Inactive_individualCheckbox"]));
	};
	return (
		<div className=''>
			{/* <PermitSlidingWindow PermitAnimatinoSlide={PermitAnimatinoSlide} /> */}
			<TruckDetailsSlidingWindow
				truckDetails={activeTrip?.tableData[ClickedTruckId]}
				TruckDetailsAnimation={TruckDetailsAnimation}
			/>
			<Table responsive striped hover className='table-borderless'>
				<thead>
					<tr>
						<th>
							{/* <input
								className='largerCheckbox'
								type='checkbox'
								name=''
								id=''
							/> */}
							<span>
								<img
									onClick={checkboxHandle}
									data-checkboxid='all'
									data-checked={false}
									src='/assets/checkBoxUnChecked.png'
									alt=''
									className='img-fluid Inactive_individualCheckbox'
								/>
							</span>
						</th>
						{activeTrip?.tableHeads.map((item, index) => (
							<th key={index}>
								<div className='d-flex align-items-start'>
									<span
										style={{ whiteSpace: "pre-line" }}
										className='me-2 d-flex align-items-start'>
										{item}
									</span>
									<span>
										<FontAwesomeIcon icon={faAngleDown} />
									</span>
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{activeTrip?.tableData.map((item, id) => (
						<tr>
							<td style={{ verticalAlign: "middle" }}>
								{/* <input
									className='largerCheckbox'
									type='checkbox'
									name=''
									id={"checkbox-" + id}
								/> */}
								<span>
									<img
										onClick={checkboxHandle}
										data-checkboxid={id}
										data-checked={false}
										src='/assets/checkBoxUnChecked.png'
										alt=''
										className='img-fluid Inactive_individualCheckbox'
									/>
								</span>
							</td>
							{Object.entries(item).map(([key, value], index) => (
								<td
									key={index}
									style={{ verticalAlign: "middle" }}>
									<span className='d-flex align-items-center'>
										{(function () {
											switch (key) {
												case "Truck Details":
													return (
														<div className='d-flex flex-column'>
															<span
																className='links'
																data-id={id}
																onClick={
																	handleTruckDetailsOpen
																}
																href='#'>
																{value.License}
															</span>
															<div className='d-inline-block mt-2'>
																{value.company}
															</div>
														</div>
													);
												case "permit":
													return (
														<>
															<span
																style={{
																	cursor: "pointer",
																}}
																onClick={
																	handlePermitOpen
																}
																className='viewPermit'>
																{value}
															</span>
														</>
													);
												case "Status":
													return (
														<>
															<span className='me-2'>
																<img
																	src={
																		value.icon
																	}
																	alt=''
																	className='img-fluid'
																/>
															</span>
															<span
																className={`${
																	value.type ==
																		"Emergency" &&
																	"text-danger"
																} ${
																	value.type ==
																		"Driving" &&
																	"text-success"
																} ${
																	value.type ==
																		"stopped" &&
																	"text-secondary"
																} ${
																	value.type ==
																		"Action Req." &&
																	"text-warning"
																}`}>
																{value.type}
															</span>
														</>
													);
												case "Registration":
													return (
														<div>
															<div className=''>
																{value.State}
															</div>
															<div>
																{value.City}
															</div>
														</div>
													);
												default:
													return value;
											}
										})()}
									</span>
								</td>
							))}

							<td
								style={{
									verticalAlign: "middle",
									width: "max-content",
									display: "table-cell",
								}}
								className='align-items-center text-dark'>
								<span className='actionIcons'>
									<img
										src='/assets/editPencil.png'
										alt=''
										className='img-fluid'
									/>
								</span>
								<span className='actionIcons'>
									<img
										src='/assets/location.png'
										alt=''
										className='img-fluid'
									/>
								</span>
								{item.Status.type == "Emergency" && (
									<span className='sosLog'>SOS LOGS</span>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}
