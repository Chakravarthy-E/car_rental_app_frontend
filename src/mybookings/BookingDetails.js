import React, { useEffect } from "react";
import Nav from "../components/Nav";
import "./styles/bookingdetails.css";
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";
import { useContext, useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import exmap from "../images/hero_directions_api.png";

const CarDetails = ({
  setCurrentDate,
  setCurrentTime,
  currentDate,
  currentTime,
}) => {
  const {
    bookingDetails,
    setBookingDetails,
    inputdata,
    setInputData,
    verifieduser,
  } = useContext(CarContextDetails);

  useEffect(() => {
    const now = new Date();

    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
  }, []);

  return (
    <div className="car-details">
      {console.log(bookingDetails)}
      <h4 className="text-light">Car Details</h4>
      <ul>
        <li className="text-light">
          Car Name: <span className="text">{bookingDetails.name}</span>
        </li>
        <li className="text-light">
          Car Model: <span className="text">{bookingDetails.model}</span>{" "}
        </li>
        <Image
          cloudName="dtyutg5l9"
          publicId={bookingDetails.image}
          width="300"
          crop="scale"
        />
        {/* <img src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" alt="" style={{width:"200px",height:"200px",objectFit:'cover'}} /> */}
        <hr />
        <li className="text-light">
          Origin: <span className="text">{inputdata.origin}</span>{" "}
        </li>
        <li className="text-light">
          Destination: <span className="text">{inputdata.destination}</span>{" "}
        </li>
        <li className="text-light">
          StartDate: <span className="text">{inputdata.startdate}</span>
        </li>
        <li className="text-light">
          EndDate: <span className="text"> {inputdata.enddate}</span>
        </li>
        <hr />
        <li className="text-light">
          Booking Date: <span className="text">{currentDate}</span>{" "}
        </li>
        <li className="text-light">
          Booking Time: <span className="text"> {currentTime}</span>
        </li>
      </ul>
    </div>
  );
};

const PaymentDetails = ({ currentDate, currentTime }) => {
  const navigate = useNavigate();

  const { bookingDetails, inputdata, verifieduser } =
    useContext(CarContextDetails);

  const headers = {
    Authorization: verifieduser,
    "Content-Type": "application/json",
  };

  const {
    carid,
    name,
    type,
    model,
    milage,
    image,
    availableForm,
    availableTill,
    perKm,
    description,
    carDetails,
    Details,
  } = bookingDetails;

  const { origin, destination, startdate, enddate } = inputdata;

  const handleClick = async () => {
    try {
      const book = await axios.post(
        "https://car-rental-backend-7pjq.onrender.com/bookcar",
        {
          carid,
          name,
          type,
          image,
          model,
          origin,
          destination,
          startdate,
          enddate,
          currentDate,
          currentTime,
          perKm,
        },
        { headers }
      );
    } catch (error) {
      console.log(error);
    }

    navigate("/mybookings");
  };

  return (
    <div className="payment-details">
      <h3 className="text-light">Payment Details</h3>
      <ul>
        <li className="text-light">
          Price/Km: <span className=""> {bookingDetails.perKm}</span>
        </li>
        <li className="text-light">
          Distance: <span className="">100km</span>
        </li>
        <li className="text-light">
          Tax: <span className=""> 5%GST</span>
        </li>
        <li className="text-light">
          Grand Total:{" "}
          <span
            className="text"
            style={{ fontWeight: "bold", color: "lightgreen" }}
          >
            {bookingDetails.perKm * 3 + 50}
          </span>
        </li>
      </ul>
      <button className="rounded" onClick={handleClick}>
        Proceed
      </button>
    </div>
  );
};

const BookingDetails = () => {
  const { verifieduser } = useContext(CarContextDetails);

  const navigate = useNavigate();

  const headers = {
    Authorization: verifieduser,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    async function Allcar() {
      if (verifieduser) {
        try {
          const value = await axios.get(
            "https://car-rental-backend-7pjq.onrender.com/Userauth",
            { headers }
          );
          console.log(value);
          if (value.status == 200) {
          }
        } catch (error) {
          console.log("CarList", error);
          if (error.response.status == 302) {
            navigate("/");
          }
        }
      }
    }
    Allcar();
  }, [verifieduser]);

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Nav />
        <div className="booking-details">
          <div className="container">
            <div className="left-side">
              <CarDetails
                setCurrentDate={setCurrentDate}
                setCurrentTime={setCurrentTime}
                currentDate={currentDate}
                currentTime={currentTime}
              />
            </div>
            <div className="right-side">
              <PaymentDetails
                currentDate={currentDate}
                currentTime={currentTime}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
