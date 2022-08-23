import React, { useState } from "react";
import { motion } from "framer-motion";
import "./PermitSlidingWindow.css";
import { Table } from "react-bootstrap";
import PermitTable from "./PermitTable/PermitTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
	DateInputs,
	NormalInputs,
} from "../../../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../../../ModularComponents/UploadInput/UploadInput";

export default function PermitSlidingWindow({ PermitAnimatinoSlide }) {
	const handleClose = () => {
		PermitAnimatinoSlide.start({
			x: 700,
			transition: {
				duration: 0.15,
			},
		});
	};
	const [permit, setPermit] = useState([]);
	const [newPermitAdd, setNewPermitAdd] = useState({});
	const [showAddForm, setshowAddForm] = useState(false);
	const data = [
		{
			"permit no": "sdafdsf",
			"valid from": "12/12/12",
			"valid till": "12/12/12",
			status: "active",
		},
	];
	const handleNewPermitFormChange = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setNewPermitAdd((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			return newData;
		});
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name, target.name);
		if (typeof newPermitAdd[target.name] !== "undefined") {
			setNewPermitAdd((prev) => {
				const newData = { ...prev };
				newData[target.name] = [...newData[target.name], file];
				// dispatch(setUploadDoc(newData));
				return newData;
			});
		} else {
			setNewPermitAdd((prev) => {
				const newData = { ...prev };
				newData[target.name] = [file];
				// dispatch(setUploadDoc(newData));
				return newData;
			});
		}
	};
	const tableHeads = [
		"Permit No",
		"Valid from",
		"Valid Till",
		"Status",
		"Actions",
	];
	const handleSave = () => {
		setPermit((prev) => [newPermitAdd, ...prev]);
		setshowAddForm(false);
	};
	return (
		<motion.div
			className='permitSlider'
			initial={{
				x: 700,
			}}
			animate={PermitAnimatinoSlide}>
			<div className='permitWrapper h-100 d-flex flex-column'>
				<div className='addpermitHead '>
					<div className='d-flex align-items-center justify-content-between'>
						<h4>Permit</h4>
						<span onClick={handleClose} className='fs-3'>
							&times;
						</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div>
							<input
								className='search'
								type='text'
								placeholder='&#128269; Search'
							/>
						</div>
						<div className='d-flex align-items-center'>
							<span className='delete'>
								<img
									src='/assets/trashCan.svg'
									alt=''
									className='img-fluid'
								/>

								<span className=''>Delete</span>
							</span>
							<span className='download ms-3'>
								<img
									src='/assets/chat.svg'
									alt=''
									className='img-fluid'
								/>

								<span className=''>Download</span>
							</span>
						</div>
					</div>
				</div>
				<div
					style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
					<div>
						{permit.length != 0 && (
							<PermitTable
								permit={permit}
								tableHeads={tableHeads}
							/>
						)}
					</div>
					{!showAddForm && (
						<div
							onClick={() => setshowAddForm(!showAddForm)}
							className='addNewPermit my-3'>
							<FontAwesomeIcon size='2x' icon={faPlus} />
							<span>Add new permit</span>
						</div>
					)}
					{showAddForm && (
						<div className='addPermit my-3'>
							<div className='row row-cols-1 gy-2 my-2'>
								<div className='col'>
									<NormalInputs
										label='Permit Number'
										placeholder='Permit Number'
										required={true}
										onBlur={handleNewPermitFormChange}
									/>
								</div>
							</div>
							<div className='row row-cols-2 gy-2 my-2'>
								<div className='col'>
									<DateInputs
										label='Valid From'
										placeholder='DD/MM/YY'
										required={true}
										type='date'
										onBlur={handleNewPermitFormChange}
									/>
								</div>
								<div className='col'>
									<DateInputs
										label='Valid Till'
										placeholder='DD/MM/YY'
										required={true}
										type='date'
										onBlur={handleNewPermitFormChange}
									/>
								</div>
							</div>
							<div className='row row-cols-1 gy-2 my-2'>
								<div className='col'>
									<UploadInput
										label='Upload permit'
										required={true}
										onChange={fileUpload}
										name='permitUpload'
										remove={() => {}}
										UpLoadedDocs={newPermitAdd}
									/>
								</div>
							</div>
							<div className='d-flex my-2'>
								<div onClick={handleSave} className='save'>
									Save
								</div>
								<div
									onClick={() => setshowAddForm(false)}
									className='close ms-2'>
									Close
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
}
