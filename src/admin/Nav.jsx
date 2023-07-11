import React from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css"; // Import the CSS file for styling
import axios from "axios";
import sedan from "../images/sedan.png"

const Nav = () => {

  // async function logOutHandler() {

  //   console.log("hello")
  // try{
  //   const value = await axios.get("http://localhost:5000/logoutuser",{withCredentials:true})
    
  // }
  // catch(error){
  //     console.log(error)
  //     if(error.response.status === 302){
  //       window.localStorage.clear()
  //       window.location.href='/'  
  //     }
  
  // }
  // }

  function logOutHandler(){

    window.localStorage.clear();
    
  }



  return (
    <div className="nav-container" style={{backgroundColor:"#526D82"}}>
      <div className="logo">
        <span>Speedy</span>
      </div>
      <div className="links">
      <button className="btn btn-primary text-decoration-none">
      <Link to="/" className="text-light rounded"  onClick={logOutHandler}>
        Log out
      </Link>
      </button>
      </div>
    </div>
  );
};

export default Nav;