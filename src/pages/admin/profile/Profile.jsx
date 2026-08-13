import React from 'react';
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import Footer from '../../../components/admin/Footer';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const viewProfile = async (userId) => {
    try {
      const body = { _id: userId };
      const ApiUrl = 'http://www.my-backend-api-usbu.onrender.com/api/admin/my-profile';
      const response = await axios.post(ApiUrl, body);
      const msg = response.data.message;
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        toast.error(msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("admin-id");
    viewProfile(userId);
  }, []);


  const handleButtonClick = (user_data) =>
    navigate('/myprofile-edit',
      { state: user_data });

  return (
    <>
      <div className="layout-wrapper">
        <Sidebar />
        <div className="page-content">
          <Header />
          <Toaster position="bottom-center" reverseOrder={false} />

          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginLeft: "255px", marginTop: "20px", marginRight: "20px" }}
          >
            <h2>My Profile</h2>
            <button className="btn btn-primary me-3 px-4" onClick={() => handleButtonClick(userData)}>Edit</button>


          </div>

          <div
            className="card mx-auto d-flex"
            style={{
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              maxWidth: "900px",
              margin: "40px auto",
              fontFamily: "arial",
              padding: "20px",
              gap: "30px",
              flexDirection: "row",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {/* Left side image */}
            <img
              src={userData.image || "https://via.placeholder.com/400"}
              alt={`${userData.firstName} ${userData.lastName}`}
              style={{ height: "400px", width: "400px", objectFit: "cover", borderRadius: "5px" }}
            />

            {/* Right side details */}
            <div>
              <h1>{userData.firstName} {userData.lastName}</h1>
              <p>{userData.email}</p>
              <p className="title" style={{ color: "gray", fontSize: "18px" }}></p>

              <div style={{ margin: "24px 0" }}>
                <a href="#" style={{ textDecoration: "none", fontSize: "22px", color: "black", marginRight: "15px" }}>
                  <i className="fa fa-dribbble" />
                </a>
                <a href="#" style={{ textDecoration: "none", fontSize: "22px", color: "black", marginRight: "15px" }}>
                  <i className="fa fa-twitter" />
                </a>
                <a href="#" style={{ textDecoration: "none", fontSize: "22px", color: "black", marginRight: "15px" }}>
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#" style={{ textDecoration: "none", fontSize: "22px", color: "black" }}>
                  <i className="fa fa-facebook" />
                </a>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
