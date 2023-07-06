import "./mailList.css";
import React from 'react';

export const MailList = () => {

  const  handleClick = () => {
  alert("Subscription Added !");
  document.getElementById("myInput").value = "";
}

  return (
    <div className="mail">
        <h2 className="mailTitle">Save time, Save money</h2>
        <span className="mailDesc"> Sign up and We will send the best deals to you</span> 
        <div className="mailInputContainer">
            <input type="text" id="myInput" placeholder="Your Email" />
            <button onClick={()=>handleClick()} >Subscribe</button>
        </div>

    </div>
  )
}
