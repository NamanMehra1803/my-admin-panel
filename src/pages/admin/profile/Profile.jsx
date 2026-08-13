import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Sidebar from '../../../components/admin/Sidebar';
import Footer from '../../../components/admin/Footer';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const viewProfile = async (userId) => {
    try {
      const response = await axios.post(
        'https://my-backend-api-usbu.onrender.com/api/admin/my-profile',
        { _id: userId }
      );

      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('admin-id');
    if (userId) viewProfile(userId);
  }, []);

  const handleEdit = () => {
    navigate('/myprofile-edit', {
      state: userData
    });
  };

  const imageUrl = userData.image
    ? userData.image.startsWith('http')
      ? userData.image
      : `https://my-backend-api-usbu.onrender.com/uploads/${userData.image}`
    : 'https://via.placeholder.com/400';

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <Sidebar />

      <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
        <Header />

        <Toaster position="bottom-center" />

        <main className="flex-1 px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                  Account
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                  My Profile
                </h1>
              </div>

              <button
                onClick={handleEdit}
                className="w-full rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 sm:w-auto"
              >
                Edit Profile
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
              <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-10">
                <div className="flex justify-center">
                  <img
                    src={imageUrl}
                    alt={`${userData.firstName || ''} ${userData.lastName || ''}`}
                    className="h-64 w-64 rounded-2xl object-cover shadow-md sm:h-72 sm:w-72 lg:h-80 lg:w-80"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://via.placeholder.com/400';
                    }}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {userData.firstName} {userData.lastName}
                  </h2>

                  <p className="mt-2 break-all text-sm text-gray-500 sm:text-base">
                    {userData.email}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs font-medium text-gray-400">
                        Mobile
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                        {userData.mobile || 'N/A'}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4">
                      <p className="text-xs font-medium text-gray-400">
                        Role
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-800">
                        {userData.role === 1 || userData.role === '2' ?  'user' : 'admin'}
                      </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 sm:col-span-2">
                      <p className="text-xs font-medium text-gray-400">
                        Address
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                        {userData.address || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 border-t border-gray-100 pt-5 text-xl text-gray-500">
                    <i className="fa fa-dribbble" />
                    <i className="fa fa-twitter" />
                    <i className="fa fa-linkedin" />
                    <i className="fa fa-facebook" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}