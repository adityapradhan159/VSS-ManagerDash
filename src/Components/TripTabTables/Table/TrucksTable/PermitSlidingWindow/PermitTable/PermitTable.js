import React from "react";
import { Table } from "react-bootstrap";
import "./PermitTable.css";
export default function PermitTable({ tableHeads, permit }) {
	const handlingStatus = (date) => {
		const till = new Date(date);
		const now = new Date();
		console.log(till, now);
		if (till.getTime() > now.getTime())
			return <span className='text-white activePermit'>Active</span>;
		else return <span className='text-white expiredPermit'>Expired</span>;
		// return now.toUTCString();
	};
	return (
		<Table responsive hover className='table-borderless'>
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
					{tableHeads.map((item, index) => (
						<th key={index}>{item}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{permit.map((item, index) => (
					<tr>
						<td style={{ verticalAlign: "middle" }}>
							<input
								className='largerCheckbox'
								type='checkbox'
								name=''
								id={index}
							/>
						</td>
						{Object.entries(item).map(([key, value], index) => {
							if (key === "permitUpload") return <></>;
							return (
								<td
									key={index}
									style={{ verticalAlign: "middle" }}>
									<span className='d-flex align-items-center'>
										{(function () {
											switch (key) {
												case "Permit Number":
													return (
														<span className='permitNo'>
															{value}
														</span>
													);

												case "driverDetails":
													return (
														<div className='d-flex align-items-center justify-content-between'>
															<span>
																{value.name}
															</span>
															<div>
																<span className='mx-4'>
																	<img
																		src='/assets/ChatIcon.svg'
																		alt=''
																		className='img-fluid'
																	/>
																</span>
																<span>
																	<img
																		src='/assets/phone.svg'
																		alt=''
																		className='img-fluid'
																	/>
																</span>
															</div>
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
															{value ==
															"Emergency" ? (
																<div className='viewSOS'>
																	<span>
																		View SOS
																		Logs
																	</span>
																</div>
															) : (
																<span>
																	No action
																</span>
															)}
														</td>
													);
												default:
													return value;
											}
										})()}
									</span>
								</td>
							);
						})}
						<td>{handlingStatus(item["Valid Till"])}</td>
						<td>
							<span className='me-3'>
								<img
									src='/assets/eye.png'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='me-3'>
								<img
									src='/assets/download.png'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='me-3'>
								<img
									src='/assets/editIcon.png'
									alt=''
									className='img-fluid'
								/>
							</span>
							<span className='me-3'>
								<img
									src='/assets/delete.png'
									alt=''
									className='img-fluid'
								/>
							</span>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
