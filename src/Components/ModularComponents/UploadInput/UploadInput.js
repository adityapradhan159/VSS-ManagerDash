import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Form } from "react-bootstrap";
import "./UploadInput.css";
export default function UploadInput({
	label,
	required,
	onChange,
	placeholder,
	name,
	type,
	remove,
	UpLoadedDocs,
}) {
	const uploadHandle = () => {
		document.querySelector(`.${name.split(" ")[0]}_uploadFile`).click();
	};

	return (
		<div className='uploadingWrapper d-flex w-100 align-items-center justify-content-center'>
			<Form.Group className=' w-100' controlId='upload'>
				<Form.Label className={required ? "required" : ""}>
					{label}
				</Form.Label>
				<div className='position-relative'>
					<div className='d-flex align-items-center '>
						<div
							className='d-flex align-items-center py-1 '
							style={{
								cursor: "pointer",
								borderRadius: "5px",
								minWidth: "max-content",
								whiteSpace: "nowrap",
							}}
							onClick={uploadHandle}>
							<input
								onChange={onChange}
								hidden
								required={required}
								className={`${name.split(" ")[0]}_uploadFile`}
								id={name.split(" ").join("")}
								style={{ width: "0" }}
								type='file'
								name={name}
							/>
							<img
								src='/assets/uploadBtn.png'
								alt=''
								className='img-fluid'
							/>
						</div>
						<div className='d-flex flex-wrap align-items-center justify-content-start'>
							{UpLoadedDocs &&
								UpLoadedDocs[name]?.map((item, index) => {
									return (
										<div key={index} className='files mb-1'>
											<span title={item.name}>
												{item.name.length > 10
													? item.name.slice(0, 9) +
													  ".."
													: item.name}
											</span>
											<span
												onClick={() =>
													remove(index, name)
												}>
												&times;
											</span>
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</Form.Group>
		</div>
	);
}
