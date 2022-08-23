import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	DateInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import UploadInput from "../../ModularComponents/UploadInput/UploadInput";
import "./TripDetails.css";
import TextAreaInput from "../../ModularComponents/TextAreaInput/TextAreaInput";
import { setTripDetails } from "../../../Redux-toolkit/AddTripSlice";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../../Map/Map";
export default function TripDetails({ missingCheck }) {
	const [RouteDetails, setRouteDetails] = useState({});

	const { addTrip } = useSelector((state) => state.addTrip);
	const dispatch = useDispatch();

	console.log(addTrip);

	const checkMissingRequired = (data) => {
		const requiredField = [
			...document.querySelectorAll(".TripTruckAdd [required]"),
		];
		let Missingflag = false;
		const keys = Object.keys(data);
		requiredField.forEach((item, ind) => {
			console.log(!keys.includes(item.name), item.value.length == 0);
			if (!keys.includes(item.name) || item.value.length == 0) {
				Missingflag = true;

				return;
			}

			// Missingflag = false;
		});
		data.missing = Missingflag;
		missingCheck(2, Missingflag);
		dispatch(setTripDetails(data));
		return data;
	};
	const handleTripTruckDetails = (e) => {
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		updateBasicData(name, value);
	};
	function debounce(func, timeout = 500) {
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

	const updateBasicData = debounce((name, value) => {
		console.log(name, value);
		setRouteDetails((prev) => {
			const newData = { ...prev };
			newData[name] = value;
			return checkMissingRequired(newData);
		});
	});
	return (
		<div className='TripTruckAdd'>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<NormalInputs
						required={true}
						placeholder='Client Name'
						label='Client Name'
						onBlur={handleTripTruckDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-2 mb-2'>
				<div className='col'>
					<SelectInputs
						data={[
							{
								name: "Hindi",
							},
						]}
						required={true}
						placeholder='Truck Number'
						label='Truck Number'
						onBlur={handleTripTruckDetails}
					/>
				</div>
				<div className='col'>
					<SelectInputs
						data={[
							{
								name: "Hindi",
							},
						]}
						required={true}
						placeholder='Driver'
						label='Driver'
						onBlur={handleTripTruckDetails}
					/>
				</div>
			</div>

			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<TextAreaInput
						required={false}
						placeholder='Consignment Details'
						label='Consignment Details'
						name='Consignment Details'
						onBlur={handleTripTruckDetails}
					/>
				</div>
			</div>
			<div className='row row-cols-1 mb-2'>
				<div className='col'>
					<TextAreaInput
						required={false}
						placeholder='Load Content'
						label='Load Content'
						name='Load Content'
						onBlur={handleTripTruckDetails}
					/>
				</div>
			</div>
		</div>
	);
}
