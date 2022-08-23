import React from 'react'
import "./customerListCard.css"

const CustomerListCard = ({item}) => {
  return (
    <div className='CustomerListCard'>
        <div className="custImage">
            <img src={item.image} alt="" />
        </div>
        <div className="custName">
            <h2>{item.custName}</h2>
        </div>
        <div className="custCategory">
            <p style={item.category == "driver" ? {color:"#44B39B",backgroundColor:"#E2FEF8"}: {color:"#373737",backgroundColor:"#F0F0F0"}}>{item.category}</p>
        </div>
    </div>
  )
}

export default CustomerListCard