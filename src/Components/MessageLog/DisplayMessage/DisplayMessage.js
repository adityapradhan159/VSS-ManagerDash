import React from "react";
import MessageTextArea from "../MessageTextArea/MessageTextArea";
import "./displayMessage.css";

const DisplayMessage = ({ item }) => {
	return (
		<>
			{/* ---------------Message Displayer---------------- */}
			<div className='displayMessage'>
				<div className='msgPersonName'>
					<h2>{item?.personName}</h2>
				</div>

				<div className='messageDisplayer'>
					<div className='messageDay'>
						<div className='messageDay-Container'>Today</div>
					</div>

					{item?.messages.map((value) => (
						<div
							className='textMessages-container'
							style={
								value.by == "customer"
									? {
											display: "flex",
											justifyContent: "flex-end",
									  }
									: {
											display: "flex",
											justifyContent: "flex-start",
									  }
							}>
							<div className='textMessages'>{value.msg}</div>
							<p className='messageTime'>{value.time}</p>
						</div>
					))}
				</div>

				{/* ----------------Text Area Message--------------- */}
				<div className='writeMessage'>
					<MessageTextArea />
					{/* <div className='notify'>
            <textarea placeholder='Notify'>

            </textarea>
            <div className="voiceIcon">
            <img src="./images/voiceMessage.svg" alt="" />
            </div>
            <div className="sendNotification">

            <div className="sendNotification-Container">

               
                <div className="smsNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="smsPara">
                    <p>SMS</p>
                </div>
                </div>

                
                <div className="whatsappNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="whatsappPara">
                    <p>Whatsapp</p>
                </div>
                </div>

             
                <div className="appNotify">
                <input type="checkbox" className='checkboxSendNotification'/>
                <div className="appPara">
                    <p>In app Notification</p>
                </div>
                </div>

            </div>
            
            </div>
        </div>
        <div className="send-btn">
            <img src="./images/rightArrow.svg" alt="" />
        </div> */}
				</div>
			</div>
		</>
	);
};

export default DisplayMessage;
