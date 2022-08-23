import React from "react";
import TripFilters from "../TripFilters/TripFilters";
import TripTabTables from "../TripTabTables/TripTabTables";
import TripNavbar from "../TripNavbar/TripNavbar";
import "./TripDashboard.css";
import Map from "../Map/Map";
// import Sidebar from "../TripSidebarAndSlide/Sidebar/Sidebar";
import SlideWindow from "../TripSidebarAndSlide/SlideWindow/SlideWindow";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TrucksDetails from "../TrucksDetails/TrucksDetails";
import DriverDetails from "../DriverDetails/DriverDetails";
import ClientDetails from "../ClientDetails/ClientDetails";
import SosTable from "../Sos/SosTable";
import Sidebar from "../Sidebar/Sidebar/Sidebar";
import MessageBox from "../MessageLog/MessageBox/MessageBox";

export default function TripDashboard() {
	const { url, path } = useRouteMatch();
	const handleFiltering = () => {
		//filtering
	};
	const filters = [
		{
			name: "source",
			Onclick: handleFiltering,
		},
		{
			name: "class",
			Onclick: handleFiltering,
		},
		{
			name: "capacity",
			Onclick: handleFiltering,
		},
		{
			name: "model",
			Onclick: handleFiltering,
		},
		{
			name: "company",
			Onclick: handleFiltering,
		},
	];
	// console.log(url, path);
	return (
		<div className='TripDashboard'>
			<TripNavbar />
			<Switch>
				<Route exact path={path}>
					<div
						className='position-relative'
						style={{
							width: "100vw",
							flex: 1,
						}}>
						<div className='d-flex align-items-center h-100 '>
							<div className='' style={{ zIndex: 700 }}>
								<Sidebar />
							</div>
							<div className='w-100 h-100'>
								<Map />
							</div>
						</div>
					</div>
				</Route>
				<Route exact path={path + "/trucks"}>
					<TrucksDetails />
				</Route>
				<Route exact path={path + "/drivers"}>
					<DriverDetails />
				</Route>
				<Route exact path={path + "/clients"}>
					<ClientDetails />
				</Route>
				<Route exact path={path + "/SOS"}>
					<SosTable />
				</Route>
				<Route exact path={path + "/MessageLogs"}>
					<MessageBox />
				</Route>
			</Switch>

			{/* <TripTabTables /> */}
		</div>
	);
}
