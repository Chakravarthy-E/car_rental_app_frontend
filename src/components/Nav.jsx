import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/nav.css";
import axios from "axios";
import sedan from "../images/sedan.png"
// Import the CSS file for styling

const Nav = () => {
  const navigate = useNavigate();

  // async function logOutHandler() {

  //     console.log("hello")
  //   try{
  //     const value = await axios.get("http://localhost:5000/logoutuser",{withCredentials:true})
  //   }
  //   catch(error){
  //       console.log(error)
  //       if(error.response.status === 302){
  //         window.localStorage.clear()
  //         window.location.href='/'
  //     }  
  //   }
  //   // localStorage.clear();
  //   //navigate("/");
  // }

  function logOutHandler(){

    window.localStorage.clear();
    navigate("/");
  }

  return (
    <div className="nav-container" style={{backgroundColor:"#526D82"}}>
      <div className="logo" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <span>Speedy</span>
      </div>
      <div className="links d-flex justify-content-center align-items-center gap-2">
        <Link to="/mybookings" className="link text-light">
          My Bookings
        </Link>
        <button className="text-light rounded" onClick={logOutHandler}>Log Out</button>
      </div>
    </div>
  );
};

export default Nav;
