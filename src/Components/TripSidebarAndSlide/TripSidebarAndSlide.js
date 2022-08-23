import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import SlideWindow from "./SlideWindow/SlideWindow";
import "./TripSidebarAndSlide.css";

export default function TripSidebarAndSlide() {
	return (
		<div className=''>
			<div className='vh-100 d-flex flex-column align-items-center justify-content-center py-2'>
				<Sidebar />
			</div>
			<div
				style={{ minHeight: "100vh" }}
				className='d-flex flex-column align-items-center justify-content-center py-2'>
				<SlideWindow />
			</div>
		</div>
	);
}
