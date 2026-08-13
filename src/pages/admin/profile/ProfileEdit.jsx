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

  const fileName = lineData?.image
    ? lineData.image.substring(
        lineData.image.lastIndexOf('/') + 1
      )
    : "";

  const event = lineData?.DOB
    ? new Date(lineData.DOB)
    : new Date("2017-10-19T16:00:00.000");

  const [firstName, setFirstName] = useState(lineData?.firstName || "");
  const [lastName, setLastName] = useState(lineData?.lastName || "");
  const [email, setEmail] = useState(lineData?.email || "");
  const [mobile, setMobile] = useState(lineData?.mobile || "");
  const [DOB, setDOB] = useState(
    event.toISOString().split('T')[0]
  );
  const [image, setImage] = useState(fileName);
  const [address, setAddress] = useState(lineData?.address || "");

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

    if (image instanceof File) {
      formData.append("image", image);
    } else {
      formData.append("image", image);
    }

    try {
      const { data } = await axios.post(
        "https://my-backend-api-usbu.onrender.com/api/admin/profileUpdate",
        formData
      );

      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          navigate("/myprofile");
        }, 1500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const maxDOB = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  })();

  const imagePreview =
    image instanceof File
      ? URL.createObjectURL(image)
      : lineData?.image
        ? lineData.image.startsWith("http")
          ? lineData.image
          : `https://my-backend-api-usbu.onrender.com/uploads/${lineData.image}`
        : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <Toaster position="top-center" />

      <Sidebar />

      <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
        <Header />

        <main className="flex-1 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto mb-6 max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                  Account Management
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  Edit Profile
                </h1>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Update your profile information.
                </p>
              </div>

              <Link
                to="/myprofile"
                className="w-full sm:w-auto"
              >
                <button
                  type="button"
                  className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
                >
                  ← Back to Profile
                </button>
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
            <div className="border-b border-gray-100 px-4 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-gray-900">
                Profile Information
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Update your personal information and profile image.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-5 px-4 py-6 sm:grid-cols-2 sm:gap-6 sm:px-8 sm:py-8 lg:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    First Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Phone Number
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Date of Birth
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={DOB}
                    onChange={(e) =>
                      setDOB(e.target.value)
                    }
                    max={maxDOB}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Profile Image
                  </label>

                  <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50/30">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        📷
                      </div>
                    )}

                    <p className="mt-3 max-w-full truncate px-3 text-sm font-semibold text-gray-700">
                      {image instanceof File
                        ? image.name
                        : fileName || "Change Profile Image"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG or JPEG
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImage(e.target.files?.[0] || "")
                      }
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    rows="5"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/60 px-4 py-5 sm:flex-row sm:justify-end sm:px-8">
                <Link
                  to="/myprofile"
                  className="w-full sm:w-auto"
                >
                  <button
                    type="button"
                    className="w-full rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-600 sm:w-auto"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}