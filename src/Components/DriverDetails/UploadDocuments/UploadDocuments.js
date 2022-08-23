import { useState } from "react";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";
import { useDispatch, useSelector } from "react-redux";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import { setUploadDoc } from "../../../Redux-toolkit/AddDriverSlice";

export default function UploadDocuments({ missingCheck }) {
	const [driverUploadDoc, setDriverUploadDoc] = useState({});
	const { addDriver } = useSelector((state) => state.addDriver);
	const dispatch = useDispatch();

	const handleRemove = (id, name) => {
		console.log(id, name, driverUploadDoc);
		setDriverUploadDoc((prev) => {
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
		setDriverUploadDoc((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			// dispatch(setUploadDoc(newData));
			return checkMissingRequired(newData);
		});
	});
	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".driverUpdoc [required]"),
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
		dispatch(setUploadDoc(data));
		return data;
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name, target.name);
		if (typeof driverUploadDoc[target.name] !== "undefined") {
			setDriverUploadDoc((prev) => {
				const newData = { ...prev };
				newData[target.name] = [...newData[target.name], file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		} else {
			setDriverUploadDoc((prev) => {
				const newData = { ...prev };
				newData[target.name] = [file];
				// dispatch(setUploadDoc(newData));
				return checkMissingRequired(newData);
			});
		}
	};
	return (
		<div className='driverUpdoc'>
			<div>
				<div>
					<label htmlFor=''>Licence Details</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<NormalInputs
							required={true}
							placeholder='License Number'
							label='License Number'
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
					<div className='col d-flex'>
						<UploadInput
							onChange={fileUpload}
							remove={handleRemove}
							name='licence doc'
							label='Upload Document'
							required={true}
							UpLoadedDocs={addDriver["uploadDoc"]}
						/>
					</div>
				</div>
			</div>
			<div>
				<div>
					<label htmlFor=''>ID Proof</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<SelectInputs
							data={[
								{
									name: "Aadhar Card",
								},
							]}
							required={false}
							placeholder='Proof Type'
							label='Proof Type'
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<NormalInputs
							required={false}
							placeholder='ID number'
							label='ID number'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<UploadInput
							onChange={fileUpload}
							remove={handleRemove}
							name='id doc'
							label='Upload Document'
							required={false}
							UpLoadedDocs={addDriver["uploadDoc"]}
						/>
					</div>
				</div>
			</div>
			<div>
				<div>
					<label htmlFor=''>Health Proof</label>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<SelectInputs
							data={[
								{
									name: "B+ve",
								},
							]}
							required={false}
							placeholder='Blood Group'
							label='Blood Group '
							onBlur={handleUploadFileDetails}
						/>
					</div>
					<div className='col'>
						<DateInputs
							type='datetime-local'
							required={false}
							placeholder='DD/MM/YYYY'
							label='Last check up Date'
							onBlur={handleUploadFileDetails}
						/>
					</div>
				</div>
				<div className='row row-cols-2 mb-2'>
					<div className='col'>
						<UploadInput
							onChange={fileUpload}
							remove={handleRemove}
							name='health doc'
							UpLoadedDocs={addDriver["uploadDoc"]}
							label='Upload Document'
							required={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
