import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [userData, setUserData] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const Userview = async () => {
        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/userview'
            );

            if (Array.isArray(response.data.data)) {
                setUserData(response.data.data);
                setCurrentPage(1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const searchUser = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/userSearch',
                {
                    firstName,
                    email
                }
            );

            if (response.data.success) {
                setUserData(response.data.data || []);
                setCurrentPage(1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        Userview();
    }, []);

    const handleDelete = async (user_Id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.post(
                    'https://my-backend-api-usbu.onrender.com/api/admin/userdelete',
                    {
                        _id: user_Id
                    }
                );

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });

                Userview();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleStatusUpdate = async (user_Id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to status update',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.post(
                    'https://my-backend-api-usbu.onrender.com/statusUpdate',
                    {
                        _id: user_Id
                    }
                );

                Swal.fire({
                    title: 'Updated!',
                    text: 'The status has been successfully updated',
                    icon: 'success'
                });

                Userview();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleButtonClick = (user_data) => {
        navigate('/users-edit', {
            state: user_data
        });
    };

    const handleReset = (e) => {
        e.preventDefault();

        setFirstName('');
        setEmail('');
        setCurrentPage(1);

        Userview();
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(userData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Users'
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        const data = new Blob(
            [excelBuffer],
            {
                type: 'application/octet-stream'
            }
        );

        saveAs(data, 'users_list.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableColumn = [
            '#',
            'First Name',
            'Last Name',
            'Email',
            'Mobile',
            'Status'
        ];

        const tableRows = userData.map(
            (user, index) => [
                index + 1,
                user.firstName,
                user.lastName,
                user.email,
                user.mobile,
                user.status ? 'Active' : 'Inactive'
            ]
        );

        doc.text('User List', 14, 15);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20
        });

        doc.save('users_list.pdf');
    };

    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentItems = userData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(
        userData.length / itemsPerPage
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

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
            <Sidebar />

            <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
                <Header />

                <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="mb-6 sm:mb-7">
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <p className="text-xs font-semibold text-blue-600 sm:text-sm">
                                    User Management
                                </p>

                                <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Users
                                </h1>

                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    Manage users, accounts and their activity.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <i className="fas fa-users" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Total Users
                                        </p>

                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.length}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/users-add"
                                    className="w-full sm:w-auto"
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto"
                                    >
                                        <span className="text-lg">+</span>
                                        Add User
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)] sm:rounded-3xl">
                        <div className="border-b border-gray-100 p-4 sm:p-6">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                <form
                                    onSubmit={searchUser}
                                    className="flex w-full flex-col gap-2 sm:flex-row xl:max-w-xl"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search first name..."
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                    />

                                    <input
                                        type="email"
                                        placeholder="Search email..."
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                    />

                                    <button
                                        type="submit"
                                        className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                                    >
                                        Search
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                                    >
                                        Reset
                                    </button>
                                </form>

                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={exportToExcel}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
                                    >
                                        📊 Excel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={exportToPDF}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                    >
                                        🧾 PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/80">
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">#</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Image</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">First Name</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Email</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Mobile</th>
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Created</th>
                                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {userData.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto flex max-w-sm flex-col items-center">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                                                        👤
                                                    </div>

                                                    <h3 className="mt-4 text-base font-bold text-gray-900">
                                                        No users found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Try searching with different details.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map(
                                            (user, index) => (
                                                <tr
                                                    key={user._id}
                                                    className="group transition hover:bg-blue-50/30"
                                                >
                                                    <td className="px-5 py-5 text-sm font-semibold text-gray-500">
                                                        {indexOfFirstItem + index + 1}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="h-12 w-12 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                                                            <img
                                                                src={`https://my-backend-api-usbu.onrender.com/uploads/${user.image}`}
                                                                alt={
                                                                    user.firstName ||
                                                                    'No image'
                                                                }
                                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                                onError={(e) => {
                                                                    e.currentTarget.src =
                                                                        'https://via.placeholder.com/100?text=User';
                                                                }}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="font-semibold text-gray-900">
                                                            {user.firstName}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="text-sm text-gray-600">
                                                            {user.lastName}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="max-w-[220px] truncate text-sm text-gray-600">
                                                            {user.email}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="text-sm text-gray-600">
                                                            {user.mobile}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(
                                                                user.createdAt
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                }
                                                            )}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    user._id
                                                                )
                                                            }
                                                            className={`relative h-7 w-12 rounded-full transition-colors ${
                                                                user.status
                                                                    ? 'bg-emerald-500'
                                                                    : 'bg-gray-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all ${
                                                                    user.status
                                                                        ? 'left-6'
                                                                        : 'left-1'
                                                                }`}
                                                            />
                                                        </button>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleButtonClick(
                                                                        user
                                                                    )
                                                                }
                                                                className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user._id
                                                                    )
                                                                }
                                                                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50/50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                            <p className="text-center text-sm text-gray-500 sm:text-left">
                                Showing{' '}
                                <span className="font-semibold text-gray-900">
                                    {userData.length === 0
                                        ? 0
                                        : indexOfFirstItem + 1}
                                </span>
                                {' '}to{' '}
                                <span className="font-semibold text-gray-900">
                                    {Math.min(
                                        indexOfLastItem,
                                        userData.length
                                    )}
                                </span>
                                {' '}of{' '}
                                <span className="font-semibold text-gray-900">
                                    {userData.length}
                                </span>
                                {' '}users
                            </p>

                            {totalPages > 0 && (
                                <div className="flex flex-wrap items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                                    >
                                        Previous
                                    </button>

                                    <div className="flex flex-wrap justify-center gap-1">
                                        {[...Array(totalPages).keys()].map(
                                            (num) => (
                                                <button
                                                    type="button"
                                                    key={num}
                                                    onClick={() =>
                                                        handlePageClick(
                                                            num + 1
                                                        )
                                                    }
                                                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                                                        currentPage ===
                                                        num + 1
                                                            ? 'bg-gray-900 text-white shadow-md'
                                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {num + 1}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNextPage}
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default User;