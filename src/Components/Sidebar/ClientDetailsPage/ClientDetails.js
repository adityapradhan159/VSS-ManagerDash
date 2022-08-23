import React, { useState,useEffect} from 'react';
import "./clientDetails.css"

const ClientDetails = ({isScreenShown, setScreenShown,item}) => {

    const [tabId,setTabId] = useState(0)

    const handleDismiss = () => {
        if(isScreenShown === true){
            setScreenShown(false);
            setTabId(0)  
        }
    }

    const [comptoggleState, setCompToggleState] = useState(0);

    const handleTabChange = (id) => {
        setTabId(id);
        // console.log(value);
        setCompToggleState(id)
    }
    
    useEffect(() => {
        setTabId(0)
        setCompToggleState(0)
    }, [item])
    
    


  return (
    <div className={isScreenShown ? "ClientDetails expanded" : "ClientDetails"}>
        <div className="clientDetailsContainer">

        {/* -------Client Header & Dismiss Button---------- */}
            <div className="clientHeaderButton">
                <div className="clientHeader">
                    <h2>Clients</h2>
                </div>
               <div className="menu-close-btn" onClick={handleDismiss}>
                    <img style={{cursor:"pointer"}} src="./images/dismissBtn.svg"  alt="" />
               </div>  
            </div>

        {/* ---------Truck Name & Status--------- */}

        {/* --------If name is present than show nam and status */}

        {
            item.name && (
            <>
                <div className="truckNameStatus">
                {/* ----------Name------- */}
                <div className="truckName">
                    <p>
                        {item.name}
                    </p>
                </div>

                <div className="nameStatusDivider"></div>

                {/* --------Status--------- */}
                <div className="truckStatus">
                    <div className="truck-img">
                        <img src="./images/clientDetailsTruck.svg" alt="" />
                    </div>
                    <div className="statusDetails">
                        <p>
                            {item.truckStatus}
                            </p>
                    </div>
                </div>
            </div>

            </>
            )
            
          
        }
            {/* <div className="truckNameStatus">
                {/* ----------Name------- */}
                {/* <div className="truckName">
                    <p>
                        {item.name}
                    </p>
                </div>

                <div className="nameStatusDivider"></div> */}

                {/* --------Status--------- 
                <div className="truckStatus">
                    <div className="truck-img">
                        <img src="./images/clientDetailsTruck.svg" alt="" />
                    </div>
                    <div className="statusDetails">
                        <p>
                            {item.status}
                            </p>
                    </div>
                </div>
            </div> */}

            
        </div>
        {/* -----------Company List----------- */}

        <div className="tabContainer">
            <div className="companyNameImg">
            {
               item?.company?.map((value) => (
                <>
                    <div className={ comptoggleState === (value.id)? "companyNameImgContainer active-comp": "companyNameImgContainer"} style={{cursor:"pointer"}} onClick={() => handleTabChange(value.id,value)}>
                        <div className="companyImg">
                            <img className='img-comp' src="./images/companyImg.svg" alt="" />
                            <img className='cancelBtn' src="./images/cancelBtn.svg" alt="" />
                        </div>
                        <div className="companyDetailsName">
                            <p>
                                {value.company1}
                            </p>
                        </div>  
                    </div>
                </>
                ))
            }
            </div>

        <div className="dividerUnderline"></div>

        <div className="clientDetailsContainer2">
            {/* ---------Selected Comapny Name--------- */}
            <div className="singleCompanyDetails">
                <div className="mainCompanyImg"></div>
                <div className="mainComapnyDetails">
                    <h2>
                        {item?.company[tabId]?.company1}
                       
                    </h2>
                    <p>View Details</p>
                </div>
            </div>

            {/* -----------Comapny Address-------------- */}
                <div className="companyAddress">
                    <h4>Address</h4>
                    <h3>
                        {item?.company[tabId]?.address}
                    </h3>
                </div>

                <div className="RegistrationDetails">
                    <div className="registrationCity">
                        <h4>Registration City</h4>
                        <h3>  
                            {item?.company[tabId]?.RegistrationCity}
                        </h3>
                    </div>

                    <div className="registrationState">
                        <h4>Registration State</h4>
                        <h3> 
                            {item?.company[tabId]?.RegistrationState}
                        </h3>
                    </div>
                </div>
            </div>    
    </div>
    </div>
  )
}

export default ClientDetails