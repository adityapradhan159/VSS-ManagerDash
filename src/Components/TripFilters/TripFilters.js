import {
	faAngleDown,
	faBars,
	faMap,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./TripFilters.css";

export default function TripFilters({ filters }) {
	const filterWidth = (filters.length + 2) * 13;
	return (
		<div className='tripFilters'>
			<div className='filter-left' style={{ width: `${filterWidth}%` }}>
				{/* <input
					className='search'
					type='text'
					placeholder='&#128269; Search'
				/> */}
				<div className='searchBar'>
					<input
						className='search-inp'
						type='text'
						placeholder='Search'
					/>
				</div>
				{filters.map((item, index) => (
					<div
						onClick={item.OnClick}
						className='d-flex align-items-center filters'>
						<span className='me-3'>{item.name}</span>
						<FontAwesomeIcon icon={faAngleDown} />
					</div>
				))}

				{/* <div className='d-flex align-items-center '>
					<span className=''>
						<img
							src='/assets/filterFlag.png'
							alt=''
							className='img-fluid'
						/>
					</span>
				</div> */}
				<div className='d-flex align-items-center filters'>
					<FontAwesomeIcon icon={faSliders} className='me-3' />
					<span
						className='text-capitalize'
						style={{ whiteSpace: "nowrap" }}>
						More filters
					</span>
				</div>
			</div>
		</div>
	);
}
