import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTruckUpDoc } from "../../../Redux-toolkit/AddTruckSlice";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";

export default function TrucksUploadDocuments({ missingCheck }) {
	const [TruckUploadDoc, setTruckUploadDoc] = useState({});
	const { addTruck } = useSelector((state) => state.addTruck);
	const dispatch = useDispatch();

	const handleRemove = (id, name) => {
		console.log(id, name, TruckUploadDoc);
		setTruckUploadDoc((prev) => {
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
		setTruckUploadDoc((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			// dispatch(setUploadDoc(newData));
			return checkMissingRequired(newData);
		});
	});
	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".truckUpDocument [required]"),
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
		missingCheck(2, Missingflag);
		dispatch(setTruckUpDoc(data));
		return data;
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name, target.name);
		if (typeof TruckUploadDoc[target.name] !== "undefined") {
			setTruckUploadDoc((prev) => {
				const newData = { ...prev };
				newData[target.name] = [...newData[target.name], file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		} else {
			setTruckUploadDoc((prev) => {
				const newData = { ...prev };
				newData[target.name] = [file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		}
	};
	return (
		<div className="truckUpDocument">
			<div>
				<div>
					<label htmlFor=''>Registration Certificate</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<SelectInputs
							data={[
								{
									name: "Karnataka",
								},
							]}
							required={true}
							placeholder='Registered City'
							label='Registered state'
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<SelectInputs
							data={[
								{
									name: "Karnataka",
								},
							]}
							required={true}
							placeholder='Registered state'
							label='Registered state'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-1 mb-2'>
					<div className='col'>
						<UploadInput
							label='Upload Document'
							required={true}
							onChange={fileUpload}
							remove={handleRemove}
							name='Registration doc'
							UpLoadedDocs={addTruck["uploadDoc"]}
						/>
					</div>
				</div>
			</div>
			<div>
				<div>
					<label htmlFor=''>Insurance details</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<DateInputs
							type='date'
							required={false}
							placeholder='DD/MM/YYYY'
							label='Valid From'
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<DateInputs
							type='date'
							required={false}
							placeholder='DD/MM/YYYY'
							label='Valid Till'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<NormalInputs
							required={false}
							placeholder='Insurance provider'
							label='Insurance provider'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-1 mb-2'>
					<div className='col'>
						<UploadInput
							label='Insurance Document'
							required={false}
							onChange={fileUpload}
							remove={handleRemove}
							name='Insurance doc'
							UpLoadedDocs={addTruck["uploadDoc"]}
						/>
					</div>
				</div>
			</div>
			<div>
				<div>
					<label htmlFor=''>Emission Test</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<DateInputs
							type='date'
							required={false}
							placeholder='DD/MM/YYYY'
							label='Valid From'
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<DateInputs
							type='date'
							required={false}
							placeholder='DD/MM/YYYY'
							label='Valid Till'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<NormalInputs
							required={false}
							placeholder='Test Centre'
							label='Test Centre'
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<UploadInput
							label='Upload Test Report'
							required={false}
							onChange={fileUpload}
							remove={handleRemove}
							name='TestReport doc'
							UpLoadedDocs={addTruck["uploadDoc"]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
