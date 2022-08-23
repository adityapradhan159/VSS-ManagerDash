import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import TabTable from "./Table/TabTable";

import "./TripTabTables.css";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedTableItems } from "../../Redux-toolkit/selectedTableItemsSlice";
export default function TripTabTables({
	tabs,
	addBtn,
	deleteBtn,
	chatBtn,
	type,
}) {
	const [key, setKey] = useState(tabs[0].name);
	const dispatch = useDispatch();
	// const [activeTrip, setActiveTrip] = useState(null);
	const setTableTab = (keyvalue) => {
		// clearing state of the selected item
		dispatch(clearSelectedTableItems(key + "_individualCheckbox"));

		// set the tab key
		setKey(keyvalue);
	};

	useEffect(() => {
		setTableTab(tabs[0].name);
	}, []);
	const { selectedTableItems } = useSelector(
		(state) => state.selectedTableItems
	);
	return (
		<div className='tripTabTable'>
			<div className='d-flex align-items-center justify-content-between'>
				<div>
					<ul className='mb-2 nav nav-tabs' role='tablist'>
						{tabs.map((item, index) => {
							return (
								<li
									eventKey={item.name}
									class='nav-item'
									role='presentation'>
									<button
										onClick={() => {
											setTableTab(item.name);
										}}
										type='button'
										id='controlled-tab-example-tab-ActiveTrip'
										role='tab'
										data-rr-ui-event-key={item.name}
										aria-controls={`controlled-tab-example-tabpane-${item.name}`}
										className={`nav-link ${
											key === item.name ? "active" : ""
										}`}
										aria-selected='true'>
										{item.name}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
				{type != "Sos" && (
					<div className='d-flex align-items-center justify-content-between'>
						{selectedTableItems?.length != 0 && (
							<>
								<span
									onClick={deleteBtn}
									className='actionWrapperBox'>
									<img
										src='/assets/trashCan.svg'
										alt=''
										className='img-fluid'
									/>{" "}
									<span>Delete</span>
								</span>
								<span
									onClick={chatBtn}
									className='actionWrapperBox mx-4'>
									<img
										src='/assets/chat.svg'
										alt=''
										className='img-fluid'
									/>
									<span>Message</span>
								</span>
							</>
						)}
						<div className='addBtn' onClick={addBtn}>
							<span className='me-2'>Add {type}</span>
							<img
								src='/assets/addTrucks.png'
								alt=''
								className='img-fluid'
							/>
						</div>
					</div>
				)}
			</div>
			<Tabs
				defaultActiveKey={key}
				id='controlled-tab-example'
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className='mb-3 detailsTable'>
				{tabs.map((item, index) => {
					return (
						<Tab key={index} eventKey={item.name}>
							<TabTable url={item.url} type={item.name + type} />
						</Tab>
					);
				})}
			</Tabs>
		</div>
	);
}
