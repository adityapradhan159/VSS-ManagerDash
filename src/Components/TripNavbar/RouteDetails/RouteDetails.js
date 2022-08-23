import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
	DateInputs,
	LocationInputs,
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import TextAreaInput from "../../ModularComponents/TextAreaInput/TextAreaInput";
import "./RouteDetails.css";
import PinOnMap from "../PinOnMap/PinOnMap";
import { useAnimation } from "framer-motion";
import { useCallback } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
export default function RouteDetails() {
	const pinMapAnimation = useAnimation();
	// const [AutoCompleteRef, setAutoCompleteRef] = useState(null);
	let marker;
	const [map, setMap] = useState(null);
	const mapOpen = () => {
		pinMapAnimation.start({
			x: "-100%",
			opacity: 1,
			transition: {
				duration: 0.15,
			},
		});
	};
	const handleBasidDetailInput = (e, index) => {
		setTripInfo((prev) => {
			const newData = [...prev];
			newData[index].location = e.target.value;
			return newData;
		});
	};
	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
	console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: googleMapsApiKey,
		libraries: ["places"],
	});
	const [TripInfo, setTripInfo] = useState([
		{
			location: "",
			coordinate: null,
			note: "start",
			autoCompleteRef: null,
		},
		{
			location: "",
			coordinate: null,
			note: "",
			autoCompleteRef: null,
		},
		{
			location: "",
			coordinate: null,
			note: "end",
			autoCompleteRef: null,
		},
	]);

	//save reference for dragItem and dragOverItem
	const dragItem = useRef(null);
	const dragOverItem = useRef(null);

	//const handle drag sorting
	const handleSort = () => {
		//duplicate items
		let _TripInfo = [...TripInfo];

		//remove and save the dragged item content
		const draggedItemContent = _TripInfo.splice(dragItem.current, 1)[0];

		//switch the position
		_TripInfo.splice(dragOverItem.current, 0, draggedItemContent);

		//reset the position ref
		dragItem.current = null;
		dragOverItem.current = null;

		//update the actual array
		setTripInfo(_TripInfo);

		console.log(marker);
	};

	//handle new item addition
	const handleAddItem = () => {
		const _TripInfo = [...TripInfo];
		_TripInfo.splice(_TripInfo.length - 1, 0, {
			location: "",
			coordinate: null,
			note: "",
			autoCompleteRef: null,
		});
		setTripInfo(_TripInfo);
	};
	const handleNote = (e) => {
		const targetId = e.currentTarget.dataset.target;
		document.querySelector(`#${targetId}`).classList.remove("d-none");
		e.currentTarget.closest(".noteBtn").style.display = "none";
	};
	const handleNoteClose = (e) => {
		const target = e.currentTarget.dataset.target;
		const targetId = e.currentTarget.dataset.id;
		document.querySelector(`#${target}`).classList.add("d-none");
		document.querySelector(
			`[data-target=noteBtn-${targetId}]`
		).style.display = "block";
	};
	const onLoad = (autocomplete, index) => {
		console.log("autocomplete: ", autocomplete);
		setTripInfo((prev) => {
			const newData = [...prev];
			newData[index].autoCompleteRef = autocomplete;
			return newData;
		});
		// AutoCompleteRef = autocomplete;
	};
	const onMapLoad = useCallback(function callback(map) {
		// dispatch(setMapRef(map));
		navigator.geolocation.getCurrentPosition(
			function (position) {
				map.setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				map.setZoom(10);
				// initMap(position.coords.latitude, position.coords.longitude);
			},
			function errorCallback(error) {
				console.log(error);
			}
		);
		setMap(map);
	}, []);

	const onPlaceChanged = (index) => {
		const place = TripInfo[index].autoCompleteRef.getPlace();
		TripInfo[index].coordinate = place.geometry.location;
		TripInfo[index].location = place.formatted_address;
		// console.log(place);
		if (place !== null) {
			map.setCenter(place.geometry.location);
			map.setZoom(15);
			// eslint-disable-next-line no-undef
			marker = new google.maps.Marker({
				position: place.geometry.location,
				map: map,
				icon: {
					url: "/assets/pinMarker.png",
					// set marker width and height
					// eslint-disable-next-line no-undef
					scaledSize: new google.maps.Size(50, 70),
				},
				title: "Location marker",
				draggable: true,
			});

			/**
			 * Finds the new position of the marker when the marker is dragged.
			 */

			// eslint-disable-next-line no-undef
			google.maps.event.addListener(marker, "dragend", function (event) {
				var lat, long, address, resultArray, citi;

				console.log("i am dragged");
				lat = marker.getPosition().lat();
				long = marker.getPosition().lng();

				// eslint-disable-next-line no-undef
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode(
					{ latLng: marker.getPosition() },
					function (result, status) {
						if ("OK" === status) {
							// This line can also be written like if ( status == google.maps.GeocoderStatus.OK ) {
							address = result[0].formatted_address;
							setTripInfo((prev) => {
								const newData = [...prev];
								newData[index].location = address;
								return newData;
							});
						} else {
							console.log(
								"Geocode was not successful for the following reason: " +
									status
							);
						}
					}
				);
			});

			console.log(place.geometry.location);
		} else {
			console.log("Autocomplete is not loaded yet!");
		}
	};
	return (
		<div className='addTripDetails'>
			<PinOnMap pinMapAnimation={pinMapAnimation} onMapLoad={onMapLoad} />
			<div style={{ paddingLeft: "2rem" }}>
				<p className='addTribSecTitle'>Time Information</p>
				<div
					className=' border'
					style={{ padding: "10px 1rem", borderRadius: "8px" }}>
					<div className='row row-cols-2 mb-2'>
						<div className='col'>
							<DateInputs
								type='datetime-local'
								required={false}
								placeholder='Start Date & Time'
								label='Start Date & Time'
								onBlur={handleBasidDetailInput}
							/>
						</div>
						<div className='col'>
							<DateInputs
								type='datetime-local'
								required={false}
								placeholder='Expected Date & Time'
								label='Expected Date & Time'
								onBlur={handleBasidDetailInput}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className='tripInfoForm'>
				{TripInfo.map((item, index) => {
					return (
						<div
							className='routeSection list-item position-relative'
							key={index}
							draggable
							onDragStart={(e) => (dragItem.current = index)}
							onDragEnter={(e) => (dragOverItem.current = index)}
							onDragEnd={handleSort}
							onDragOver={(e) => e.preventDefault()}>
							{index === TripInfo.length - 1 && (
								<span
									onClick={handleAddItem}
									className=''
									style={{
										position: "absolute",
										left: "-9px",
										top: "-50px",
									}}>
									<span>
										<img
											src='/assets/addStop.png'
											alt=''
											className='img-fluid'
										/>
										<span className='addStop ms-2'>
											Add a stop
										</span>
									</span>
								</span>
							)}
							<span
								className='position-absolute'
								onDragOver={(e) => e.preventDefault()}
								style={{
									top: 35,
									left: "-30px",
									cursor: "grab",
								}}>
								<img
									onDragOver={(e) => e.preventDefault()}
									src='/assets/draggable.png'
									alt=''
									className='img-fluid'
								/>
							</span>
							{index == 0 && (
								<span
									onDragOver={(e) => e.preventDefault()}
									className='position-absolute'
									style={{ top: 30, left: "-6px" }}>
									<img
										src='/assets/Source.png'
										alt=''
										className='img-fluid'
									/>
								</span>
							)}
							{index == TripInfo.length - 1 && (
								<span
									onDragOver={(e) => e.preventDefault()}
									className='position-absolute'
									style={{ top: 30, left: "-6px" }}>
									<img
										src='/assets/destination.png'
										alt=''
										className='img-fluid'
									/>
								</span>
							)}
							{index !== 0 && index !== TripInfo.length - 1 && (
								<span
									onDragOver={(e) => e.preventDefault()}
									className='position-absolute'
									style={{ top: 30, left: "-6px" }}>
									<img
										src='/assets/stop.png'
										alt=''
										className='img-fluid'
									/>
								</span>
							)}
							<p className='addTribSecTitle'>
								{index === 0 && "Source "}
								{index === TripInfo.length - 1 &&
									"Destination "}
								{index < TripInfo.length - 1 &&
									index > 0 &&
									"Stop "}
								Information
							</p>
							<div
								className='routeSet border'
								style={{
									padding: "10px 1rem",
									borderRadius: "8px",
								}}>
								<div className='d-flex  mb-2'>
									<div className='col'>
										{isLoaded && (
											<Autocomplete
												onLoad={(searchBox) =>
													onLoad(searchBox, index)
												}
												onPlaceChanged={() =>
													onPlaceChanged(index)
												}>
												<LocationInputs
													type='text'
													value={item.location}
													required={false}
													placeholder='Source Source'
													label='Source Source'
													onBlur={(e) =>
														handleBasidDetailInput(
															e,
															index
														)
													}
												/>
											</Autocomplete>
										)}
										<div className='d-flex align-items-center justify-content-end'>
											<span
												onClick={mapOpen}
												className='d-flex align-items-center'>
												<img
													src='/assets/pin.png'
													alt=''
													className='img-fluid'
												/>

												<span className='ms-2 pinOnMap'>
													Pin on Map
												</span>
											</span>
										</div>
									</div>
									<div
										className='col-2 mx-3 noteBtn'
										data-target={`noteBtn-${index}`}>
										<label
											className='form-label'
											htmlFor=''
											style={{ whiteSpace: "nowrap" }}>
											Note (Optional)
										</label>
										<div
											data-target={`noteSec-${index}`}
											onClick={handleNote}
											className='btnBox'>
											{/* <img
												src='/assets/AddCircle.png'
												alt=''
												className='img-fluid'
											/> */}
											<div className='addbox'>
												<FontAwesomeIcon
													icon={faPlus}
												/>
											</div>
										</div>
									</div>
								</div>

								<div
									id={`noteSec-${index}`}
									className=' position-relative d-none'>
									<TextAreaInput
										required={false}
										placeholder='Notes'
										label='Notes (Optional)'
										name='Notes'
										onBlur={handleBasidDetailInput}
									/>
									<span
										data-target={`noteSec-${index}`}
										data-id={index}
										onClick={handleNoteClose}
										className='position-absolute '
										style={{
											bottom: "0px",
											right: "25px",
										}}>
										cancle
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
