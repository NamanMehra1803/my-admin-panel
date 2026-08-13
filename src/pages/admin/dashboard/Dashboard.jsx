import React, { useEffect, useState } from 'react';

import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';

import axios from '../../../config/axios';

export default function Dashboard() {
  // =====================================================
  // SIDEBAR
  // =====================================================

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =====================================================
  // DATA
  // =====================================================

  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // =====================================================
  // TABLE TOGGLE
  // =====================================================

  const [showUsersTable, setShowUsersTable] = useState(false);
  const [showProductsTable, setShowProductsTable] = useState(false);
  const [showCategoryTable, setShowCategoryTable] = useState(false);

  // =====================================================
  // USERS TABLE
  // =====================================================

  const toggleUsersTable = () => {
    setShowUsersTable((prev) => !prev);
    setShowProductsTable(false);
    setShowCategoryTable(false);
  };

  // =====================================================
  // PRODUCTS TABLE
  // =====================================================

  const toggleProductsTable = () => {
    setShowProductsTable((prev) => !prev);
    setShowUsersTable(false);
    setShowCategoryTable(false);
  };

  // =====================================================
  // CATEGORY TABLE
  // =====================================================

  const toggleCategoryTable = () => {
    setShowCategoryTable((prev) => !prev);
    setShowUsersTable(false);
    setShowProductsTable(false);
  };

  // =====================================================
  // USER API
  // =====================================================

  const dashboardview = async () => {
    try {
      const response = await axios.post(
        'https://my-backend-api-usbu.onrender.com/userViewdashboard'
      );

      if (Array.isArray(response.data.data)) {
        setUserData(response.data.data);
      } else {
        setUserData([]);
      }
    } catch (err) {
      console.error('User API Error:', err);
      setUserData([]);
    }
  };

  // =====================================================
  // PRODUCT API
  // =====================================================

  const ProductView = async () => {
    try {
      const response = await axios.post(
        'https://my-backend-api-usbu.onrender.com/productViewdashboard'
      );

      if (Array.isArray(response.data.data)) {
        setProductData(response.data.data);
      } else {
        setProductData([]);
      }
    } catch (err) {
      console.error('Product API Error:', err);
      setProductData([]);
    }
  };

  // =====================================================
  // CATEGORY API
  // =====================================================

  const CategoryView = async () => {
    try {
      const response = await axios.post(
        'https://my-backend-api-usbu.onrender.com/categoryViewdashboard'
      );

      if (Array.isArray(response.data.data)) {
        setCategoryData(response.data.data);
      } else {
        setCategoryData([]);
      }
    } catch (err) {
      console.error('Category API Error:', err);
      setCategoryData([]);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    dashboardview();
    ProductView();
    CategoryView();
  }, []);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (image) => {
    if (!image) {
      return 'https://via.placeholder.com/100?text=No+Image';
    }

    return `https://my-backend-api-usbu.onrender.com/uploads/${image}`;
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return '-';
    }

    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">

      {/* =================================================
                SIDEBAR
            ================================================= */}

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* =================================================
                MAIN CONTENT

                Mobile:
                ml-[58px]

                Tablet:
                ml-[64px]

                Laptop:
                ml-[255px]
            ================================================= */}

      <div
        className="
                    ml-[58px]
                    flex
                    min-h-screen
                    min-w-0
                    flex-col

                    sm:ml-[64px]

                    lg:ml-[255px]
                "
      >

        {/* =================================================
                    HEADER
                ================================================= */}

        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* =================================================
                    MAIN
                ================================================= */}

        <main
          className="
                        flex-1
                        px-3
                        py-4

                        sm:px-6
                        sm:py-6

                        lg:px-8
                    "
        >

          {/* =================================================
                        PAGE HEADER
                    ================================================= */}

          <div className="mb-6 sm:mb-7">

            <div
              className="
                                flex
                                flex-col
                                gap-4

                                lg:flex-row
                                lg:items-center
                                lg:justify-between
                            "
            >

              {/* TITLE */}

              <div>

                <p
                  className="
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-blue-600

                                        sm:text-sm
                                    "
                >
                  Admin Panel
                </p>

                <h1
                  className="
                                        mt-1
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-gray-900

                                        sm:text-3xl
                                    "
                >
                  Dashboard
                </h1>

                <p
                  className="
                                        mt-1
                                        text-xs
                                        text-gray-500

                                        sm:text-sm
                                    "
                >
                  Overview of your website activity and data.
                </p>

              </div>

              {/* DASHBOARD INFO */}

              <div
                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-100
                                    bg-white
                                    px-4
                                    py-3
                                    shadow-sm

                                    sm:w-auto
                                "
              >

                <p className="text-xs text-gray-400">
                  Dashboard Overview
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-800">
                  Welcome back, Admin
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
                        SUMMARY CARDS
                    ================================================= */}

          <div
            className="
                            grid
                            grid-cols-1
                            gap-4

                            sm:grid-cols-2
                            sm:gap-5

                            xl:grid-cols-4
                        "
          >

            {/* =================================================
                            USERS CARD
                        ================================================= */}

            <div
              onClick={toggleUsersTable}
              className="
                                group
                                w-full
                                cursor-pointer
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                p-4

                                shadow-[0_10px_35px_-15px_rgba(0,0,0,0.12)]

                                transition
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]

                                sm:p-5
                            "
            >

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p
                    className="
                                            text-xs
                                            font-medium
                                            text-gray-500

                                            sm:text-sm
                                        "
                  >
                    Total Users
                  </p>

                  <h2
                    className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            text-gray-900

                                            sm:text-3xl
                                        "
                  >
                    {userData.length}
                  </h2>

                  <p
                    className="
                                            mt-2
                                            text-xs
                                            font-medium
                                            text-blue-600
                                        "
                  >
                    View users →
                  </p>

                </div>

                <div
                  className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-blue-50
                                        text-blue-600

                                        transition

                                        group-hover:bg-blue-600
                                        group-hover:text-white

                                        sm:h-14
                                        sm:w-14
                                    "
                >
                  <i className="fas fa-user text-lg sm:text-xl" />
                </div>

              </div>

            </div>

            {/* =================================================
                            PRODUCTS CARD
                        ================================================= */}

            <div
              onClick={toggleProductsTable}
              className="
                                group
                                w-full
                                cursor-pointer
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                p-4

                                shadow-[0_10px_35px_-15px_rgba(0,0,0,0.12)]

                                transition
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]

                                sm:p-5
                            "
            >

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p
                    className="
                                            text-xs
                                            font-medium
                                            text-gray-500

                                            sm:text-sm
                                        "
                  >
                    Total Products
                  </p>

                  <h2
                    className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            text-gray-900

                                            sm:text-3xl
                                        "
                  >
                    {productData.length}
                  </h2>

                  <p
                    className="
                                            mt-2
                                            text-xs
                                            font-medium
                                            text-emerald-600
                                        "
                  >
                    View products →
                  </p>

                </div>

                <div
                  className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-50
                                        text-emerald-600

                                        transition

                                        group-hover:bg-emerald-600
                                        group-hover:text-white

                                        sm:h-14
                                        sm:w-14
                                    "
                >
                  <i className="fas fa-box-open text-lg sm:text-xl" />
                </div>

              </div>

            </div>

            {/* =================================================
                            CATEGORIES CARD
                        ================================================= */}

            <div
              onClick={toggleCategoryTable}
              className="
                                group
                                w-full
                                cursor-pointer
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                p-4

                                shadow-[0_10px_35px_-15px_rgba(0,0,0,0.12)]

                                transition
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]

                                sm:p-5
                            "
            >

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p
                    className="
                                            text-xs
                                            font-medium
                                            text-gray-500

                                            sm:text-sm
                                        "
                  >
                    Total Categories
                  </p>

                  <h2
                    className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            text-gray-900

                                            sm:text-3xl
                                        "
                  >
                    {categoryData.length}
                  </h2>

                  <p
                    className="
                                            mt-2
                                            text-xs
                                            font-medium
                                            text-purple-600
                                        "
                  >
                    View categories →
                  </p>

                </div>

                <div
                  className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-purple-50
                                        text-purple-600

                                        transition

                                        group-hover:bg-purple-600
                                        group-hover:text-white

                                        sm:h-14
                                        sm:w-14
                                    "
                >
                  <i className="fas fa-tags text-lg sm:text-xl" />
                </div>

              </div>

            </div>

            {/* =================================================
                            SECOND CATEGORY CARD
                        ================================================= */}

            <div
              onClick={toggleCategoryTable}
              className="
                                group
                                w-full
                                cursor-pointer
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                p-4

                                shadow-[0_10px_35px_-15px_rgba(0,0,0,0.12)]

                                transition
                                duration-300

                                hover:-translate-y-1
                                hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]

                                sm:p-5
                            "
            >

              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">

                  <p
                    className="
                                            text-xs
                                            font-medium
                                            text-gray-500

                                            sm:text-sm
                                        "
                  >
                    Categories
                  </p>

                  <h2
                    className="
                                            mt-2
                                            text-2xl
                                            font-bold
                                            text-gray-900

                                            sm:text-3xl
                                        "
                  >
                    {categoryData.length}
                  </h2>

                  <p
                    className="
                                            mt-2
                                            text-xs
                                            font-medium
                                            text-orange-600
                                        "
                  >
                    View categories →
                  </p>

                </div>

                <div
                  className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-orange-50
                                        text-orange-500

                                        transition

                                        group-hover:bg-orange-500
                                        group-hover:text-white

                                        sm:h-14
                                        sm:w-14
                                    "
                >
                  <i className="fas fa-layer-group text-lg sm:text-xl" />
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
                        USERS TABLE
                    ================================================= */}

          {showUsersTable && (
            <div
              className="
                                mt-6
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white

                                shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)]

                                sm:mt-8
                                sm:rounded-3xl
                            "
            >

              {/* TABLE HEADER */}

              <div
                className="
                                    border-b
                                    border-gray-100
                                    p-4

                                    sm:p-6
                                "
              >

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Users
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  List of registered users
                </p>

              </div>

              {/* TABLE */}

              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50/80">

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        #
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Image
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Name
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Email
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Mobile
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Created
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {userData.length === 0 ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="px-6 py-16 text-center text-sm text-gray-500"
                        >
                          No users found.
                        </td>

                      </tr>

                    ) : (

                      userData.map((user, index) => (

                        <tr
                          key={user._id}
                          className="transition duration-200 hover:bg-blue-50/30"
                        >

                          <td className="px-4 py-5 text-sm font-semibold text-gray-500 sm:px-5">
                            {index + 1}
                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <div
                              className="
                                                                h-11
                                                                w-11
                                                                overflow-hidden
                                                                rounded-xl
                                                                border
                                                                border-gray-100
                                                                bg-gray-50
                                                                shadow-sm

                                                                sm:h-12
                                                                sm:w-12
                                                            "
                            >

                              <img
                                src={getImageUrl(user.image)}
                                alt={user.firstName || 'No image'}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />

                            </div>

                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <p className="font-semibold text-gray-900">
                              {user.firstName || '-'}
                            </p>

                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {user.email || '-'}
                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {user.mobile || '-'}
                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {formatDate(user.createdAt)}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =================================================
                        PRODUCTS TABLE
                    ================================================= */}

          {showProductsTable && (
            <div
              className="
                                mt-6
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white

                                shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)]

                                sm:mt-8
                                sm:rounded-3xl
                            "
            >

              {/* HEADER */}

              <div
                className="
                                    border-b
                                    border-gray-100
                                    p-4

                                    sm:p-6
                                "
              >

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Products
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  List of available products
                </p>

              </div>

              {/* TABLE */}

              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50/80">

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        #
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Image
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Name
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Description
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Category
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Created
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {productData.length === 0 ? (

                      <tr>

                        <td
                          colSpan="6"
                          className="px-6 py-16 text-center text-sm text-gray-500"
                        >
                          No products found.
                        </td>

                      </tr>

                    ) : (

                      productData.map((product, index) => (

                        <tr
                          key={product._id}
                          className="transition duration-200 hover:bg-emerald-50/30"
                        >

                          <td className="px-4 py-5 text-sm font-semibold text-gray-500 sm:px-5">
                            {index + 1}
                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <div
                              className="
                                                                h-11
                                                                w-11
                                                                overflow-hidden
                                                                rounded-xl
                                                                border
                                                                border-gray-100
                                                                bg-gray-50
                                                                shadow-sm

                                                                sm:h-12
                                                                sm:w-12
                                                            "
                            >

                              <img
                                src={getImageUrl(product.image)}
                                alt={product.name || 'No image'}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />

                            </div>

                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <p className="font-semibold text-gray-900">
                              {product.name || '-'}
                            </p>

                          </td>

                          <td className="max-w-xs px-4 py-5 sm:px-5">

                            <p className="max-w-[280px] truncate text-sm text-gray-500">
                              {product.description || 'No description'}
                            </p>

                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {product.cat_id?.name || 'N/A'}
                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {formatDate(product.createdAt)}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =================================================
                        CATEGORY TABLE
                    ================================================= */}

          {showCategoryTable && (
            <div
              className="
                                mt-6
                                overflow-hidden
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white

                                shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)]

                                sm:mt-8
                                sm:rounded-3xl
                            "
            >

              {/* HEADER */}

              <div
                className="
                                    border-b
                                    border-gray-100
                                    p-4

                                    sm:p-6
                                "
              >

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Categories
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  List of available categories
                </p>

              </div>

              {/* TABLE */}

              <div className="w-full overflow-x-auto">

                <table className="w-full min-w-[800px]">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50/80">

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        #
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Image
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Name
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Description
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 sm:px-5">
                        Created
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {categoryData.length === 0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          className="px-6 py-16 text-center text-sm text-gray-500"
                        >
                          No category found.
                        </td>

                      </tr>

                    ) : (

                      categoryData.map((category, index) => (

                        <tr
                          key={category._id}
                          className="transition duration-200 hover:bg-purple-50/30"
                        >

                          <td className="px-4 py-5 text-sm font-semibold text-gray-500 sm:px-5">
                            {index + 1}
                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <div
                              className="
                                                                h-11
                                                                w-11
                                                                overflow-hidden
                                                                rounded-xl
                                                                border
                                                                border-gray-100
                                                                bg-gray-50
                                                                shadow-sm

                                                                sm:h-12
                                                                sm:w-12
                                                            "
                            >

                              <img
                                src={getImageUrl(category.image)}
                                alt={category.name || 'No image'}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    'https://via.placeholder.com/100?text=No+Image';
                                }}
                              />

                            </div>

                          </td>

                          <td className="px-4 py-5 sm:px-5">

                            <p className="font-semibold text-gray-900">
                              {category.name || '-'}
                            </p>

                          </td>

                          <td className="max-w-xs px-4 py-5 sm:px-5">

                            <p className="max-w-[280px] truncate text-sm text-gray-500">
                              {category.description || 'No description'}
                            </p>

                          </td>

                          <td className="px-4 py-5 text-sm text-gray-500 sm:px-5">
                            {formatDate(category.createdAt)}
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>
          )}

        </main>

        {/* =================================================
                    FOOTER
                ================================================= */}

        <Footer />

      </div>

    </div>
  );
}