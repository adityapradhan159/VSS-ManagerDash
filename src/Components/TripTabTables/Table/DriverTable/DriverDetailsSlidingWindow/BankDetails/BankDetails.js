import React, { useState } from "react";
import {
	NormalInputs,
	SelectInputs,
} from "../../../../../ModularComponents/Inputs/Inputs";
import "./BankDetails.css";
export default function BankDetails() {
	const [bankDetails, setBankDetails] = useState(null);
	const [FormValues, setFormValues] = useState({});
	const [showForm, setShowForm] = useState(false);
	const handleFormData = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		setFormValues((prev) => {
			prev[name] = value;
			return prev;
		});
	};
	const handleSave = () => {
		setBankDetails(FormValues);
	};
	return (
		<div className='driverBankDetails'>
			{bankDetails != null && (
				<div className='my-3 details'>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Account Holder Name
						</span>
						<span className='infoText'>
							{bankDetails["Account Holder Name"]}
						</span>
					</div>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Bank Name
						</span>
						<span className='infoText'>
							{bankDetails["Bank Name"]}
						</span>
					</div>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							IFSC Code
						</span>
						<span className='infoText'>
							{bankDetails["IFSC Code"]}
						</span>
					</div>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Account Number
						</span>
						<span className='infoText'>
							{bankDetails["Account Number"]}
						</span>
					</div>
					<div className='d-flex flex-column'>
						<span
							className='title'
							style={{ whiteSpace: "nowrap" }}>
							Registered Contact Number
						</span>
						<span className='infoText'>
							{bankDetails["Phone Number"]}
						</span>
					</div>
				</div>
			)}
			{bankDetails == null && (
				<div>
					{!showForm && (
						<div
							onClick={() => setShowForm(true)}
							className='addBankDetails'>
							<img
								src='/assets/DriverDetailsSlideWindow/add.png'
								alt=''
								className='img-fluid'
							/>
							<span className=''>Add Bank Account</span>
						</div>
					)}
					{showForm && (
						<div>
							<div className='row row-cols-2'>
								<div className='col'>
									<NormalInputs
										required={false}
										placeholder='Account Holder Name '
										label='Account Holder Name'
										onBlur={handleFormData}
									/>
								</div>
								<div className='col'>
									<SelectInputs
										data={[
											{
												name: "ICICI Bank",
											},
										]}
										required={true}
										placeholder='Bank Name'
										label='Bank Name '
										onBlur={handleFormData}
									/>
								</div>
							</div>
							<div className='row row-cols-2'>
								<div className='col'>
									<NormalInputs
										required={false}
										placeholder='IFSC Code'
										label='IFSC Code'
										onBlur={handleFormData}
									/>
								</div>
								<div className='col'>
									<NormalInputs
										required={false}
										placeholder='Phone Number '
										label='Phone Number'
										onBlur={handleFormData}
									/>
								</div>
							</div>
							<div className='row row-cols-1'>
								<div className='col'>
									<NormalInputs
										required={false}
										placeholder='Account Number'
										label='Account Number'
										onBlur={handleFormData}
									/>
								</div>
							</div>
							<div className='d-flex my-2'>
								<div onClick={handleSave} className='save'>
									Save
								</div>
								<div
									onClick={() => setShowForm(false)}
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
