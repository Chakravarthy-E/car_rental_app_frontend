import React, { useContext, useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import CarContext, { CarContextDetails } from "../context/CarContext";
import "./styles/addcar.css";

const AddCar = () => {
  const [name, setname] = useState("");
  const [cartype, setcartype] = useState("");
  const [model, setmodel] = useState("");
  const [milage, setmilage] = useState("");
  const [perKm, setperKM] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTill, setAvailableTill] = useState("");
  const [description, setdescription] = useState("");
  const [images, setimages] = useState(null);
  const [carDetails, setCarDetails] = useState("");
  const [Details, setDetails] = useState("");
  const fileInputRef = useRef(null);
  const [cloudinary, setcloudinary] = useState([]);
  const [public_id, setpublic_id] = useState("");

  const { verifiedadmin } = useContext(CarContextDetails);

  const navigate = useNavigate();

  const headers = {
    Authorization: verifiedadmin,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    async function adminvar() {
      try {
        const adminvar = await axios.get(
          "https://car-rental-backend-7pjq.onrender.com/adminAuth",
          { headers }
        );
        console.log("hello", adminvar);
      } catch (error) {
        console.log(error);
        if (error.response.status === 302) {
          navigate("/");
        }
      }
    }

    adminvar();
  }, [verifiedadmin]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setimages(file);
    console.log("handleImageUpload", file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setcloudinary([reader.result]);
      };
      reader.onerror = () => {
        console.error("error in image loading");
      };
    }
  };

  useEffect(() => {
    if (!public_id) {
      return;
    }

    async function sendDataToServer() {
      try {
        const data = await axios.post(
          "https://car-rental-backend-7pjq.onrender.com/addadmincar",
          {
            name,
            cartype,
            model,
            milage,
            perKm,
            availableFrom,
            availableTill,
            description,
            public_id,
            carDetails,
            Details,
          },
          { headers }
        );
        console.log(data);
        if (data.status === 201) {
          toast.success("Added successfully");
          setDetails("");
          setCarDetails("");
          setimages(null);
          setdescription("");
          setAvailableTill("");
          setAvailableFrom("");
          setperKM("");
          setname("");
          setcartype("");
          setmodel("");
          setmilage("");
          setpublic_id("");
          setcloudinary([]);
          fileInputRef.current.value = null;
        }
      } catch (err) {
        console.log(err);
      }
    }

    sendDataToServer();
  }, [public_id]);

  const handleImageDelete = () => {
    setimages(null);
    fileInputRef.current.value = null;
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log("hello");

    try {
      const publicid = await axios.post(
        "https://car-rental-backend-7pjq.onrender.com/api/upload",
        base64EncodedImage,
        {
          params: {
            name: name,
            model: model,
          },
          headers,
        }
      );

      setpublic_id(publicid.data);

      console.log(publicid);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(images);

    reader.onloadend = () => {
      uploadImage(cloudinary);
    };
    reader.onerror = () => {
      console.error("error in image loading");
    };
  };

  const handleCancel = () => {
    setDetails("");
    setCarDetails("");
    setimages(null);
    setdescription("");
    setAvailableTill("");
    setAvailableFrom("");
    setperKM("");
    setname("");
    setcartype("");
    setmodel("");
    setmilage("");
    setpublic_id("");
    setcloudinary([]);
    fileInputRef.current.value = null;
    navigate(`/helloadmin`);
  };

  return (
    <>
    <ToastContainer position="top-center" />
      <div style={{ backgroundColor: "#27374D" }}>
        <Nav />
        <div className="add-car-details-container">
          <div className="left-section">
            <h1 className="text-light">Add Car Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-light" htmlFor="carName">
                  Car Name:
                </label>
                <input
                  type="text"
                  id="carName"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="carType">
                  Type:
                </label>
                <input
                  type="text"
                  id="carType"
                  value={cartype}
                  onChange={(e) => setcartype(e.target.value)}
                />
                <label className="text-light" htmlFor="carModel">
                  Model:
                </label>
                <input
                  type="text"
                  id="carModel"
                  value={model}
                  onChange={(e) => setmodel(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="carMilage">
                  Milage:
                </label>
                <input
                  type="text"
                  id="carMilage"
                  value={milage}
                  onChange={(e) => setmilage(e.target.value)}
                />
                <label className="text-light" htmlFor="carPerKM">
                  Per KM:
                </label>
                <input
                  type="text"
                  id="carPerKM"
                  value={perKm}
                  onChange={(e) => setperKM(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="availableFrom">
                  Available from:
                </label>
                <input
                  type="date"
                  id="availableFrom"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
                <label
                  className="text-light"
                  htmlFor="availableTill"
                  style={{ marginTop: "10px", display: "block" }}
                >
                  Available till:
                </label>
                <input
                  type="date"
                  id="availableTill"
                  value={availableTill}
                  onChange={(e) => setAvailableTill(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="text-light" htmlFor="carDescription">
                  Description:
                </label>
                <textarea
                  id="carDescription"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button type="submit" className="add-button btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="vertical-line"></div>
          <div className="right-section" style={{ marginTop: "50px" }}>
            <div className="image-upload-section">
              <h2 className="text-light">Images</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />

              <div className="image-preview">
                {images && (
                  <div className="image-item">
                    <img
                      src={URL.createObjectURL(images)}
                      alt="Selected Image"
                    />
                    <button
                      className="delete-button"
                      onClick={() => handleImageDelete()}
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="details-section">
              <h2 className="text-light">Car Details</h2>
              <textarea
                value={carDetails}
                onChange={(e) => setCarDetails(e.target.value)}
              ></textarea>
              <h2 className="text-light">Owner Details</h2>
              <textarea
                value={Details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCar;
