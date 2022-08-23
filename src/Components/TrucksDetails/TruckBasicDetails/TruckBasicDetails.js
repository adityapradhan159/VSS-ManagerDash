import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTruckBasicDetails } from "../../../Redux-toolkit/AddTruckSlice";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import "./TruckBasicDetails.css";

export default function TruckBasicDetails({ missingCheck }) {
	const [TruckBasicDetails, setAddTruckBasicDetails] = useState({});

	const { addTruck } = useSelector((state) => state.addTruck);
	const dispatch = useDispatch();

	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".truckBasicDetails [required]"),
		];
		let Missingflag = false;
		const keys = Object.keys(data);
		requiredField.forEach((item, ind) => {
			console.log(!keys.includes(item.name), item.value.length == 0);
			if (!keys.includes(item.name) || item.value.length == 0) {
				Missingflag = true;

				return;
			}

			// Missingflag = false;
		});
		data.missing = Missingflag;
		missingCheck(1, Missingflag);
		dispatch(setTruckBasicDetails(data));
		return data;
	};

	const handleBasidDetailInput = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		updateBasicData(name, value);
	};
	function debounce(func, timeout = 500) {
		let timer;
		return function (...args) {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}

	const updateBasicData = debounce((name, value) => {
		console.log(name, value);
		setAddTruckBasicDetails((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			return checkMissingRequired(newData);
		});
	});
	return (
		<div className='truckBasicDetails'>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Registration Number'
						label='Registration Number'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>

			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Make'
						label='Make'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Model'
						label='Model'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Load capacity'
						label='Load capacity (in tons)'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<DateInputs
						type='date'
						required={true}
						placeholder='YYYY'
						label='Year of Manufacture '
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={false}
						placeholder='Class of vehicle'
						label='Class of vehicle'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={false}
						placeholder='Unladen Weight'
						label='Unladen Weight'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={false}
						placeholder='Chasis Number'
						label='Chasis Number'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={false}
						placeholder='Engine number'
						label='Engine number'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
		</div>
	);
}
