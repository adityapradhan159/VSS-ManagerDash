import React,{useState} from 'react'
import ClientDetails from '../ClientDetailsPage/ClientDetails';
import ActiveScheduled from './ActiveScheduled/ActiveScheduled'
import "./sidebar.css"

const Sidebar = () => {

  const [isNavbarExtended, setNavbarExtended] = useState(false);
 

  return (
    <>
    <div className='sidebar'>

      <div className="sidebar-container">
        {/* ------------SearchBar and Nav Button----------- */}
        <div className="searchBar-NavBtn">
            <div className="searchBar">
                <input className='search-inp' type="text" placeholder='Search'/>
            </div>

            <div className="NavBtn" onClick={() => {setNavbarExtended(!isNavbarExtended)}}>
              <img src={isNavbarExtended ? "/images/close.svg" : "/images/navMenu.svg"}  alt="" className='nav-menu'/> 
            </div>

            <div className={isNavbarExtended ? "side-nav expanded" : "side-nav"}>
                <div className="side-nav-container">
                  <div className="source">
                    <p>Source</p>
                    <img src="/images/dropDown.svg" alt="" />
                  </div>

                  <div className="destination">
                    <p>Destination</p>
                    <img src="/images/dropDown.svg" alt="" />
                  </div>

                  <div className="client">
                    <p>Client</p>
                    <img src="/images/dropDown.svg" alt="" />
                  </div>

                  <div className="zone">
                    <p>Zone</p>
                    <img src="/images/dropDown.svg" alt="" />
                  </div>


                  <div className="tripStatus">
                    <p>Trip Status</p>
                    <img src="/images/dropDown.svg" alt="" />
                  </div>

                  <div className="filter">
                    <img src="/images/filterIcon.svg" alt="" />
                    <p>More Filters</p>
                  </div>
                </div>
            </div>
        </div>

       
      </div>
      
      {/* <div className="divider"></div> */}

      <ActiveScheduled/>   
          
    </div>
    
    </> 
  )
}

export default Sidebar