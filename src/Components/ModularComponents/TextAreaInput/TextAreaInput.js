import React from "react";
import "./TextAreaInput.css";

export default function TextAreaInput({
	required,
	placeholder,
	label,
	onBlur,
}) {
	return (
		<div className='form-group'>
			<label className='form-label' for='exampleFormControlTextarea1'>
				{label}
			</label>
			<textarea
				required={required}
				onBlur={onBlur}
				className='form-control textArea'
				id='exampleFormControlTextarea1'
				placeholder={placeholder}
				rows='3'></textarea>
		</div>
	);
}
