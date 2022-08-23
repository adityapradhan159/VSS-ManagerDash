import {
	faPlus,
	faPlusCircle,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";
import "./TrucksPermits.css";
export default function TrucksPermits() {
	const [routes, setRoutes] = useState({
		tableHead: ["From", "to", "via", "action"],
		tableBody: [],
	});
	const [routeForm, setSetRouteForm] = useState({
		from: "",
		to: "",
		via: "",
	});
	const [formShow, setformShow] = useState(false);
	const addRoutes = () => {
		const total = Object.values(routeForm).filter((item) => item !== "");
		console.log(total);
		if (total.length === 3) {
			setRoutes((prev) => {
				const newData = { ...prev };
				newData.tableBody = [routeForm, ...newData.tableBody];
				console.log(newData);
				return newData;
			});
			setSetRouteForm({
				from: "",
				to: "",
				via: "",
			});
			document.querySelectorAll(".routeInput").forEach((item) => {
				item.value = "";
			});
			setformShow(false);
		}
	};
	const handleRouteAdd = (e) => {
		console.log(e.currentTarget.name, e.currentTarget.value);
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setSetRouteForm((prev) => {
			const NewData = { ...prev };
			NewData[name] = value;
			return NewData;
		});
	};
	return (
		<div className='pb-4'>
			<div className='d-flex align-item-center justify-content-end'>
				<div className='addPermitBtn'>
					<span>Add permit</span>
					<span className=''>
						<FontAwesomeIcon icon={faPlus} />
					</span>
				</div>
			</div>

			{/* ================================================
                            Add new permit form START
            ================================================ */}
			<div>
				<div>
					<div>
						<label htmlFor=''>Permits</label>
					</div>
					<div className='row row-cols-2 mb-2'>
						<div className='col'>
							<NormalInputs
								required={true}
								placeholder='Permit Number'
								label='Permit Number'
								onBlur={() => {}}
							/>
						</div>
						<div className='col'>
							<NormalInputs
								required={true}
								placeholder='Permit Holder Name'
								label='Permit Holder Name'
								onBlur={() => {}}
							/>
						</div>
					</div>
					<div className='row row-cols-2 mb-2'>
						<div className='col'>
							<NormalInputs
								required={false}
								placeholder='Fathers Name'
								label='Fathers Name'
								onBlur={() => {}}
							/>
						</div>
					</div>
					<div className='row row-cols-2 mb-2'>
						<div className='col'>
							<DateInputs
								type='date'
								required={true}
								placeholder='Valid from'
								label='Valid from'
								onBlur={() => {}}
							/>
						</div>
						<div className='col'>
							<DateInputs
								type='date'
								required={true}
								placeholder='Valid Till'
								label='Valid Till'
								onBlur={() => {}}
							/>
						</div>
					</div>
					<div className='row row-cols-1 mb-2'>
						<div className='col'>
							<NormalInputs
								required={true}
								placeholder='Address'
								label='Address'
								onBlur={() => {}}
							/>
						</div>
					</div>
					<div className='row row-cols-2 mb-2'>
						<div className='col'>
							<NormalInputs
								required={true}
								placeholder='Permit Holder Name'
								label='Permit Holder Name'
								onBlur={() => {}}
							/>
						</div>
						<div className='col'>
							<UploadInput
								label='Upload Permit'
								required={true}
							/>
						</div>
					</div>
				</div>
				<div>
					<div className='d-flex align-items-center justify-content-between my-3'>
						<label htmlFor=''>Route details</label>
						<div
							className='addRoute'
							style={{ cursor: "pointer" }}
							onClick={() => setformShow(!formShow)}>
							<span>
								<FontAwesomeIcon icon={faPlusCircle} />
							</span>
							<span className='ms-2'>Add a Route</span>
						</div>
					</div>
					<div
						className={`${
							formShow ? "d-flex " : "d-none "
						}align-items-end justify-content-between routeForm`}>
						<div className='row row-cols-3 gx-2 '>
							<div className='col'>
								<NormalInputs
									className='routeInput'
									required={false}
									label='from'
									placeholder={"Enter a Source"}
									onBlur={handleRouteAdd}
								/>
							</div>
							<div className='col'>
								<NormalInputs
									className='routeInput'
									required={false}
									label='to'
									placeholder={"Enter a Destination"}
									onBlur={handleRouteAdd}
								/>
							</div>
							<div className='col'>
								<NormalInputs
									className='routeInput'
									required={false}
									label='via'
									placeholder={"Enter a Name"}
									onBlur={handleRouteAdd}
								/>
							</div>
						</div>
						<div
							style={{ cursor: "pointer" }}
							onClick={addRoutes}
							className='routeAddBtn '>
							<FontAwesomeIcon icon={faAngleRight} />
						</div>
                    </div>
                    
					{/* ================================================
                            Add new route form START
            ================================================ */}
                    
					<div className='trucksPermitsTable my-3'>
						<Table borderless hover variant='white'>
							<thead>
								<tr>
									{routes.tableHead.map((headName, index) => {
										return <th>{headName}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{routes.tableBody?.map((item, index) => {
									return (
										<tr>
											<td>{item.from}</td>
											<td>{item.to}</td>
											<td>{item.via}</td>
											<td>
												<span className='me-4'>
													<img
														src='/assets/pen.svg'
														alt=''
														className='img-fluid'
													/>
												</span>
												<span>
													<img
														src='/assets/trashCan.svg'
														alt=''
														className='img-fluid'
													/>
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
                    </div>
                    
					{/* ================================================
                            Add new route form END
            ================================================ */}
                    
                </div>
                
				{/* ================================================
                            Add new permit form END
            ================================================ */}
				<div>
					<div className='saveBtn'>Save</div>
				</div>
			</div>
		</div>
	);
}
