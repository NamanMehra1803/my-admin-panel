import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Add() {
  const navigate = useNavigate();
  const { state: lineData } = useLocation();
  const profileId = localStorage.getItem("admin-id");

// image filter by http://www.my-backend-api-usbu.onrender.com/uploads/image_1756728540341.jpg
  const fileName =lineData.image.substring(lineData.image.lastIndexOf('/') + 1);


  const event = lineData.DOB ? new Date(lineData.DOB) : new Date("2017-10-19T16:00:00.000");
  const [firstName, setFirstName] = useState(lineData.firstName);
  const [lastName, setLastName] = useState(lineData.lastName);
  const [email, setEmail] = useState(lineData.email);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [DOB, setDOB] = useState(event.toISOString().split('T')[0]);
  const [image, setImage] = useState(fileName);
  const [address, setAddress] = useState(lineData.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", profileId);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("DOB", DOB);
    formData.append("address", address);
    formData.append("image", image);
    try {
      const { data } = await axios.post("https://my-backend-api-usbu.onrender.com/api/admin/profileUpdate", formData);
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/myprofile"), 2000);
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const maxDOB = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; })();

  return (
    <div className="layout-wrapper">
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <div className="page-content">
        <Header />
        <div className="container" style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
          <h2>PROFILE EDIT</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>First Name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <label>DOB <span style={{ color: "red" }}>*</span></label>
                <input type="date" value={DOB} onChange={e => setDOB(e.target.value)} max={maxDOB} />
                <label>Profile Image <span style={{ color: "red" }}>*</span></label>
                <input type="file" name="profileImage" accept="image/*" onChange={e => setImage(e.target.files[0])} />
              </div>

              <div style={{ flex: 1 }}>
                <label>Last Name <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                <label>Phone Number <span style={{ color: "red" }}>*</span></label>
                <input type="number" name="mobile" value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>

              <div style={{ flex: 1 }}>
                <label>Email <span style={{ color: "red" }}>*</span></label>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Address <span style={{ color: "red" }}>*</span></label>
                <textarea name="address" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link to="/myprofile"><button type="reset">Cancel</button></Link>
              <button className="btn btn-success" type="submit" style={{ marginLeft: '10px', marginBottom: "5px" }}>Submit</button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}
