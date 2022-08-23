import React from "react";
import "./PinOnMap.css";
import { motion } from "framer-motion";
import {
	GoogleMap,
	LoadScript,
	InfoWindow,
	useJsApiLoader,
	Autocomplete,
	Marker,
} from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
export default function PinOnMap({ pinMapAnimation, onMapLoad }) {
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};
	const center = {
		lat: 31.968599,
		lng: -99.90181,
	};
	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
	console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: googleMapsApiKey,
		libraries: ["places"],
	});
	const handlePinMapClose = () => {
		pinMapAnimation.start({
			x: "200%",
			opacity: 0,
			transition: {
				duration: 0.15,
			},
		});
	};

	return (
		<motion.div
			className='position-absolute PinOnMap'
			initial={{
				x: "200%",
				opacity: 0,
			}}
			animate={pinMapAnimation}>
			{isLoaded && (
				<GoogleMap
					onLoad={onMapLoad}
					mapContainerStyle={mapContainerStyle}
					// center={center}
					options={{
						draggingCursor: true,
					}}
					zoom={2}>
					<span
						onClick={handlePinMapClose}
						className='position-absolute'
						style={{ right: "0", top: "50%", cursor: "pointer" }}>
						{/* <FontAwesomeIcon size='4x' icon={faAngleRight} /> */}
						<span>
							<img
								src='/assets/mapClose.png'
								alt=''
								className='img-fluid'
							/>
						</span>
					</span>
					{/* <Marker
						draggable={true}
						position={{
							lat: 23.777176,
							lng: 90.399452,
						}}
					/> */}
				</GoogleMap>
			)}
		</motion.div>
	);
}
