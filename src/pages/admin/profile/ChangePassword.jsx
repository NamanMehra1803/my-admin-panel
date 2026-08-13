import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Changepass() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://my-backend-api-usbu.onrender.com/api/admin/change-password",
        {
          _id: localStorage.getItem("admin-id"),
          currentPassword,
          newPassword,
          confirmPassword
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <Toaster position="top-center" />

      <Sidebar />

      <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
        <Header />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-600">
                Account Management
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Change Password
              </h1>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Current Password
                  </label>

                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    New Password
                  </label>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-semibold text-gray-800">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}