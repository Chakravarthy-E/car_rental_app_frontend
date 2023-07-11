import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav.jsx";
import "./styles/destination.css"
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext.js";
import Home from "../components/Home.jsx";

const Destination = () => {
  // const TokenUser = JSON.parse(localStorage.getItem("token-user"))
  const {setheaderData,inputdata,setInputData} = useContext(CarContextDetails)
  const navigate = useNavigate()

  useEffect(()=>{
      
    console.log(inputdata)
  },[inputdata])

 

  useEffect(() => {
    // Save data to local storage whenever it changes
    const data=window.localStorage.setItem('my_data', JSON.stringify(inputdata));
    console.log(data);
  });
  
const handleInput =(e) => {
    const name = e.target.name;
    const value = e.target.value
    setInputData({...inputdata,[name]:value})
}

const save = (e) => {
  e.preventDefault()
  const {origin,destination,startDate,endDate} = inputdata;
  // const data = new FormData()
  // data.append("origin",origin)
  // data.append("destination", destination)
  // data.append("startDate", startDate)
  // data.append("endDate", endDate)
  console.log(inputdata);
  //setheaderData(inputdata)
  navigate('/orderpage')
  
}

  return (<>
    <div className="destination">
      <Nav />
      <h4 className="text-center mt-3 text-light">Your Journey, Our Wheels</h4>
      <div className="container mt-3">
        <form onSubmit={save} >
          <div className="mb-2">
            <label className="form-label text-dark">Origin Name</label>
            <input
              type="text"
              className="form-control"   style={{backgroundColor:"#9DB2BF"}}
              name="origin"
              onChange={handleInput}
              required
            
            />
          </div>

          <div className="mb-2">
            <label className="form-label text-dark">Destination Name</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              onChange={handleInput}
              required
              style={{backgroundColor:"#9DB2BF"}}
            />
          </div>

          <div className="mb-2">
            <label className="form-label text-dark">Starting Date</label>
            <input
              type="date"
              className="form-control"
              name="startdate"
              onChange={handleInput}
              required
              style={{backgroundColor:"#9DB2BF"}}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-dark">End Date</label>
            <input
              type="date"
              className="form-control"
              name="enddate"
              onChange={handleInput}
              required
              style={{backgroundColor:"#9DB2BF"}}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Destination;
