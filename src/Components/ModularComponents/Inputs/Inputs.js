import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import React, { useEffect } from "react";
import { Col, Form, FormControl, InputGroup } from "react-bootstrap";
import { Autocomplete } from "@react-google-maps/api";
import "./Inputs.css";
import {
	faCalendar,
	faEye,
	faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export function NormalInputs({
	className,
	type,
	required,
	placeholder,
	label,
	onBlur,
	disabled,
	value,
}) {
	return (
		<Form.Group className='' md='' controlId=''>
			<Form.Label
				className={
					required ? "required text-secondary" : "text-secondary"
				}>
				{label}
			</Form.Label>
			<Form.Control
				className={"px-3  py-2 " + className}
				// onBlur={onBlur}
				onChange={onBlur}
				required={required}
				name={label}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
			/>
		</Form.Group>
	);
}
export function LocationInputs({
	className,
	type,
	required,
	placeholder,
	label,
	onBlur,
	disabled,
	value,
}) {
	return (
		<Form.Group className='' md='' controlId=''>
			<Form.Label
				className={
					required ? "required text-secondary" : "text-secondary"
				}>
				{label}
			</Form.Label>
			<Form.Control
				className={"px-3  py-2 " + className}
				// onBlur={onBlur}
				onChange={onBlur}
				required={required}
				name={label}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				value={value}
			/>
		</Form.Group>
	);
}
export function DateInputs({ type, required, placeholder, label, onBlur }) {
	const dateChangeHandle = (e) => {
		// const name = e.currentTarget.name;
		const dateInput = e.currentTarget.value;
		console.log(dateInput);
		onBlur(e);
		if (dateInput != "") {
			document
				.querySelector(".dateInput ~ span")
				.classList.remove("d-flex");
			document.querySelector(".dateInput ~ span").classList.add("d-none");
			return;
		}
		document.querySelector(".dateInput ~ span").classList.remove("d-none");
		document.querySelector(".dateInput ~ span").classList.add("d-flex");
	};
	return (
		<Form.Group className=' ' as={Col} md='' controlId='date'>
			<Form.Label className={required ? "required" : ""}>
				{label}
			</Form.Label>
			<div className='position-relative'>
				<Form.Control
					className='dateInput px-3  py-2'
					// onBlur={(e) => {
					// 	e.currentTarget.type = "text";
					// }}
					onChange={dateChangeHandle}
					required={required}
					name={label}
					type='text'
					onFocus={(e) => {
						e.currentTarget.type = type;
					}}
					placeholder={placeholder}
				/>
				<span
					className='position-absolute  d-flex'
					style={{
						top: "50%",
						right: "10%",
						color: "#076EB3",
						transform: "translate(-10%,-50%)",
					}}>
					<img
						src='/assets/calander.png'
						alt=''
						className='img-fluid'
					/>
				</span>
			</div>
		</Form.Group>
	);
}
export function PhoneInputs({
	data,
	type,
	required,
	placeholder,
	label,
	onBlur,
	disabled,
}) {
	return (
		<Form.Group className=' ' as={Col} md='' controlId=''>
			<Form.Label
				className={"text-secondary" + required ? "required" : ""}>
				{label}
			</Form.Label>
			<div className='d-flex'>
				<Form.Select
					onBlur={onBlur}
					className='grayDefault px-3  py-2 CountryCode'
					disabled={disabled}
					name={"countryCode"}
					aria-label={label}>
					<option value='+91'>+91</option>

					{data.map((item, ind) => (
						<option key={ind} value={item.value}>
							{item.name}
						</option>
					))}
				</Form.Select>
				<Form.Control
					className='px-3  py-2 phoneInput'
					onBlur={onBlur}
					required={required}
					name={label}
					disabled={disabled}
					type={type}
					placeholder={placeholder}
				/>
			</div>
		</Form.Group>
	);
}
export function SelectInputs({
	data,
	required,
	placeholder,
	label,
	onBlur,
	disabled,
}) {
	return (
		<Form.Group className='' as={Col} md='' controlId=''>
			<Form.Label className={required ? "required" : ""}>
				{label}
			</Form.Label>
			<Form.Select
				onChange={onBlur}
				// onBlur={onBlur}
				className='grayDefault px-3  py-2'
				name={label}
				disabled={disabled}
				required={required}
				aria-label={label}>
				<option value='' disabled selected>
					{placeholder}
				</option>

				{data.map((item, ind) => (
					<option key={ind} value={item.value}>
						{item.name}
					</option>
				))}
			</Form.Select>
		</Form.Group>
	);
}
export function PassInputs({ placeholder, label, onBlur, required }) {
	const [passIcon, setPassIcon] = React.useState(false);
	const [passType, setPassType] = React.useState(true);
	return (
		<div className='my-2'>
			<Form.Label
				className={
					required ? "required text-secondary" : "text-secondary"
				}>
				{label}
			</Form.Label>
			<div className='position-relative'>
				<FormControl
					name={label}
					onBlur={onBlur}
					onChange={onBlur}
					className='px-3  py-2'
					id='pass'
					placeholder={placeholder}
					type={passType ? "password" : "text"}
					aria-label='password'
					required={required}
				/>
				<span
					onClick={() => {
						setPassIcon(!passIcon);
						setPassType(!passType);
					}}
					className='position-absolute'
					style={{
						top: "50%",
						right: "10%",
						transform: "translate(-10%,-50%)",
					}}>
					<FontAwesomeIcon icon={passIcon ? faEye : faEyeSlash} />
				</span>
			</div>
		</div>
	);
}
