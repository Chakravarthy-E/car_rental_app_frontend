import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  async function Handleclick(e) {
    e.preventDefault();
  
    if (!email || !password) {
      seterror("All Fields Are Required");
    } else if (email.indexOf('@') === -1) {
      seterror("Email must contain @");
    } else {
      try {
        const response = await axios.post("https://car-rental-backend-7pjq.onrender.com/adminlogin", { email, password });
        const data = response.data; // Access the data property of the response
        
        console.log(data);
        
        if (data.autherization) {
          window.localStorage.setItem('authe_admin', JSON.stringify(data.autherization));
        }
        
        navigate("/helloadmin");
      } catch (error) {
        console.log("error from frontend", error);
        seterror(error.response.data);
      }
    }
  }
  
  return (
    <div>
      <form>
        {!error ? (
          <h4 className="text-light">Login Admin Account</h4>
        ) : (
          <h4 className="text-light1">{error}</h4>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setemail(e.target.value);
            seterror("");
          }}
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setpassword(e.target.value);
            seterror("");
          }}
        />
        <button onClick={Handleclick}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
