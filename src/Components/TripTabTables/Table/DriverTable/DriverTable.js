import React from "react";
import "./DriverTable.css";
import {
	faAngleDown,
	faCommenting,
	faMapMarkerAlt,
	faPencil,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import DriverDetailsSlidingWindow from "./DriverDetailsSlidingWindow/DriverDetailsSlidingWindow";
import { useAnimation } from "framer-motion";
import { useDispatch } from "react-redux";
import { handleCheck } from "../../../../Redux-toolkit/selectedTableItemsSlice";
export default function DriverTable({ activeTrip }) {
	const driverDetailsAnimation = useAnimation();
	const dispatch = useDispatch();
	const handleDriverDetailsSlideOpen = () => {
		driverDetailsAnimation.start({
			x: 0,
			transition: {
				duration: 0.15,
			},
		});
	};
	const checkboxHandle = (e) => {
		dispatch(handleCheck([e, "Occupied_individualCheckbox"]));
	};
	return (
		<div>
			<DriverDetailsSlidingWindow
				driverDetailsAnimation={driverDetailsAnimation}
				driverDetails={activeTrip}
			/>
			<Table striped responsive hover className='table-borderless'>
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
									className='img-fluid Occupied_individualCheckbox'
								/>
							</span>
						</th>
						{activeTrip?.tableHeads.map((item, index) => (
							<th key={index}>
								<span className='me-2'>{item}</span>{" "}
								<FontAwesomeIcon icon={faAngleDown} />
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
									id={index}
								/> */}
								<span>
									<img
										onClick={checkboxHandle}
										data-checkboxid={id}
										data-checked={false}
										src='/assets/checkBoxUnChecked.png'
										alt=''
										className='img-fluid Occupied_individualCheckbox'
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
												case "Driver Name":
													return (
														<span
															onClick={
																handleDriverDetailsSlideOpen
															}>
															<img
																alt=''
																src='/assets/user.png'
																className='img-fluid'
															/>
															<span
																style={{
																	cursor: "pointer",
																}}
																className='text-info'>
																{value}
															</span>
														</span>
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
										src='/assets/chat.svg'
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
