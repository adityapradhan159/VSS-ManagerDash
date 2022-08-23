import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import MessageTextArea from "../MessageTextArea/MessageTextArea";
// import MessageTextArea from "/MessageTextArea/MessageTextArea";
import "./broadcastMessage.css";

const BroadcastMessage = () => {
	// State to store data from json.....................
	const [customerData, setCustomerData] = useState([]);

	// Show TextArea ......................
	const [showTextArea, setShowTextArea] = useState(false);

	// Show Selected Count.................
	const [showselectedCount, setShowselectedCount] = useState(false);

	// Show Selected Button.................
	const [showselectedBtn, setShowselectedBtn] = useState(true);

	// Fetch Data..
	const getCustomerData = (type) => {
		fetch("/customerList.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (type == "all") {
					setCustomerData(myJson);
				} else {
					const CustomerCategory = myJson.filter(
						(value) => value.category == type
					);
					setCustomerData(CustomerCategory);
				}
			});
	};
	useEffect(() => {
		getCustomerData("all");
	}, []);

	// Toggle tabs
	const [toggleBroadcastState, setToggleBroadcastState] = useState(1);

	const toggleTab = (index, type) => {
		setToggleBroadcastState(index);
		getCustomerData(type);
	};

	// Selected Option inside Input
	const [selectedOption, setSelectedOption] = useState([]);

	const selectOp = (selected, option) => {
		console.log(option);
		console.log(selected);
		const arr = [];
		selected.forEach((item) => {
			const temp = {
				custName: item.custName,
				id: item.id,
				category: item.category,
			};
			arr.push(temp);
		});

		setShowTextArea(true);

		setSelectedOption(arr);

		setShowselectedBtn(true);

		if (selectedOption.length < 0) {
			setShowselectedCount(false);
		} else {
			setShowselectedCount(true);
		}
	};

	// Custom Styling for Select Component
	const customStyles = {
		control: () => ({
			width: "100%",
			
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#FAFAFA",
			boxShadow: "none",
			fontFamily: "Noto Sans",
			

		}),
		menu: () => ({
			width: "350px",
			maxHeight: "500px",
			height: "auto",
			display: "flex",
			boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
			// overflowY:"auto",
			// overflowX:"hidden",
			marginLeft: "20px",
			marginTop: "0px",
			zIndex: "99",
			position: "absolute",

			backgroundColor: "white",
			// "::-webkit-scrollbar": {
			//   width: "10px",
			//   height: "0px",
			// },
			// "::-webkit-scrollbar-track": {
			//   backgroundColor: "#F0F0F0"
			// },
			// "::-webkit-scrollbar-thumb": {
			//   backgroundColor: "#5E5E62",
			//   borderRadius: "20px"
			// },

			// "::-webkit-scrollbar-button:single-button":{
			//   backgroundColor:" #eee",
			//   display: "block",
			//   backgroundRepeat: "no-repeat"
			// },

			// "::-webkit-scrollbar-button:single-button:vertical:increment" : {
			//   height:" 10px",
			//   width: "16px",
			//   backgroundPosition: "center 4px",
			//   backgroundImage: "url(./././public/images/scrollbarDown.svg)",
			// },

			// "::-webkit-scrollbar-button:single-button:vertical:decrement" : {
			//   height: "10px",
			//   width: "16px",
			//   backgroundPosition: "center 4px",
			//   backgroundImage: "url(./././public/images/scrollbarUp.svg)",
			// },
		}),
		menuList: (base) => ({
			...base,
			width: "350px",
			height: "40px",
		}),
		multiValue: (style, { data }) => ({
			...style,
			height:"30px",
			padding:"0px",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			fontSize:"20px",
			backgroundColor: data.category == "driver" ? "#E3FFF9" : "#F0F0F0",
			color: data.category == "diver" ? "#44B49C" : "black",
		}),
		multiValueLabel: (style, { data }) => ({
			...style,
			height:"30px",
			padding:"0px",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			fontSize:"14px",
			backgroundColor: data.category == "driver" ? "#E3FFF9" : "#F0F0F0",
			color: data.category == "diver" ? "#44B49C" : "black",
		}),
		multiValueRemove: (style, { data }) => ({
			...style,
			height:"30px",
			padding:"0px",
			width:"25px",
			marginLeft:"4px",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",
			fontSize:"13px",
			backgroundColor: data.category == "driver" ? "#E3FFF9" : "#F0F0F0",
			color: data.category == "diver" ? "#44B49C" : "black",
		}),
	};

	// Custom Menu List Component
	const CustomMenu = ({ ...props }) => {
		const handleSelctall = () => {
			setSelectedOption(customerData);

			setShowselectedBtn(false);
			setShowselectedCount(true);
		};

		return (
			<>
				<div style={{ width: "350px" }}>
					<div
						className='BroadcastBloc-tabs'
						style={{ height: "40px" }}>
						<button
							className={
								toggleBroadcastState === 1
									? "broadCastTabs active-tabs"
									: "broadCastTabs"
							}
							onClick={() => {
								toggleTab(1, "all");
							}}>
							All
						</button>

						<button
							className={
								toggleBroadcastState === 2
									? "broadCastTabs active-tabs"
									: "broadCastTabs"
							}
							onClick={() => {
								toggleTab(2, "client");
							}}>
							Clients
						</button>

						<button
							className={
								toggleBroadcastState === 3
									? "broadCastTabs active-tabs"
									: "broadCastTabs"
							}
							onClick={() => {
								toggleTab(3, "driver");
							}}>
							Drivers
						</button>
					</div>
					<div className='selectAll'>
						<div
							className='selectAllBtn'
							style={
								showselectedBtn
									? { display: "flex" }
									: { display: "none" }
							}
							onClick={() => handleSelctall()}>
							<img src='/images/selectAll.svg' alt='' />
							<div className='selectAllPara'>
								<h3 style={{ marginBottom: "0px" }}>
									Select All
								</h3>
							</div>
						</div>

						<div
							className='selectedCount'
							style={
								showselectedCount
									? { display: "flex" }
									: { display: "none" }
							}>
							<p style={{ marginBottom: "0px" }}>
								{selectedOption.length} Items Selected
							</p>
						</div>

						<div className='selectCancel'>
							<img src='/images/dismiss.svg' alt='' />
						</div>
					</div>

					<div className='OptionDiv'>{props.children}</div>
				</div>
			</>
		);
	};

	// MultiValueContainer for Styling..........................
	const MultiValueContainer = (props) => {
		return (
			<>
				<components.MultiValueContainer {...props} />
			</>
		);
	};

	// Options List...........................
	const MyOption = (props) => {
		const { innerProps, innerRef } = props;

		return (
			<>
				<div
					className='optionsDiv'
					ref={innerRef}
					{...innerProps}
					style={{
						cursor: "pointer",
						height: "60px",
						width: "340px",
						padding: "10px",
						fontFamily: "Noto Sans",
						display: "flex",
						alignItems: "center",
					}}>
					<img src={props.data.image} alt='' />
					<div
						style={{
							marginLeft: "5px",
							fontSize: "19px",
							margin: "0px 10px",
						}}>
						{props.data.custName}
					</div>
					<div
						style={
							props.data.category == "driver"
								? {
										fontSize: "10px",
										padding: "2px 8px",
										borderRadius: "4px",
										color: "#44B39B",
										backgroundColor: "#E2FEF8",
								  }
								: {
										padding: "2px 8px",
										fontSize: "10px",
										color: "#373737",
										backgroundColor: "#F0F0F0",
								  }
						}>
						{props.data.category}
					</div>
				</div>
			</>
		);
	};

	return (
		<div className='BroadcastMessage'>
			{/*---------------- ----Input to select multiple values----------------- */}
			<div className='toBroadCast'>
				<div className='toPara'>
					<h2 style={{ marginBottom: "0px" }}>To : </h2>
				</div>
				<div className='selectDiv'>
					<Select
						getOptionLabel={(option) => option.custName}
						getOptionValue={(option) => option.id}
						options={customerData}
						value={selectedOption}
						styles={customStyles}
						onChange={(selected, option) =>
							selectOp(selected, option)
						}
						components={{
							MenuList: CustomMenu,
							Option: MyOption,
							MultiValueContainer,
							DropdownIndicator: () => null,
							IndicatorSeparator: () => null,
						}}
						isMulti={true}
					/>
				</div>
			</div>

			{/* ------------------Write Message------------------ */}

			<div
				className='writeMessage'
				style={
					showTextArea ? { display: "flex" } : { display: "none" }
				}>
				<MessageTextArea />
				{/* <div className='notify'>
            <textarea placeholder='Notify'>

            </textarea>
            <div className="voiceIcon">
            <img src="/images/voiceMessage.svg" alt="" />
            </div>
            <div className="sendNotification">

            <div className="sendNotification-Container"> */}

				{/* ----------SMS----------- */}
				{/* <div className="smsNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="smsPara">
                    <p>SMS</p>
                </div>
                </div> */}

				{/* ----------Whatsapp----------- */}
				{/* <div className="whatsappNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="whatsappPara">
                    <p>Whatsapp</p>
                </div>
                </div> */}

				{/* ----------App Notification----------- */}
				{/* <div className="appNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="appPara">
                    <p>In app Notification</p>
                </div>
                </div>

            </div>
            
            </div>
        </div>
        <div className="send-btn">
            <img src="/images/rightArrow.svg" alt="" />
        </div>
        </div> */}
			</div>
		</div>
	);
};

export default BroadcastMessage;
