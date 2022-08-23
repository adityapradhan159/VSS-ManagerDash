import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBankDetails } from "../../../Redux-toolkit/AddDriverSlice";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import "./DriverBankDetails.css";
export default function DriverBankDetails() {
	const [bankDetailsdata, setBankDetailsdata] = useState({});
	const { addDriver } = useSelector((state) => state.addDriver);
	const dispatch = useDispatch();
	const updateData = debounce((name, value) => {
		setBankDetailsdata((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			dispatch(setBankDetails(newData));
			// console.log(newData);
			return newData;
		});
		console.log(name, value, addDriver);
	});
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
	const handleBankDetailsData = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		updateData(name, value);
	};
	return (
		<div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Account Holder Name'
						label='Account Holder Name'
						onBlur={handleBankDetailsData}
					/>
				</div>
				<div className='col'>
					<SelectInputs
						data={[
							{
								name: "ISBC Bank",
							},
						]}
						required={true}
						placeholder='Bank Name'
						label='Bank Name'
						onBlur={handleBankDetailsData}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='IFSC Code'
						label='IFSC Code'
						onBlur={handleBankDetailsData}
					/>
				</div>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Phone Number'
						label='Phone Number'
						onBlur={handleBankDetailsData}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Account Number'
						label='Account Number'
						onBlur={handleBankDetailsData}
					/>
				</div>
			</div>
		</div>
	);
}
