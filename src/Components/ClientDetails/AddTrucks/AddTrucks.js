import React, { useState } from "react";
import "./AddTrucks.css";
import { NormalInputs } from "../../ModularComponents/Inputs/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { setClientTruck } from "../../../Redux-toolkit/AddClientSlice";

export default function AddTrucks() {
	const { allMarkers } = useSelector((state) => state.allMarkers);
	const [selected, setselected] = useState([]);
	const [vehicles, SetVehicles] = useState(allMarkers);
	const dispatch = useDispatch();
	console.log(vehicles);
	const handleAdd = (index) => {
		const data = [...selected, index];
		dispatch(setClientTruck(data));
		setselected(data);
	};
	const handleRemove = (index) => {
		// const index=selected
		console.log(index);
		const updated = selected.filter((val, id) => id != index);
		dispatch(setClientTruck(updated));
		setselected(updated);
	};
	return (
		<div className='addClientTruck'>
			<div className='mb-2'>
				<input
					className='search w-100'
					style={{ borderRadius: "8px", border: "1px solid #cecece" }}
					type='text'
					placeholder='&#128269; Search'
				/>
			</div>
			<div>
				<span>{selected.length} selected</span>
			</div>
			<div className='mt-2' style={{ flex: 1, height: "100%" }}>
				{selected.map((item, index) => (
					<div
						style={{ borderBottom: "1px solid #cecece40" }}
						className='d-flex align-items-center justify-content-between'>
						<span className='title'>
							{vehicles[item].truck.registrationNumber}
						</span>
						<div className='py-3'>
							{/* <span className='text-success me-2'>Added </span> */}
							<span
								style={{ cursor: "pointer" }}
								onClick={() => handleRemove(index)}>
								<span>
									<img
										src='/assets/checkBoxChecked.png'
										alt=''
										className='img-fluid'
									/>
								</span>
								{/* <FontAwesomeIcon icon={faTimes} /> */}
							</span>
						</div>
					</div>
				))}
				{vehicles.map((item, index) => {
					if (!selected.includes(index))
						return (
							<div
								style={{ borderBottom: "1px solid #cecece40" }}
								className='d-flex align-items-center justify-content-between'>
								<span className='title'>
									{item.truck.registrationNumber}
								</span>
								<div
									className='py-3'
									style={{ cursor: "pointer" }}
									onClick={() => handleAdd(index)}>
									<span>
										<img
											src='/assets/checkBoxUnChecked.png'
											alt=''
											className='img-fluid'
										/>
									</span>
									{/* <FontAwesomeIcon icon={faPlus} /> */}
								</div>
							</div>
						);
				})}
			</div>
		</div>
	);
}
