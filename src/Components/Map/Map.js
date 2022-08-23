import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	GoogleMap,
	LoadScript,
	InfoWindow,
	useJsApiLoader,
	Autocomplete,
} from "@react-google-maps/api";
// import VehicleDetailsModal from "./Components/VehicleDetailsModal/VehicleDetailsModal";
import VehicleDetailsModal from "../VehicleDetailsModal/VehicleDetailsModal";
import { store } from "../../Redux-toolkit/Store";
import { useDispatch, useSelector } from "react-redux";
import { setMarkers } from "../../Redux-toolkit/MarkerSlice";
import { setMapRef } from "../../Redux-toolkit/MapSlice";

const containerStyle = {
	width: "100%",
	height: "100%",
};

function Map() {
	const [markerList, setMarker] = useState([]);
	const [start, setStart] = useState(null);
	const [start1, setStart1] = useState(null);
	const [center, setcenter] = useState(null);
	const [details, setDetails] = useState(null);
	const [source, setSource] = useState([]);
	const [destination, setDestination] = useState([]);
	const [VehicleDetailsModalshow, setVehicleDetailsModal] =
		React.useState(false);
	const [map, setMap] = React.useState(/** @type google.maps.Map */ (null));

	const dispatch = useDispatch();

	// var directionsService = new google.maps.DirectionsService();
	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
	console.log(googleMapsApiKey);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: googleMapsApiKey,
		libraries: ["places"],
	});
	const onLoad = React.useCallback(function callback(map) {
		dispatch(setMapRef(map));
		setMap(map);
	}, []);
	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);
	const onLoads = (marker, content) => {
		console.log("marker: ", marker);
		const infowindow = new window.google.maps.InfoWindow({
			content: `<h1>${content}</h1>`,
		});
		marker.addListener("click", () => infowindow.open(map, marker));
	};

	useEffect(() => {
		fetch("https://devser.vahan247.com/logisticsManager/getAllActiveTrips/")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.statusCode === 200) {
					setMarker(data.activeTrips);
				} else {
					alert("not success");
				}
				// socket
				// setcenter(start);
				// setStart(start);
				// setStart1(start1);
			});
	}, [isLoaded]);
	const handleDetailsModal = (details, marker) => {
		const newDetails = details;
		newDetails.lng = marker.position.lng();
		newDetails.lat = marker.position.lat();
		setDetails(newDetails);
		setVehicleDetailsModal(true);
	};
	// create marker on google map

	const createMarker = (markerObj) => {
		console.log({
			lat: parseFloat(markerObj.currentLocation.latitude),
			lng: parseFloat(markerObj.currentLocation.longitude),
		});
		// eslint-disable-next-line no-undef
		const marker = new google.maps.Marker({
			marker_Id: markerObj.id,
			position: {
				lat: markerObj.currentLocation.latitude,
				lng: markerObj.currentLocation.longitude,
			},
			map: map,
			icon: {
				url: "https://www.pngall.com/wp-content/uploads/2017/05/Map-Marker-Free-Download-PNG.png",
				// set marker width and height
				// eslint-disable-next-line no-undef
				scaledSize: new google.maps.Size(50, 50),
			},
			title: markerObj.truck.registrationNumber,
			// draggable: true,
		});

		// eslint-disable-next-line no-undef
		const InfoWindowContent = (
			<div style={{ width: "max-content", height: "max-content" }}>
				<div id='driverName'>
					<span>Driver : {markerObj.driver.firstName}</span>
				</div>
				<div id='licenceNo'>
					<span>
						License No. : {markerObj.truck.registrationNumber}
					</span>
				</div>
			</div>
		);
		const content = ReactDOMServer.renderToString(InfoWindowContent);
		// eslint-disable-next-line no-undef
		const infowindow = new google.maps.InfoWindow({
			content: content,
		});

		marker.addListener("click", () => infowindow.open(map, marker));
		marker.addListener("dblclick", () => {
			handleDetailsModal(markerObj, marker);
		});

		return marker;
	};
	let m = [];
	let activeSockets = [];
	const subscribeToLocationUpdate = (tripId) => {
		// const updateSocket = new WebSocket(
		// 	"wss://devser.vahan247.com/ws/trip/tripLocation3/"
		// );
		const updateSocket = new WebSocket(
			"wss://" +
				process.env.REACT_APP_BASE_URL_SOCKET +
				"/ws/trip/tripLocation" +
				tripId +
				"/"
		);

		updateSocket.onopen = function (e) {
			updateSocket.send(
				JSON.stringify({ message: "Sending message to server" })
			);
		};

		updateSocket.onmessage = function (e) {
			let data = JSON.parse(e.data);
			console.log("changing msg", data);
			// data = JSON.parse(data.details);
			// // const data = JSON.parse(e.data);
			console.log("data", data, tripId);
			const target = m.filter((item) => item.marker_Id == tripId);
			// // console.log(m, tripId, target);
			// const lat = data.details.location.lat;
			// const lng = data.details.location.lng;
			// eslint-disable-next-line no-undef
			// const myLatlng = new google.maps.LatLng(lat, lng);
			// target[0].setVisible(false);
			target[0].setPosition(data.details.location);
			// target[0].setVisible(true);
			// setWebSocketLocation(data)

			// document.querySelector(`#${tripId}`).innerHTML = data.message;
		};

		updateSocket.onclose = function (e) {
			console.log("Chat socket closed unexpectedly", e);
		};

		var socketDetails = { tripId: tripId, socket: updateSocket };
		console.log("====================================");
		console.log(socketDetails);
		console.log("====================================");

		// activeSockets.push(socketDetails);
	};

	const unsubscribetoSocket = (selectedTripId) => {
		for (var i = 0; i < activeSockets.length; i++) {
			if (activeSockets[i].tripId == selectedTripId) {
				activeSockets[i].socket.close();
			}
		}
	};

	useEffect(() => {
		if (isLoaded && markerList.length > 0 && map != null) {
			dispatch(setMarkers(markerList));
			// alert("hello");
			// eslint-disable-next-line no-undef
			var bounds = new google.maps.LatLngBounds();
			let sources = [];
			let destinations = [];
			markerList.map((x, id) => {
				console.log(x);

				const marker = createMarker(x);
				m.push(marker);
				// subscribeToLocationUpdate(marker.marker_Id);
				console.log(marker);
				// m.push({ marker, id });
				// console.log(marker.position.lat());
				// eslint-disable-next-line no-undef
				const latLng = new google.maps.LatLng(
					marker.position.lat(),
					marker.position.lng()
				);
				bounds.extend(latLng);
			});
			map.fitBounds(bounds);
			map.setZoom(3);
			map.setCenter(bounds.getSouthWest());
		}
	}, [map, markerList, isLoaded]);

	const handleSingleCLick = (e) => {
		console.log("clicked", e);
	};

	const FilterTheMarker = (StartPoint, destination) => {
		const filteredMarker = markerList.filter(
			(item) => item.Start === StartPoint && item.end === destination
		);
		return filteredMarker;
	};
	const MapNewBoundSet = (filteredMarker, bounds) => {
		filteredMarker.forEach((item) => {
			bounds.extend(item.position);
		});
	};
	const FilterMarkerBound = async () => {
		var bounds = new window.google.maps.LatLngBounds();
		var StartPoint = document.getElementById("source").value;
		var destination = document.getElementById("destination").value;
		try {
			const filteredMarker = await FilterTheMarker(
				StartPoint,
				destination
			);
			if (filteredMarker.length > 0) {
				MapNewBoundSet(filteredMarker, bounds);
				map.fitBounds(bounds);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		// <Home />

		isLoaded ? (
			<>
				<VehicleDetailsModal
					details={details}
					show={VehicleDetailsModalshow}
					onHide={() => setVehicleDetailsModal(false)}
				/>
				<GoogleMap
					onLoad={onLoad}
					onUnmount={onUnmount}
					mapContainerStyle={containerStyle}
					// center={{
					// 	lat: 12.9,
					// 	lng: 13.6,
					// }}
					options={{
						zoomControl: false,
						streetViewControl: false,
						mapTypeControl: false,
						fullscreenControl: false,
					}}
					zoom={10}>
					{/* Child components, such as markers, info windows, etc. */}
				</GoogleMap>
				
			</>
		) : (
			<></>
		)
	);
}

export default React.memo(Map);
