import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function OrderManager() {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    // ================= FETCH ORDERS =================

    const fetchOrders = async () => {

        try {

            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/orders-view'
            );

            if (response.data.success) {

                setOrders(response.data.data || []);
                setCurrentPage(1);

            }

        } catch (err) {

            console.error("Order fetch error:", err);

        }

    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ================= SEARCH =================

    const searchUser = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/order-Search',
                {
                    firstName,
                    email
                }
            );

            if (response.data.success) {

                setOrders(response.data.data || []);
                setCurrentPage(1);

            }

        } catch (err) {

            console.error("Search error:", err);

        }

    };

    // ================= RESET =================

    const handleReset = (e) => {

        e.preventDefault();

        setFirstName('');
        setEmail('');
        setCurrentPage(1);

        fetchOrders();

    };

    // ================= PAGINATION =================

    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentItems =
        orders.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

    const totalPages =
        Math.ceil(
            orders.length / itemsPerPage
        );

    const handlePrevPage = () => {

        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

    };

    const handleNextPage = () => {

        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }

    };

    const handlePageClick = (pageNum) => {

        setCurrentPage(pageNum);

    };

    // ================= EXPORT EXCEL =================

    const exportToExcel = () => {

        const dataToExport = orders.map(
            (order, index) => ({

                "#": index + 1,

                "User Name":
                    `${order.user_id?.firstName || ''} ${order.user_id?.lastName || ''}`,

                "User Email":
                    order.user_id?.email || '',

                "User Mobile":
                    order.user_id?.mobile || '',

                "Product Name":
                    order.product_id?.name || '',

                "Price":
                    order.product_id?.price || '',

                "Created":
                    new Date(
                        order.createdAt
                    ).toLocaleDateString(),

            })
        );

        const worksheet =
            XLSX.utils.json_to_sheet(
                dataToExport
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Orders"
        );

        const excelBuffer =
            XLSX.write(
                workbook,
                {
                    bookType: "xlsx",
                    type: "array"
                }
            );

        const data = new Blob(
            [excelBuffer],
            {
                type:
                    "application/octet-stream"
            }
        );

        saveAs(
            data,
            "orders_list.xlsx"
        );

    };

    // ================= EXPORT PDF =================

    const exportToPDF = () => {

        const doc = new jsPDF();

        const tableColumn = [
            "#",
            "User",
            "Email",
            "Mobile",
            "Product",
            "Price",
            "Date"
        ];

        const tableRows = [];

        orders.forEach(
            (order, index) => {

                tableRows.push([

                    index + 1,

                    `${order.user_id?.firstName || ''} ${order.user_id?.lastName || ''}`,

                    order.user_id?.email || '',

                    order.user_id?.mobile || '',

                    order.product_id?.name || '',

                    order.product_id?.price || '',

                    new Date(
                        order.createdAt
                    ).toLocaleDateString(),

                ]);

            }
        );

        doc.text(
            "Order List",
            14,
            15
        );

        autoTable(doc, {

            head: [tableColumn],

            body: tableRows,

            startY: 20,

            styles: {
                fontSize: 8
            },

            headStyles: {
                fontSize: 8
            }

        });

        doc.save(
            "orders_list.pdf"
        );

    };

    return (

        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN CONTENT */}

            <div className="ml-[255px] flex min-h-screen min-w-0 flex-col">

                <Header />

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">

                    {/* PAGE HEADER */}

                    <div className="mx-auto mb-7 max-w-[1500px]">

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <p className="text-sm font-semibold text-blue-600">
                                    Sales Management
                                </p>

                                <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                                    Order Manager
                                </h1>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage and view all customer orders.
                                </p>

                            </div>

                            {/* ORDER COUNT */}

                            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.8a2 2 0 001.9-1.4L21 8H6"
                                        />

                                        <circle
                                            cx="10"
                                            cy="20"
                                            r="1"
                                        />

                                        <circle
                                            cx="18"
                                            cy="20"
                                            r="1"
                                        />

                                    </svg>

                                </div>

                                <div>

                                    <p className="text-xs text-gray-500">
                                        Total Orders
                                    </p>

                                    <p className="text-lg font-bold text-gray-900">
                                        {orders.length}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* SEARCH + EXPORT CARD */}

                    <div className="mx-auto mb-6 max-w-[1500px] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                            {/* SEARCH */}

                            <form
                                onSubmit={searchUser}
                                className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                            >

                                <div className="relative">

                                    <svg
                                        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >

                                        <circle
                                            cx="11"
                                            cy="11"
                                            r="7"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            d="m20 20-4-4"
                                        />

                                    </svg>

                                    <input
                                        type="text"
                                        placeholder="Search First Name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-[210px]"
                                    />

                                </div>

                                <div className="relative">

                                    <svg
                                        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        viewBox="0 0 24 24"
                                    >

                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="2"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            d="m3 7 9 6 9-6"
                                        />

                                    </svg>

                                    <input
                                        type="email"
                                        placeholder="Search Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-[230px]"
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
                                >
                                    Search
                                </button>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Reset
                                </button>

                            </form>

                            {/* EXPORT */}

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <button
                                    onClick={exportToExcel}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                >

                                    <span>
                                        📊
                                    </span>

                                    Export Excel

                                </button>

                                <button
                                    onClick={exportToPDF}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                >

                                    <span>
                                        🧾
                                    </span>

                                    Export PDF

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* TABLE CARD */}

                    <div className="mx-auto max-w-[1500px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="border-b border-gray-100 px-5 py-4">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="font-bold text-gray-900">
                                        Order List
                                    </h2>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Showing {currentItems.length} of {orders.length} orders
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* RESPONSIVE TABLE */}

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px] text-left">

                                <thead>

                                    <tr className="border-b border-gray-100 bg-gray-50/70">

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            #
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Customer
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Customer Info
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Product Info
                                        </th>

                                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Created
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="px-5 py-16 text-center"
                                            >

                                                <div className="flex flex-col items-center">

                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">

                                                        <svg
                                                            className="h-8 w-8"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            viewBox="0 0 24 24"
                                                        >

                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M3 3h2l2.4 12.2a2 2 0 002 1.6h7.8a2 2 0 001.9-1.4L21 8H6"
                                                            />

                                                        </svg>

                                                    </div>

                                                    <p className="mt-4 font-semibold text-gray-700">
                                                        No orders found
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-400">
                                                        There are no orders to display.
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        currentItems.map(
                                            (order, index) => (

                                                <tr
                                                    key={order._id}
                                                    className="border-b border-gray-50 transition hover:bg-blue-50/30"
                                                >

                                                    {/* NUMBER */}

                                                    <td className="px-5 py-4">

                                                        <span className="font-semibold text-gray-500">
                                                            {indexOfFirstItem + index + 1}
                                                        </span>

                                                    </td>

                                                    {/* USER IMAGE */}

                                                    <td className="px-5 py-4">

                                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 ring-2 ring-gray-100">

                                                            <img
                                                                src={
                                                                    order.user_id?.image
                                                                        ? `https://my-backend-api-usbu.onrender.com/uploads/${order.user_id.image}`
                                                                        : ""
                                                                }
                                                                alt={
                                                                    order.user_id?.firstName ||
                                                                    "User"
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />

                                                        </div>

                                                    </td>

                                                    {/* USER INFO */}

                                                    <td className="px-5 py-4">

                                                        <div className="space-y-1">

                                                            <p className="font-semibold text-gray-900">

                                                                {order.user_id?.firstName}{' '}

                                                                {order.user_id?.lastName}

                                                            </p>

                                                            <p className="text-sm text-gray-500">
                                                                {order.user_id?.email}
                                                            </p>

                                                            <p className="text-xs text-gray-400">
                                                                {order.user_id?.mobile}
                                                            </p>

                                                        </div>

                                                    </td>

                                                    {/* PRODUCT IMAGE */}

                                                    <td className="px-5 py-4">

                                                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gray-100 ring-2 ring-gray-100">

                                                            <img
                                                                src={
                                                                    order.product_id?.image
                                                                        ? `https://my-backend-api-usbu.onrender.com/uploads/${order.product_id.image}`
                                                                        : ""
                                                                }
                                                                alt={
                                                                    order.product_id?.name ||
                                                                    "Product"
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />

                                                        </div>

                                                    </td>

                                                    {/* PRODUCT INFO */}

                                                    <td className="px-5 py-4">

                                                        <div className="space-y-1">

                                                            <p className="font-semibold text-gray-900">
                                                                {order.product_id?.name}
                                                            </p>

                                                            <p className="font-semibold text-blue-600">
                                                                ₹{order.product_id?.price}
                                                            </p>

                                                        </div>

                                                    </td>

                                                    {/* DATE */}

                                                    <td className="px-5 py-4">

                                                        <div className="rounded-lg bg-gray-50 px-3 py-2">

                                                            <p className="text-sm font-semibold text-gray-700">

                                                                {new Date(
                                                                    order.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        year: "numeric",
                                                                        month: "short",
                                                                        day: "numeric"
                                                                    }
                                                                )}

                                                            </p>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* PAGINATION */}

                        {totalPages > 0 && (

                            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row">

                                <p className="text-sm text-gray-500">

                                    Page{" "}
                                    <span className="font-semibold text-gray-800">
                                        {currentPage}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-gray-800">
                                        {totalPages}
                                    </span>

                                </p>

                                <div className="flex items-center gap-1">

                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Previous
                                    </button>

                                    <div className="hidden items-center gap-1 sm:flex">

                                        {[...Array(totalPages).keys()].map(
                                            (num) => (

                                                <button
                                                    key={num}
                                                    onClick={() =>
                                                        handlePageClick(
                                                            num + 1
                                                        )
                                                    }
                                                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                                                        currentPage ===
                                                        num + 1
                                                            ? "bg-gray-900 text-white"
                                                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    {num + 1}
                                                </button>

                                            )
                                        )}

                                    </div>

                                    <button
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Next
                                    </button>

                                </div>

                            </div>

                        )}

                    </div>

                </main>

                <Footer />

            </div>

        </div>
    );
}