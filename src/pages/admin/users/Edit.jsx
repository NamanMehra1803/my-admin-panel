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

  const userId = lineData._id;

  const event = lineData.DOB
    ? new Date(lineData.DOB)
    : new Date('2017-10-19T16:00:00.000');

  const [firstName, setFirstName] = useState(lineData.firstName);
  const [lastName, setLastName] = useState(lineData.lastName);
  const [email, setEmail] = useState(lineData.email);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [DOB, setDOB] = useState(
    event.toISOString().split('T')[0]
  );
  const [image, setImage] = useState(lineData.image);
  const [role, setRole] = useState(lineData.role);
  const [address, setAddress] = useState(lineData.address);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('_id', userId);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('mobile', mobile);
    formData.append('DOB', DOB);
    formData.append('role', role);
    formData.append('address', address);

    if (image instanceof File) {
      formData.append('image', image);
    } else if (image) {
      formData.append('image', image);
    }

    try {
      const { data } = await axios.post(
        'https://my-backend-api-usbu.onrender.com/api/user/update',
        formData
      );

      if (data.success) {
        toast.success(data.message);

        setTimeout(() => {
          navigate('/users');
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Something went wrong'
      );
    }
  };

  const maxDOB = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  })();

  const currentImage =
    typeof image === 'string' && image
      ? image.startsWith('http')
        ? image
        : `https://my-backend-api-usbu.onrender.com/uploads/${image}`
      : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <Toaster position="top-center" />

      <Sidebar />

      <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
        <Header />

        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto mb-6 max-w-5xl sm:mb-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                  User Management
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Edit User
                </h1>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Update the user's personal and account information.
                </p>
              </div>

              <Link
                to="/users"
                className="w-full sm:w-auto"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 sm:w-auto"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back to Users
                </button>
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)] sm:rounded-3xl">
            <div className="border-b border-gray-100 px-4 py-5 sm:px-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 20h9"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 3.5a2.121 2.121 0 013 3L8 18l-4 1 1-4L16.5 3.5z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                    User Information
                  </h2>

                  <p className="text-xs text-gray-500 sm:text-sm">
                    Update the information below and save your changes.
                  </p>
                </div>
              </div>
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
                    name="firstName"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Phone Number
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
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
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Role
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <select
                    name="role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  >
                    <option value="">
                      Select Role
                    </option>

                    <option value="1">
                      Admin
                    </option>

                    <option value="2">
                      User
                    </option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    name="address"
                    rows="5"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm leading-6 text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Profile Image
                  </label>

                  <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50/30">
                    {image instanceof File ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Profile"
                        className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                      />
                    ) : currentImage ? (
                      <img
                        src={currentImage}
                        alt="Profile"
                        className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16V4m0 0L7 9m5-5l5 5"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16.5v1A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5v-1"
                          />
                        </svg>
                      </div>
                    )}

                    <p className="mt-3 max-w-full truncate px-3 text-sm font-semibold text-gray-700">
                      {image instanceof File
                        ? image.name
                        : 'Change Profile Image'}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      PNG, JPG or JPEG
                    </p>

                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setImage(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/60 px-4 py-5 sm:flex-row sm:justify-end sm:px-8">
                <Link
                  to="/users"
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
                  Update User
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