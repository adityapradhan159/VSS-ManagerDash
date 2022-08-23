import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";
import { setBasicDetails } from "../../../Redux-toolkit/AddDriverSlice";
import "./DriverBasicDetails.css";
export default function DriverBasicDetails({ missingCheck }) {
	const [driverbasicDetails, setDriverBasicDetails] = useState({});
	const [prev, setPrev] = useState("");
	const { addDriver } = useSelector((state) => state.addDriver);
	const dispatch = useDispatch();
	
	console.log(addDriver);

	const setGender = (e) => {
		const target = e.currentTarget;
		if (prev != "") {
			const prevGender = document.querySelector(`[data-gender=${prev}]`);
			prevGender.classList.remove("active");
		}
	
		document.querySelector(".radioGender").value = target.dataset.gender;
		setPrev(target.dataset.gender);
		target.classList.add("active");
		setDriverBasicDetails((prev) => {
			const newData = { ...prev };
			newData["gender"] = target.dataset.gender;
			return checkMissingRequired(newData);
		});
    };
    
	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".basicDetails [required]"),
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
		dispatch(setBasicDetails(data));
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
		setDriverBasicDetails((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			return checkMissingRequired(newData);
		});
	});
	return (
		<div className='basicDetails'>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='First Name'
						label='First Name'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Last Name'
						label='Last Name'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<DateInputs
						type='date'
						required={true}
						placeholder='Date of Birth'
						label='Date of Birth'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Phone Number'
						label='Phone Number'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-1 my-3'>
				<div className='col d-flex align-items-center'>
					<span className='me-4 genderLabel'>
						Gender <span className='text-danger'>*</span>
					</span>
					<div className=' d-flex'>
						<input
							required
							className='radioGender'
							type='radio'
							name='gender'
							hidden
						/>
						<div
							onClick={setGender}
							data-gender='male'
							className='me-3 btn genderRadioBtn'>
							<div>Male</div>
						</div>
						<div
							onClick={setGender}
							data-gender='female'
							className='me-3 btn genderRadioBtn'>
							<div>female</div>
						</div>
						<div
							onClick={setGender}
							data-gender='other'
							className='me-3 btn genderRadioBtn'>
							<div>other</div>
						</div>
					</div>
				</div>
			</div>

			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Address Line 1'
						label='Enter your address '
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='City'
						label='City'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='State'
						label='State'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Pincode'
						label='Pincode'
						onBlur={handleBasidDetailInput}
					/>
				</div>
				<div className='col'>
					<SelectInputs
						data={[
							{
								name: "Hindi",
							},
						]}
						required={true}
						placeholder='Preferred Language'
						label='Preferred Language'
						onBlur={handleBasidDetailInput}
					/>
				</div>
			</div>
		</div>
	);
}
