import React,{useState,useEffect} from 'react'
import BroadcastMessage from '../BroadcastMessage/BroadcastMessage';
import DisplayMessage from '../DisplayMessage/DisplayMessage';
import MessageCard from '../MessageCard/MessageCard';
import "./messageBox.css"

const MessageBox = () => {

  const handleBroadcast =() => {
    const displayMessageContainer = document.getElementById("displayMessageContainer");
    displayMessageContainer.style.display= "none"

    const broadcastContainer = document.getElementById("broadcastContainer");
    broadcastContainer.style.display= "flex"

  }

  const handleMessage =() => {
    const displayMessageContainer = document.getElementById("displayMessageContainer");
    displayMessageContainer.style.display= "flex"

    const broadcastContainer = document.getElementById("broadcastContainer");
    broadcastContainer.style.display= "none"

  }




  // Store ID
  const [personChatId,setPersonChatId] = useState(null)

  const handleChatId = (id) => {
    setPersonChatId(id)
  }


  // Toggle tabs
  const [toggleState, setToggleState] = useState(1);
  
  const toggleTab = (index) => {
    setToggleState(index);
  };

 

  // State to store data from json
  const [messageData,setMessageData]=useState([]);
  
  // Fetch Data..
  const getMessageData = () => {
    fetch('/message.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setPersonChatId(0)
        setMessageData(myJson)
      });
  }
  useEffect(()=>{
    getMessageData()
  },[])


  return (

    <>

    <div className="messageLogContainer">

      {/* --------------Message Log Sidebar-------------------- */}
      <div className='MessageBox'>
        <div className="messageBox-container">

          <div className="messageHeader">
            <h2>Message Logs</h2>
          </div>


          <div className="boardCast" onClick={handleBroadcast}>
            <div className="boardCastPara" >
              <p style={{marginBottom:"0px"}}>Broadcast A Message</p>
            </div>
            <div className="addCircle">
              <img src="/images/addCircle.svg" alt="" />
            </div>
          </div>

          <div className="searchMessageInp">
            <input type="text" placeholder='Search'/>
          </div>
        </div>


    {/* -----------------Tabs---------------- */}
       
    <div className="MessageTabContainer">
      <div className="CategoryBloc-tabs">

        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
          All 
        </button>

        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
          Client
        </button>

        <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
          Driver
        </button>

        <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>
          Group
        </button>

      </div>

      <div className="content-tabs" id='content-tabs' onClick={handleMessage}>
      {/* ------------All----------------- */}
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
        {
          messageData.map((item) =>(
            <MessageCard item={item} handleChatId={handleChatId}/>
        ))
          
        }
        </div>

      {/* -----------Client--------------- */}
        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          
        {
          messageData.filter((value) => value.category == "Client").map((item) => (
            <MessageCard item={item} handleChatId={handleChatId}/>
          ))
        }
        </div>

       {/* -----------Driver--------------- */}
        <div className={toggleState === 3 ? "content  active-content" : "content"}>
        {
          messageData.filter((value) => value.category == "Driver").map((item) => (
            <MessageCard item={item} handleChatId={handleChatId}/>
          ))
        }
        </div>

      {/* -------------Group------------------- */}
        <div className={toggleState === 4 ? "content  active-content" : "content"}>
        {
          messageData.filter((value) => value.category == "Group").map((item) => (
            <MessageCard item={item} handleChatId={handleChatId}/>
          ))
        }
        </div>
      </div>
    </div>


        {/* ----------MessageLogs - Chat Operator-------------- */}
        <div className="messageLogChatOperator">

          <div className="messageLogs">
            <img src="/images/messageLogs.svg" alt="" />
            <p style={{marginBottom:"0px"}}>Message Logs</p>
          </div>

          <div className="chatOperator">
            <img src="/images/chat.svg" alt="" />
            <p style={{marginBottom:"0px"}}>Chat With Operator</p>
          </div>
        </div>
       
    </div>
      
      <div className="displayMessageContainer" id='displayMessageContainer'>
        {
         personChatId !== null && <DisplayMessage item={messageData[personChatId]}/>
        }
      </div>

      <div className="broadcastContainer" id='broadcastContainer'>
        {
            <BroadcastMessage/>
        }
      </div>

  </div>
    </>
  )
}

export default MessageBox