import React from "react";
import "./messageTextArea.css";

const MessageTextArea = () => {
	return (
		<div className='writeMessageContainer'>
			<div className='notify'>
				<textarea placeholder='Notify'></textarea>
				<div className='voiceIcon'>
					<img src='/images/voiceMessage.svg' alt='' />
				</div>
				<div className='sendNotification'>
					<div className='sendNotification-Container'>
						{/* ----------SMS----------- */}
						<div className='smsNotify'>
							<input
								type='checkbox'
								className='checkboxSendNotification'
							/>
							<div className='smsPara'>
								<p>SMS</p>
							</div>
						</div>

						{/* ----------Whatsapp----------- */}
						<div className='whatsappNotify'>
							<input
								type='checkbox'
								className='checkboxSendNotification'
							/>
							<div className='whatsappPara'>
								<p>Whatsapp</p>
							</div>
						</div>

						{/* ----------App Notification----------- */}
						<div className='appNotify'>
							<input
								type='checkbox'
								className='checkboxSendNotification'
							/>
							<div className='appPara'>
								<p>In app Notification</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='send-btn'>
				<img src='/images/rightArrow.svg' alt='' />
			</div>
		</div>
	);
};

export default MessageTextArea;
