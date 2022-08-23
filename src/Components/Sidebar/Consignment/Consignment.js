import React,{useState,useEffect} from 'react';
import "./consignment.css"

const Consignment = ({item}) => {

    const [minimize,setMinimize] = useState(true)

    const [showDetailBtn,setShowDetailBtn] = useState(false)

    const handleMinimize = () => {
        setMinimize(!minimize)
        setShowDetailBtn(true)
    }


    const handleShowDetails = () => {
        setMinimize(!minimize)
        setShowDetailBtn(false)
        console.log(item)
    }

    // useEffect(() => {
      
    
    // }, [item])
    

  return (
    <>
    <div className={minimize ? "ConsignmentLoad" : "ConsignmentLoad mini"} onClick={handleMinimize}>
        <div className="minimize-button">
                <div className='minimize-para'>
                    <p>Minimize</p>
                </div>
            </div>
        <div className="consignmentLoad-container">
            
            <div className="loadContent">
                <div className="loadContentHeader">
                    <img src="./images/load.svg" alt="" />
                    <div className="loadContentHeading">
                        <h4>Load Content</h4>
                    </div>
                </div>
                <p>{item?.loadContent}</p>
            
            </div>

            <div className="consignmentDetails">
                <div className="consignmenHeader">
                    <img src="./images/consignment.svg" alt="" />
                    <div className="consignmenHeading">
                        <h4>Consignment Details</h4>
                    </div>
                </div>
                <p>{item?.consignmentContent}</p>
            </div>

            <div className="noteDetails">
                <div className="noteHeader">
                    <img src="./images/note.svg" alt="" />
                    <div className="noteHeading">
                        <h4>Note</h4>
                    </div>
                </div>
                <p>{item?.noteContent}</p>
            </div>
        </div>
    </div>

    <div className={showDetailBtn ? "seeMoreDetailsBtn hide" : "seeMoreDetailsBtn"} onClick={handleShowDetails}>
        <div className="moreDetailsimg">
            <img src="./images/moreDetails.svg" alt="" />
        </div>
        <div className="moreDetailspara">
            <p>See More Details</p>
        </div>
    </div>

    </>
  )
}

export default Consignment