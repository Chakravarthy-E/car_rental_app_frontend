import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CarContextDetails } from "../context/CarContext";
import Nav from "../components/Nav";
import { Image } from "cloudinary-react";
import axios from "axios";
import "./styles/mybookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const { bookingDetails, setBookingDetails, verifieduser, setverifieduser } =
    useContext(CarContextDetails);

  useEffect(() => {
    const autherization = window.localStorage.getItem("authe_user");

    if (autherization) {
      setverifieduser(autherization);
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const [cancelBooking, setcancelBooking] = useState(false);

  const headers = {
    Authorization: verifieduser,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    async function Mycart() {
      if (verifieduser) {
        try {
          const data = await axios.get(
            "https://car-rental-backend-7pjq.onrender.com/getallbookcar",
            { headers }
          );
          console.log("MyBookings", data);
          setBookingDetails([...data.data]);
          setcancelBooking(false);
          if (data.status === 201) {
          }
        } catch (error) {
          console.log("mybooking", error);
          if (error.response.status === 302) {
            navigate("/");
          }
        }
      }
    }

    Mycart();
  }, [cancelBooking, verifieduser]);

  const handleEdit = (booking) => {
    setIsEditing(true);

    const editcardetails = window.localStorage.setItem(
      "usereditbooking",
      JSON.stringify(booking)
    );
    console.log("usereditbooking", editcardetails);
    //setEditedBooking(booking);usereditbooking
    navigate(`/editcar/${booking.carid}`);
  };

  const handleCancel = async (bookingid) => {
    // Add your cancellation logic here
    // Remove the canceled booking from the booking details array

    try {
      const data = await axios.post(
        "https://car-rental-backend-7pjq.onrender.com/deletecar",
        { bookingid },
        { headers }
      );
      console.log(data);
      setcancelBooking(true);
    } catch (error) {
      console.log("mybooking", error);
    }
  };

  return (
    <div className="my-bookings">
      <Nav />
      <div className="booking-details">
        <h4 className="text-light">My Bookings</h4>
        {bookingDetails[0] &&
          bookingDetails.map((booking) => (
            <div
              key={booking._id}
              className="card mb-3 mx-5"
              style={{ backgroundColor: "#526D82" }}
            >
              {console.log(booking)}
              <div className="row g-0">
                <div className="col-md-4">
                  <Image
                    cloudName="dtyutg5l9"
                    publicId={booking.image}
                    width="300"
                    crop="scale"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title text-light"> {booking.name}</h5>
                    <p className="card-text">Model: {booking.model}</p>
                    {/* Display other booking details */}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(booking)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MyBookings;
