import React from 'react';
import "./messageCard.css"

const MessageCard = ({item,handleChatId}) => {

    const handleMessageClick =(id) => {
        handleChatId(id)
    }

  return (
    <div className='MessageCard' onClick={() => handleMessageClick(item.id)}>
        <div className="messageCard-Container">

            {/* -------------Person Image------------ */}
            <div className="personImage">
                <img src={item.personImg} alt="" />
            </div>

            {/* ----------Person Details-------------- */}

            <div className="personDetailsMsg">

                <div className="personNameCategory">
                   <div className="personName">
                    <h2 style={{marginBottom:"0px"}}>{item.personName}</h2>
                   </div>

                   {
                    item.category ? (<div style={item.category == "Driver" ? {backgroundColor:"#F0FFFC",color:"#44B49C"} 
                    : item.category == "Group" ? {backgroundColor:"#F3F1FF",color:"#7B61FF"}
                    : item.category == "Client" ? {backgroundColor:"#F0F0F0",color:"#373737"} : ""} className="personCategory" >
                                        <p style={{marginBottom:"0px"}}>{item.category}</p>
                                    </div>) : ""
                   }
                    
                </div>

                <div className="personCompanyName">
                    <p style={{marginBottom:"0px"}}>{item.companyName}</p>
                </div>

                <div className="personLastMsg">
                    <p style={{marginBottom:"0px"}}>{item.messages[0].msg}</p>
                </div>
            </div>

            {/* ---------Last Message Time---------- */}

            <div className="lastMsgTime">
                <p>{item.messages[0].time}</p>
            </div>
        </div>
    </div>
  )
}

export default MessageCard