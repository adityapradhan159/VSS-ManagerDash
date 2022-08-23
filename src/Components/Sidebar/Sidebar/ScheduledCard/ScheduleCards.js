import React, { useState, useEffect } from "react";
import "./scheduleCards.css";

const ScheduleCards = ({ storeId, item, key, setScheduleData }) => {
	const [showLink, setShowLink] = useState(true);

	const [showLinkD, setShowLinkD] = useState(true);

	//To Add Truck Input Field--------------------------------------
	const [arr, setArr] = useState([]);
	const handleTruckAdd = () => {
		const add = [...arr, []];
		setArr(add);
		setShowLink((s) => !s);
	};

	//To Add Driver Input Field----------------------------------------
	const [arrD, setArrD] = useState([]);
	const handleDriverAdd = () => {
		const addD = [...arrD, []];
		setArrD(addD);
		setShowLinkD((s) => !s);
	};

	//To Add change Name Input Field-------------------
	const [showChangeInput, setShowChangeInput] = useState(true);
	const [changeInp, setChangeInp] = useState([]);

	const handleChangeName = () => {
		const changeName = changeInp;
		setChangeInp(changeName);
		setShowChangeInput((s) => !s);
		setHideChangeInp(false);
	};

	// Code To Add Driver Name.....................................................
	const [driverName, setDriverName] = useState("");

	const handleSaveAddDriver = () => {
		const newItem = { ...item };
		newItem.person = driverName;

		setScheduleData((prev) => {
			const newData = [...prev];
			newData[newItem.id] = newItem;
			console.log(newData);
			return newData;
		});
		console.log(newItem);
	};

	const [driverNameSuggestion, setDriverNameSuggestion] = useState(
		item.personName
	);

	const handleAddDriverInpChange = (e) => {
		const driverName = e.target.value;
		setDriverName(driverName);

		let driverNamematches = [];

		driverNamematches = item.personName.filter((driverloc) => {
			const regex = new RegExp(`${driverName}`, "gi");
			return driverloc.match(regex);
		});
		console.log(driverNameSuggestion);

		setDriverNameSuggestion(driverNamematches);
	};

	const onDriverDropDownHandler = (driverName) => {
		setDriverName(driverName);
		setDriverNameSuggestion([]);
	};

	// ---------Code to Add Truck Name.........................................
	const [truckName, setTruckName] = useState("");

	const handleSaveAddTruckName = () => {
		const newTruck = { ...item };
		newTruck.name = truckName;

		setScheduleData((prev) => {
			const newTruckData = [...prev];
			newTruckData[newTruck.id] = newTruck;
			console.log(newTruckData);
			return newTruckData;
		});
		console.log(newTruck);
	};

	const [truckNameSuggestion, setTruckNameSuggestion] = useState(
		item.truckName
	);

	const handleAddTruckNameChange = (e) => {
		const truckName = e.target.value;
		setTruckName(truckName);

		let truckNameMatches = [];

		truckNameMatches = item.truckName.filter((truckloc) => {
			const regex = new RegExp(`${truckName}`, "gi");
			return truckloc.match(regex);
		});
		console.log(truckNameSuggestion);

		setTruckNameSuggestion(truckNameMatches);
	};

	const onPickupSuggestionHandler = (truckName) => {
		setTruckName(truckName);
		setTruckNameSuggestion([]);
	};

	// ----------------Code to change Driver Name.............................
	const [changeDriverName, setChangeDriverName] = useState("");
	const [hideChangeInp, setHideChangeInp] = useState(true);

	const handleChangeDriverNameSave = () => {
		const newDriver = { ...item };

		newDriver.person = changeDriverName;

		setScheduleData((prev) => {
			const newDriverNameData = [...prev];
			newDriverNameData[newDriver.id] = newDriver;
			console.log(newDriverNameData);
			return newDriverNameData;
		});
		console.log(newDriver);
		setShowChangeInput((s) => !s);
		setHideChangeInp(true);
	};

	const handleDriverNameChange = (e) => {
		const changeDriverName = e.target.value;
		setChangeDriverName(changeDriverName);

		let driverNamematches = [];

		driverNamematches = item.personName.filter((driverloc) => {
			const regex = new RegExp(`${changeDriverName}`, "gi");
			return driverloc.match(regex);
		});

		setDriverNameSuggestion(driverNamematches);
	};

	const onChangeDriverDropDownHandler = (changeDriverName) => {
		setChangeDriverName(changeDriverName);
		setDriverNameSuggestion([]);
	};

	// -------------------------------------------------------------------------------
	// Storing ID......
	const handleScreen = (id) => {
		storeId(id);
	};

	// To get Date and Day.....
	const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	const date = new Date(item.date);
	const day = weekday[date.getDay()];

	useEffect(() => {}, [item]);

	return (
		<>
			<div className='ScheduleCards' key={key}>
				<div className='ScheduleCard-container'>
					<div className='main-icon'>
						<div className='calenderDesign'>
							<div className='calenderDot'></div>
							<div className='calenderDot1'></div>
						</div>
						<div className='S-mainIconContainer'>
							<div className='DateDay'>
								<p>{day}</p>
							</div>
							<div className='ScheduleDate'>
								<p>{date.getDate()}</p>
							</div>
						</div>
					</div>

					<div className='ScheduleTripDetails'>
						{/* --------------Truck Name--------- */}
						<div className='scheduleTripName'>
							{item.name ? (
								<span style={{textDecoration:"underLine"}}>{item.name}</span>
							) : (
								<>
									<div
										className='add-btn'
										style={{
											display: showLink ? "flex" : "none",
											alignItems: "center",
											cursor: "pointer",
										}}
										onClick={(e) => handleTruckAdd()}>
										<p
											style={{
												color: "#216CB0",
												fontSize: "14px",
												fontWeight: "400",
												textDecoration:"underLine"
											}}>
											Add Truck
										</p>
										<img
											src='/images/addBtn.svg'
											alt=''
											style={{ marginLeft: "3px" }}
										/>
									</div>
									{arr.map((data, i) => {
										return (
											<>
												<div
													className='input-btn1'
													style={{
														display: "flex",
														width: "255px",
														background: "white",
														height: "32px",
													}}>
													<input
														value={truckName}
														style={{
															position:"relative",
															zIndex: "2",
															width: "180px",
															padding: "5px 5px",
															border: "1px solid #BABABA",
															outline: "none",
															borderRadius: "8px",
														}}
														type='text'
														onChange={(e) =>
															handleAddTruckNameChange(
																e
															)
														}
													/>
													<div
														className='inpuDivider'
														style={{
															zIndex: "3",
															backgroundColor:
																"white",
															width: "10px",
															height: "32px",
														}}></div>
													<button
														style={{
															fontFamily:
																"Noto Sans",
															cursor: "pointer",
															marginLeft: "0",
															padding: "2px 15px",
															backgroundColor:
																"#216AAC",
															border: "none",
															borderRadius: "4px",
															color: "white",
															zIndex: "2",
														}}
														onClick={() =>
															handleSaveAddTruckName()
														}>
														Save
													</button>
												</div>

												<div className='dropDownValues'>
													{truckNameSuggestion.map(
														(val) => (
															<>
																<div className='truckValue'>
																	<img
																		src='/images/truckNameImg.svg'
																		alt=''
																	/>
																	<p
																		onClick={() =>
																			onPickupSuggestionHandler(
																				val
																			)
																		}>
																		{val}
																	</p>
																</div>
															</>
														)
													)}
												</div>
											</>
										);
									})}
								</>
							)}
						</div>
						{/* ----------Company Name------------- */}
						<div
							className='companyName'
							style={{ cursor: "pointer" }}
							onClick={() => handleScreen(item.id)}>
							<p style={{textDecoration:"underLine"}}>
								{item.company[0].company1} +{" "}
								{item.company.length} others
							</p>
						</div>

						{/* ------------Route-------------- */}
						<div className='route'>
							<p>{item.route}</p>
						</div>

						{/* ------------Person Name----------- */}
						<div className='person'>
							{item.person ? (
								<>
									<div
										className='personContainer'
										id='personContainer'
										style={{
											cursor: "pointer",
											display: showChangeInput
												? "flex"
												: "none",
										}}>
										<div className='person-img'>
											<img src='' alt='' />
										</div>
										<p style={{textDecoration:"underLine"}}>{item.person}</p>
										<div
											className='change-name'
											style={{ cursor: "pointer" }}
											onClick={() => handleChangeName()}>
											<img
												src='/images/changeName.svg'
												alt=''
											/>
											<p>Change</p>
											<img
												src='/images/changeNameDd.svg'
												alt=''
											/>
										</div>
									</div>
									<div
										className='changeDriverDiv'
										id='changeDriverDiv'
										style={{
											display: hideChangeInp
												? "none"
												: "flex",
										}}>
										{/* {
                        changeInp.map((data,i) => {
                            return( */}
										<>
											{/* <div className="changeDriverDiv" style={{display: hideChangeInp ? "flex":"none"}}> */}

											<div
												className='input-btn'
												id='driverNameInp'
												style={{
													display: "flex",
													width: "255px",
													zIndex: "2",
													backgroundColor: "white",
													height: "30px",
												}}>
												<input
													value={changeDriverName}
													style={{
														zIndex: "2",
														width: "180px",
														padding: "5px 5px",
														border: "1px solid #BABABA",
														outline: "none",
														borderRadius: "8px",
													}}
													type='text'
													onChange={(e) =>
														handleDriverNameChange(
															e
														)
													}
												/>
												<div
													className='inpuDivider'
													style={{
														zIndex: "3",
														backgroundColor:
															"white",
														width: "10px",
														height: "32px",
													}}></div>
												<button
													style={{
														cursor: "pointer",
														fontFamily: "Noto Sans",
														padding: "2px 15px",
														backgroundColor:
															"#216AAC",
														border: "none",
														borderRadius: "4px",
														color: "white",
														zIndex: "2",
													}}
													onClick={() =>
														handleChangeDriverNameSave()
													}>
													Save
												</button>
											</div>

											<div className='dropDownValues'>
												{driverNameSuggestion.map(
													(val) => (
														<>
															<div className='truckValue'>
																<img
																	src='/images/personDropDown.svg'
																	alt=''
																/>
																<p
																	onClick={() =>
																		onChangeDriverDropDownHandler(
																			val
																		)
																	}>
																	{val}
																</p>
															</div>
														</>
													)
												)}
											</div>
										</>
										{/* //         )
                    //     })
                    // } */}
									</div>
								</>
							) : (
								<>
									<div
										className='add-btn'
										style={{
											display: showLinkD
												? "flex"
												: "none",
											alignItems: "center",
											cursor: "pointer",
										}}
										onClick={() => handleDriverAdd()}>
										<img
											src='/images/driverName.svg'
											alt=''
											style={{ marginLeft: "3px" }}
										/>

										<p
											style={{
												color: "#216CB0",
												fontSize: "14px",
												fontWeight: "400",
												textDecoration:"underLine"
											}}>
											Add Driver
										</p>
									</div>

									{arrD.map((data, i) => {
										return (
											<>
												<div className='addDriverDiv'>
													<div
														className='input-btn1'
														style={{
															display: "flex",
															width: "265px",
															zIndex: "2",
															backgroundColor:
																"white",
															height: "30px",
														}}>
														<input
															value={driverName}
															style={{
																zIndex: "2",
																width: "180px",
																padding:
																	"5px ",
																border: "1px solid #BABABA",
																outline: "none",
																borderRadius:
																	"8px",
															}}
															type='text'
															onChange={(e) =>
																handleAddDriverInpChange(
																	e
																)
															}
														/>
														<div
															className='inpuDivider'
															style={{
																zIndex: "3",
																backgroundColor:
																	"white",
																width: "10px",
																height: "32px",
															}}></div>
														<button
															style={{
																cursor: "pointer",
																fontFamily:
																	"Noto Sans",
																padding:
																	"2px 15px",
																backgroundColor:
																	"#216AAC",
																border: "none",
																borderRadius:
																	"4px",
																color: "white",
																zIndex: "2",
															}}
															onClick={() =>
																handleSaveAddDriver()
															}>
															Save
														</button>
													</div>

													<div className='dropDownValues'>
														{driverNameSuggestion.map(
															(val) => (
																<>
																	<div className='truckValue'>
																		<img
																			src='/images/personDropDown.svg'
																			alt=''
																		/>
																		<p
																			onClick={() =>
																				onDriverDropDownHandler(
																					val
																				)
																			}>
																			{
																				val
																			}
																		</p>
																	</div>
																</>
															)
														)}
													</div>
												</div>
											</>
										);
									})}
								</>
							)}
						</div>
					</div>

					{/* ----------------Contact Icons------------- */}
					<div className='tripContact'>
						{/* ----------Contact Icons--------- */}
						<div className='tripContact-icons'>
							<div className='call'>
								<img src='/images/phone.svg' alt='' />
							</div>
							<div className='message'>
								<img src='/images/Chat.svg' alt='' />
							</div>
							<div className='menu'>
								<img src='/images/verticalMenu.svg' alt='' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ScheduleCards;
