import {
	faCommenting,
	faMapMarkerAlt,
	faPencil,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ClientTable from "./ClientTable/ClientTable";
import DriverTable from "./DriverTable/DriverTable";
import SosTable from "./SosTable/SosTable";
import "./TabTable.css";
import ActiveTrucksTable from "./TrucksTable/ActiveTrucksTable";
import InactiveTrucksTable from "./TrucksTable/InactiveTrucksTable/InactiveTrucksTable";

export default function TabTable({ url, type }) {
	const [activeTrip, setActiveTrip] = useState(null);
	const getData = () => {
		fetch(url)
			.then((res) => res.json())
			.then((result) => setActiveTrip(result))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getData();
	}, []);
	if (type === "Activetruck")
		return <ActiveTrucksTable activeTrip={activeTrip} />;
	if (type === "Inactivetruck")
		return <InactiveTrucksTable activeTrip={activeTrip} />;
	if (type === "SOS NotificationsSos")
		return <SosTable activeTrip={activeTrip} />;
	if (type === "Occupieddriver")
		return <DriverTable activeTrip={activeTrip} />;
	if (type === "Activeclient") return <ClientTable activeTrip={activeTrip} />;
	else return <></>;
}
