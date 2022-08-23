import React, { useState } from "react";
import "./SosTable.css";
import {
	faAngleDown,
	faCommenting,
	faMapMarkerAlt,
	faPencil,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import SosLogs from "../../../Sos/SosLogs/SosLogs";
import { useAnimation } from "framer-motion";
export default function SosTable({ activeTrip }) {
	const [SosvehicleId, setSosvehicleId] = useState(null);
	const AddSlidingWindowAnimation = useAnimation();
	const handleAddSlidingWindow = (vehicleId) => {
		setSosvehicleId(vehicleId);
		AddSlidingWindowAnimation.start({
			x: 600,
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.1,
			},
		});
	};
	return (
		<>
			<SosLogs
				SosvehicleId={SosvehicleId}
				AddSlidingWindowAnimation={AddSlidingWindowAnimation}
				// title='truck'
			/>
			<Table striped responsive hover className='table-borderless'>
				<thead>
					<tr>
						<th>
							<input
								className='largerCheckbox'
								type='checkbox'
								name=''
								id=''
							/>
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
					{activeTrip?.tableData.map((item, index) => (
						<tr>
							<td style={{ verticalAlign: "middle" }}>
								<input
									className='largerCheckbox'
									type='checkbox'
									name=''
									id={index}
								/>
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
															<a href='#'>
																{value.License}
															</a>
															<div className='d-inline-block mt-2'>
																{value.company}
															</div>
														</div>
													);
												case "Status":
													return (
														<>
															{value.type ==
																"Emergency" && (
																<>
																	<span className='me-2 d-flex align-items-center'>
																		<img
																			src={
																				value.icon
																			}
																			alt=''
																			className='img-fluid'
																		/>
																	</span>
																	<span className='text-danger'>
																		{
																			value.type
																		}
																	</span>
																</>
															)}
															{value.type ==
																"Action req." && (
																<>
																	<span className='me-2 d-flex align-items-center'>
																		<img
																			src={
																				value.icon
																			}
																			alt=''
																			className='img-fluid'
																		/>
																	</span>
																	<span className='text-warning'>
																		{
																			value.type
																		}
																	</span>
																</>
															)}
														</>
													);

												case "driverDetails":
													return (
														<div className='d-flex align-items-center justify-content-between'>
															<span>
																{value.name}
															</span>
														</div>
													);
												case "action":
													return (
														<td
															style={{
																verticalAlign:
																	"middle",
																width: "max-content",
																display:
																	"table-cell",
															}}
															className='align-items-center text-dark'>
															<div
																className='d-flex align-items-center '
																style={{
																	gap: "13px",
																}}>
																{value ==
																	"Emergency" && (
																	<div
																		onClick={() =>
																			handleAddSlidingWindow(
																				item[
																					"Truck Details"
																				]
																					.License
																			)
																		}
																		className='viewSOS'>
																		<span>
																			SOS
																			LOGS
																		</span>
																	</div>
																)}
																<div
																	className='d-flex align-items-center'
																	style={{
																		gap: "16px",
																	}}>
																	<span className='d-inline-block'>
																		<img
																			src='/assets/ChatIcon.svg'
																			alt=''
																			className='img-fluid'
																		/>
																	</span>
																	<span className='d-inline-block'>
																		<img
																			src='/assets/phone.svg'
																			alt=''
																			className='img-fluid'
																		/>
																	</span>
																</div>
															</div>
														</td>
													);
												default:
													return value;
											}
										})()}
									</span>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
