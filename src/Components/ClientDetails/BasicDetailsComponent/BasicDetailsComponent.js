import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientBasicDetails } from "../../../Redux-toolkit/AddClientSlice";
import {
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";
import "./BasicDetailsComponent.css";

export default function BasicDetailsComponent({ missingCheck }) {
	const [ClientsBasicDetails, setClientsBasicDetails] = useState({});
	const { addClient } = useSelector((state) => state.addClient);
	const dispatch = useDispatch();

	const handleRemove = (id, name) => {
		console.log(id, name, ClientsBasicDetails);
		setClientsBasicDetails((prev) => {
			const newData = { ...prev };
			const files = newData[name].filter((item, index) => index != id);
			newData[name] = files;
			if (files.length == 0) {
				document.querySelector(`#${name.split(" ").join("")}`).value =
					null;
			}
			return checkMissingRequired(newData);
		});
	};

	function debounce(func, timeout = 1000) {
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
	const handleUploadFileDetails = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		updateUploadData(name, value);
	};

	const updateUploadData = debounce((name, value) => {
		setClientsBasicDetails((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			// dispatch(setUploadDoc(newData));
			return checkMissingRequired(newData);
		});
	});
	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".clientsBasicDetails [required]"),
		];
		let Missingflag = false;
		const keys = Object.keys(data);
		requiredField.forEach((item, ind) => {
			console.log(keys, item);
			// console.log(!keys.includes(item.name), item.value.length == 0);
			if (!keys.includes(item.name) || item.value.length == 0) {
				Missingflag = true;
				return;
			}

			// Missingflag = false;
		});
		data.missing = Missingflag;
		missingCheck(1, Missingflag);
		dispatch(setClientBasicDetails(data));
		return data;
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name, target.name);
		if (typeof ClientsBasicDetails[target.name] !== "undefined") {
			setClientsBasicDetails((prev) => {
				const newData = { ...prev };
				newData[target.name] = [...newData[target.name], file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		} else {
			setClientsBasicDetails((prev) => {
				const newData = { ...prev };
				newData[target.name] = [file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		}
	};
	return (
		<div className='clientsBasicDetails'>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Client Name'
						label='Client Name'
						onBlur={handleUploadFileDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Phone Number'
						label='Phone Number'
						onBlur={handleUploadFileDetails}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Email ID'
						label='Email ID'
						onBlur={handleUploadFileDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={false}
						placeholder='Registration Number'
						label='Business Registration Number'
						onBlur={handleUploadFileDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Address Line 1'
						label='Enter your address '
						onBlur={handleUploadFileDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='City'
						label='City'
						onBlur={handleUploadFileDetails}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='State'
						label='State'
						onBlur={handleUploadFileDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Pincode'
						label='Pincode'
						onBlur={handleUploadFileDetails}
					/>
				</div>
				<div className='col'>
					<UploadInput
						onChange={fileUpload}
						label='Upload logo'
						name='Upload logo'
						required={false}
						remove={handleRemove}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Pan Card'
						label='Pan Card'
						onBlur={handleUploadFileDetails}
					/>
				</div>
				<div className='col'>
					<UploadInput
						onChange={fileUpload}
						label='Upload Pancard'
						name='Upload Pancard'
						required={false}
						remove={handleRemove}
					/>
				</div>
			</div>
		</div>
	);
}
