import React, { useState } from "react";
import {
	DateInputs,
	SelectInputs,
} from "../../../../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../../../../ModularComponents/UploadInput/UploadInput";
import "./DocumentsTab.css";
export default function DocumentsTab() {
	const [HealthRecord, setHealthRecord] = useState({});
	const [record, setRecord] = useState(null);
	const [AddHealthRecord, setAddHealthRecord] = useState(false);

	const handleHealthRecordAdd = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setHealthRecord((prev) => {
			prev[name] = value;
			return prev;
		});
	};
	const handleRemove = (id, name) => {
		setHealthRecord((prev) => {
			const newData = { ...prev };
			const files = newData[name].filter((item, index) => index != id);
			newData[name] = files;
			if (files.length == 0) {
				document.querySelector(`#${name.split(" ").join("")}`).value =
					null;
			}
			return newData;
		});
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name, target.name);
		if (typeof HealthRecord[target.name] !== "undefined") {
			setHealthRecord((prev) => {
				const newData = { ...prev };
				newData[target.name] = [...newData[target.name], file];
				// dispatch(setUploadDoc(newData));
				return newData;
			});
		} else {
			setHealthRecord((prev) => {
				const newData = { ...prev };
				newData[target.name] = [file];
				// dispatch(setUploadDoc(newData));
				return newData;
			});
		}
	};
	const handleSave = () => {
		setRecord(HealthRecord);
	};
	return (
		<div className='DriverDocuments'>
			<div className='licenseDetails d-flex align-items-center justify-content-between my-3'>
				<div>
					<div className='sectionTitle'>License</div>
					<div className='proofId'>MH-12-2009-0033020</div>
					<div className='validity'>Karnataka | Till 12 Jan 2025</div>
					<div className='d-flex align-items-center my-2'>
						<img
							src='/assets/DriverDetailsSlideWindow/eye.png'
							alt=''
							className='img-fluid'
						/>
						<img
							src='/assets/DriverDetailsSlideWindow/download.png'
							alt=''
							className='img-fluid ms-3'
						/>
					</div>
				</div>
				<div className='d-flex align-items-center'>
					<div className='box'></div>
					<div className='box ms-3'></div>
				</div>
			</div>
			<div className='adharDetails d-flex align-items-center justify-content-between my-3'>
				<div>
					<div className='sectionTitle'>Aadhar poof</div>
					<div className='proofId'>4745 2018 7932</div>
					<div className='d-flex align-items-center my-2'>
						<img
							src='/assets/DriverDetailsSlideWindow/eye.png'
							alt=''
							className='img-fluid'
						/>
						<img
							src='/assets/DriverDetailsSlideWindow/download.png'
							alt=''
							className='img-fluid ms-3'
						/>
					</div>
				</div>
				<div className='d-flex align-items-center'>
					<div className='box'></div>
					<div className='box ms-3'></div>
				</div>
			</div>
			{record !== null && (
				<div className='adharDetails d-flex align-items-center justify-content-between my-3'>
					<div>
						<div className='sectionTitle'>Health Record</div>
						<div className='proofId'>
							{record["Last check up Date"]}
						</div>
						<div className='d-flex align-items-center my-2'>
							<img
								src='/assets/DriverDetailsSlideWindow/eye.png'
								alt=''
								className='img-fluid'
							/>
							<img
								src='/assets/DriverDetailsSlideWindow/download.png'
								alt=''
								className='img-fluid ms-3'
							/>
						</div>
					</div>
					<div className='d-flex align-items-center'>
						<div className='box'></div>
					</div>
				</div>
			)}
			{record == null && (
				<div className='healthRecord'>
					{!AddHealthRecord && (
						<div className='d-flex align-items-center justify-content-between'>
							<div className='recordOfHealth'>Health Record</div>
							<div
								onClick={() => setAddHealthRecord(true)}
								className='addNewRecordofHealth'>
								<img
									src='/assets/DriverDetailsSlideWindow/plus.png'
									alt=''
									className='img-fluid'
								/>
								<span className='ms-2'>Add new</span>
							</div>
						</div>
					)}
					{AddHealthRecord && (
						<div>
							<div className='recordOfHealth'>Health Record</div>
							<div className='row row-cols-2'>
								<div className='col'>
									<SelectInputs
										data={[
											{
												name: "A+",
											},
											{
												name: "B+",
											},
										]}
										required={false}
										placeholder='Blood Group'
										label='Blood Group'
										onBlur={handleHealthRecordAdd}
									/>
								</div>
								<div className='col'>
									<DateInputs
										type='date'
										required={false}
										placeholder='DD/MM/YYYY'
										label='Last check up Date'
										onBlur={handleHealthRecordAdd}
									/>
								</div>
							</div>
							<div className='row row-cols-1'>
								<div className='col'>
									<UploadInput
										onChange={fileUpload}
										remove={handleRemove}
										name='healthRecord'
										UpLoadedDocs={HealthRecord}
										label='Upload Document'
										required={false}
									/>
								</div>
							</div>
							<div className='d-flex my-2'>
								<div onClick={handleSave} className='save'>
									Save
								</div>
								<div
									onClick={() => setAddHealthRecord(false)}
									className='close ms-2'>
									Close
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
