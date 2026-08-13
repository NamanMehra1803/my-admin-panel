import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Category() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [categoryData, setCategoryData] = useState([]);
    const [name, setName] = useState('');

    const navigate = useNavigate();

    // =====================================================
    // EDIT CATEGORY
    // =====================================================

    const handleButtonClick = (category, categoryId) => {
        navigate('/category-edit', {
            state: category,
            _id: categoryId
        });
    };

    // =====================================================
    // VIEW CATEGORY
    // =====================================================

    const categoryview = async () => {
        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/view-category'
            );

            if (Array.isArray(response.data.data)) {
                setCategoryData(response.data.data);
            } else {
                toast.error(
                    response.data.message ||
                    'Failed to fetch categories'
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                'Something went wrong while fetching categories.'
            );
        }
    };

    useEffect(() => {
        categoryview();
    }, []);

    // =====================================================
    // DELETE CATEGORY
    // =====================================================

    const handleDelete = async (catId) => {
        const result = await Swal.fire({
            title: 'Delete Category?',
            text: 'This category will be permanently deleted.',
            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',

            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel',

            reverseButtons: true,
            focusCancel: true,

            background: '#ffffff',

            customClass: {
                popup: 'rounded-4'
            }
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/delete-category',
                {
                    _id: catId
                }
            );

            if (response.data.success !== false) {
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Category has been deleted successfully.',
                    icon: 'success',

                    confirmButtonColor: '#111827',

                    timer: 1500,
                    showConfirmButton: false
                });

                await categoryview();

                // If last item of current page was deleted
                if (
                    categoryData.length > 0 &&
                    categoryData.length - 1 <=
                        (currentPage - 1) * itemsPerPage
                ) {
                    setCurrentPage((prev) =>
                        prev > 1 ? prev - 1 : 1
                    );
                }
            } else {
                toast.error(
                    response.data.message ||
                    'Delete failed'
                );
            }
        } catch (err) {
            console.error(err);

            Swal.fire({
                title: 'Error',
                text: 'Unable to delete category.',
                icon: 'error',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    // =====================================================
    // SEARCH CATEGORY
    // =====================================================

    const searchCat = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            categoryview();
            setCurrentPage(1);
            return;
        }

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/serach-category',
                {
                    name
                }
            );

            if (response.data.success) {
                setCategoryData(
                    response.data.data || []
                );

                setCurrentPage(1);
            } else {
                setCategoryData([]);

                toast.error(
                    response.data.message ||
                    'No category found'
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                'Search failed. Please try again.'
            );
        }
    };

    // =====================================================
    // RESET SEARCH
    // =====================================================

    const handleReset = () => {
        setName('');
        setCurrentPage(1);
        categoryview();
    };

    // =====================================================
    // STATUS UPDATE
    // =====================================================

    const handleStatusUpdate = async (catId) => {
        const result = await Swal.fire({
            title: 'Update Status?',
            text: 'Do you want to change category status?',
            icon: 'question',

            showCancelButton: true,

            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#64748b',

            confirmButtonText: 'Yes, Update',
            cancelButtonText: 'Cancel',

            reverseButtons: true
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/category-status',
                {
                    _id: catId
                }
            );

            if (response.data.success !== false) {
                await Swal.fire({
                    title: 'Updated!',
                    text: 'Category status has been updated.',
                    icon: 'success',

                    confirmButtonColor: '#111827',

                    timer: 1200,
                    showConfirmButton: false
                });

                categoryview();
            } else {
                toast.error(
                    response.data.message ||
                    'Status update failed'
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                'Unable to update category status.'
            );
        }
    };

    // =====================================================
    // EXPORT EXCEL
    // =====================================================

    const exportToExcel = () => {
        if (categoryData.length === 0) {
            toast.error(
                'No category data to export.'
            );

            return;
        }

        const dataToExport = categoryData.map(
            (category, index) => ({
                '#': index + 1,

                Name:
                    category.name || '',

                Description:
                    category.description || '',

                Status:
                    category.status
                        ? 'Active'
                        : 'Inactive',

                Created:
                    new Date(
                        category.createdAt
                    ).toLocaleDateString()
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
            'Categories'
        );

        const excelBuffer =
            XLSX.write(
                workbook,
                {
                    bookType: 'xlsx',
                    type: 'array'
                }
            );

        const data = new Blob(
            [excelBuffer],
            {
                type: 'application/octet-stream'
            }
        );

        saveAs(
            data,
            'categories.xlsx'
        );
    };

    // =====================================================
    // EXPORT PDF
    // =====================================================

    const exportToPDF = () => {
        if (categoryData.length === 0) {
            toast.error(
                'No category data to export.'
            );

            return;
        }

        const doc = new jsPDF();

        const tableColumn = [
            '#',
            'Name',
            'Description',
            'Status',
            'Created'
        ];

        const tableRows = [];

        categoryData.forEach(
            (category, index) => {
                tableRows.push([
                    index + 1,

                    category.name || '',

                    category.description || '',

                    category.status
                        ? 'Active'
                        : 'Inactive',

                    new Date(
                        category.createdAt
                    ).toLocaleDateString()
                ]);
            }
        );

        doc.text(
            'Category List',
            14,
            15
        );

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,

            startY: 20,

            styles: {
                fontSize: 9
            },

            headStyles: {
                fontSize: 9
            }
        });

        doc.save(
            'categories.pdf'
        );
    };

    // =====================================================
    // PAGINATION
    // =====================================================

    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentItems =
        categoryData.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

    const totalPages =
        Math.ceil(
            categoryData.length /
            itemsPerPage
        );

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(
                currentPage - 1
            );
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(
                currentPage + 1
            );
        }
    };

    const handlePageClick = (pageNum) => {
        setCurrentPage(pageNum);
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <Sidebar />

            {/* =================================================
                MAIN CONTENT

                Mobile:
                ml-[58px]

                Tablet:
                ml-[64px]

                Laptop:
                ml-[255px]
            ================================================= */}

            <div className="
                ml-[58px]
                flex
                min-h-screen
                min-w-0
                flex-col

                sm:ml-[64px]

                lg:ml-[255px]
            ">

                <Header />

                <main className="
                    flex-1
                    px-3
                    py-4

                    sm:px-6
                    sm:py-6

                    lg:px-8
                ">

                    {/* =================================================
                        PAGE HEADER
                    ================================================= */}

                    <div className="mb-6 sm:mb-7">

                        <div className="
                            flex
                            flex-col
                            gap-4

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        ">

                            {/* TITLE */}

                            <div>

                                <p className="
                                    text-xs
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-blue-600

                                    sm:text-sm
                                ">
                                    Category Management
                                </p>

                                <h1 className="
                                    mt-1
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-gray-900

                                    sm:text-3xl
                                ">
                                    Categories
                                </h1>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-gray-500

                                    sm:text-sm
                                ">
                                    Manage your product categories
                                </p>

                            </div>

                            {/* ADD CATEGORY */}

                            <Link
                                to="/category-add"
                                className="w-full sm:w-auto"
                            >

                                <button
                                    type="button"
                                    className="
                                        inline-flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2

                                        rounded-xl
                                        bg-gray-900

                                        px-6
                                        py-3

                                        text-sm
                                        font-semibold
                                        text-white

                                        shadow-lg
                                        shadow-gray-200

                                        transition
                                        duration-300

                                        hover:-translate-y-0.5
                                        hover:bg-blue-600

                                        sm:w-auto
                                    "
                                >

                                    <span className="
                                        text-lg
                                        leading-none
                                    ">
                                        +
                                    </span>

                                    Add Category

                                </button>

                            </Link>

                        </div>

                    </div>

                    {/* =================================================
                        MAIN CARD
                    ================================================= */}

                    <div className="
                        overflow-hidden

                        rounded-2xl
                        border
                        border-gray-100
                        bg-white

                        shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)]

                        sm:rounded-3xl
                    ">

                        {/* =================================================
                            TOOLBAR
                        ================================================= */}

                        <div className="
                            border-b
                            border-gray-100
                            p-4

                            sm:p-6
                        ">

                            <div className="
                                flex
                                flex-col
                                gap-4

                                xl:flex-row
                                xl:items-center
                                xl:justify-between
                            ">

                                {/* SEARCH */}

                                <form
                                    onSubmit={searchCat}
                                    className="
                                        flex
                                        w-full
                                        flex-col
                                        gap-2

                                        sm:flex-row

                                        xl:max-w-md
                                    "
                                >

                                    <div className="
                                        relative
                                        min-w-0
                                        flex-1
                                    ">

                                        <svg
                                            className="
                                                absolute
                                                left-3
                                                top-1/2

                                                h-5
                                                w-5

                                                -translate-y-1/2

                                                text-gray-400
                                            "
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            viewBox="0 0 24 24"
                                        >

                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                            />

                                        </svg>

                                        <input
                                            type="text"
                                            placeholder="Search category..."
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            className="
                                                w-full
                                                rounded-xl

                                                border
                                                border-gray-200

                                                bg-gray-50

                                                py-3
                                                pl-10
                                                pr-4

                                                text-sm

                                                outline-none

                                                transition
                                                duration-200

                                                focus:border-blue-500
                                                focus:bg-white
                                                focus:ring-4
                                                focus:ring-blue-50
                                            "
                                        />

                                    </div>

                                    <div className="
                                        flex
                                        gap-2
                                    ">

                                        <button
                                            type="submit"
                                            className="
                                                flex-1
                                                rounded-xl

                                                bg-gray-900

                                                px-5
                                                py-3

                                                text-sm
                                                font-semibold
                                                text-white

                                                transition

                                                hover:bg-blue-600

                                                sm:flex-none
                                            "
                                        >
                                            Search
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="
                                                flex-1
                                                rounded-xl

                                                border
                                                border-gray-200

                                                bg-white

                                                px-5
                                                py-3

                                                text-sm
                                                font-semibold
                                                text-gray-600

                                                transition

                                                hover:bg-gray-50

                                                sm:flex-none
                                            "
                                        >
                                            Reset
                                        </button>

                                    </div>

                                </form>

                                {/* EXPORT BUTTONS */}

                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-2

                                    sm:flex
                                ">

                                    <button
                                        type="button"
                                        onClick={exportToExcel}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2

                                            rounded-xl

                                            border
                                            border-emerald-200

                                            bg-emerald-50

                                            px-4
                                            py-3

                                            text-xs
                                            font-semibold
                                            text-emerald-700

                                            transition

                                            hover:bg-emerald-600
                                            hover:text-white

                                            sm:px-5
                                            sm:text-sm
                                        "
                                    >
                                        📊 Excel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={exportToPDF}
                                        className="
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2

                                            rounded-xl

                                            border
                                            border-red-200

                                            bg-red-50

                                            px-4
                                            py-3

                                            text-xs
                                            font-semibold
                                            text-red-600

                                            transition

                                            hover:bg-red-600
                                            hover:text-white

                                            sm:px-5
                                            sm:text-sm
                                        "
                                    >
                                        🧾 PDF
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            TABLE

                            On mobile table will horizontally scroll.
                        ================================================= */}

                        <div className="
                            w-full
                            overflow-x-auto
                        ">

                            <table className="
                                w-full
                                min-w-[900px]
                            ">

                                <thead>

                                    <tr className="
                                        border-b
                                        border-gray-100

                                        bg-gray-50/80
                                    ">

                                        <th className="
                                            px-4
                                            py-4

                                            text-left
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            #
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-left
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Image
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-left
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Name
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-left
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Description
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-left
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Created
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-center
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Status
                                        </th>

                                        <th className="
                                            px-4
                                            py-4

                                            text-center
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-gray-500

                                            sm:px-5
                                        ">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {currentItems.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="
                                                    px-6
                                                    py-16
                                                    text-center
                                                "
                                            >

                                                <div className="
                                                    mx-auto
                                                    flex
                                                    max-w-sm
                                                    flex-col
                                                    items-center
                                                ">

                                                    <div className="
                                                        flex
                                                        h-16
                                                        w-16

                                                        items-center
                                                        justify-center

                                                        rounded-2xl

                                                        bg-gray-100

                                                        text-2xl
                                                    ">
                                                        📂
                                                    </div>

                                                    <h3 className="
                                                        mt-4
                                                        text-base
                                                        font-bold
                                                        text-gray-900
                                                    ">
                                                        No categories found
                                                    </h3>

                                                    <p className="
                                                        mt-1
                                                        text-sm
                                                        text-gray-500
                                                    ">
                                                        Try searching for another category.
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        currentItems.map(
                                            (category, index) => (

                                                <tr
                                                    key={category._id}
                                                    className="
                                                        group
                                                        transition
                                                        duration-200

                                                        hover:bg-blue-50/30
                                                    "
                                                >

                                                    {/* NUMBER */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        text-sm
                                                        font-semibold
                                                        text-gray-500

                                                        sm:px-5
                                                    ">
                                                        {indexOfFirstItem +
                                                            index +
                                                            1}
                                                    </td>

                                                    {/* IMAGE */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        sm:px-5
                                                    ">

                                                        <div className="
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
                                                        ">

                                                            <img
                                                                src={
                                                                    category.image
                                                                        ? `https://my-backend-api-usbu.onrender.com/uploads/${category.image}`
                                                                        : 'https://via.placeholder.com/100?text=No+Image'
                                                                }
                                                                alt={
                                                                    category.name ||
                                                                    'No image'
                                                                }
                                                                className="
                                                                    h-full
                                                                    w-full
                                                                    object-cover

                                                                    transition
                                                                    duration-300

                                                                    group-hover:scale-110
                                                                "
                                                                onError={(e) => {
                                                                    e.currentTarget.src =
                                                                        'https://via.placeholder.com/100?text=No+Image';
                                                                }}
                                                            />

                                                        </div>

                                                    </td>

                                                    {/* NAME */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        sm:px-5
                                                    ">

                                                        <p className="
                                                            font-semibold
                                                            text-gray-900
                                                        ">
                                                            {category.name}
                                                        </p>

                                                    </td>

                                                    {/* DESCRIPTION */}

                                                    <td className="
                                                        max-w-xs
                                                        px-4
                                                        py-5

                                                        sm:px-5
                                                    ">

                                                        <p className="
                                                            max-w-[280px]
                                                            truncate

                                                            text-sm
                                                            text-gray-500
                                                        ">
                                                            {category.description ||
                                                                'No description'}
                                                        </p>

                                                    </td>

                                                    {/* CREATED */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        text-sm
                                                        text-gray-500

                                                        sm:px-5
                                                    ">

                                                        {category.createdAt
                                                            ? new Date(
                                                                category.createdAt
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                }
                                                            )
                                                            : '-'
                                                        }

                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        text-center

                                                        sm:px-5
                                                    ">

                                                        <button
                                                            type="button"

                                                            aria-label="Change category status"

                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    category._id
                                                                )
                                                            }

                                                            className={`
                                                                relative
                                                                h-7
                                                                w-12

                                                                rounded-full

                                                                transition-colors
                                                                duration-300

                                                                ${
                                                                    category.status
                                                                        ? 'bg-emerald-500'
                                                                        : 'bg-gray-300'
                                                                }
                                                            `}
                                                        >

                                                            <span
                                                                className={`
                                                                    absolute
                                                                    top-1

                                                                    h-5
                                                                    w-5

                                                                    rounded-full

                                                                    bg-white

                                                                    shadow-md

                                                                    transition-all
                                                                    duration-300

                                                                    ${
                                                                        category.status
                                                                            ? 'left-6'
                                                                            : 'left-1'
                                                                    }
                                                                `}
                                                            />

                                                        </button>

                                                    </td>

                                                    {/* ACTION */}

                                                    <td className="
                                                        px-4
                                                        py-5

                                                        sm:px-5
                                                    ">

                                                        <div className="
                                                            flex
                                                            justify-center
                                                            gap-2
                                                        ">

                                                            {/* EDIT */}

                                                            <button
                                                                type="button"

                                                                onClick={() =>
                                                                    handleButtonClick(
                                                                        category,
                                                                        category._id
                                                                    )
                                                                }

                                                                className="
                                                                    rounded-lg

                                                                    border
                                                                    border-blue-200

                                                                    bg-blue-50

                                                                    px-3
                                                                    py-2

                                                                    text-xs
                                                                    font-semibold
                                                                    text-blue-600

                                                                    transition

                                                                    hover:bg-blue-600
                                                                    hover:text-white

                                                                    sm:px-4
                                                                "
                                                            >
                                                                Edit
                                                            </button>

                                                            {/* DELETE */}

                                                            <button
                                                                type="button"

                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category._id
                                                                    )
                                                                }

                                                                className="
                                                                    rounded-lg

                                                                    border
                                                                    border-red-200

                                                                    bg-red-50

                                                                    px-3
                                                                    py-2

                                                                    text-xs
                                                                    font-semibold
                                                                    text-red-600

                                                                    transition

                                                                    hover:bg-red-600
                                                                    hover:text-white

                                                                    sm:px-4
                                                                "
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

                        {/* =================================================
                            PAGINATION
                        ================================================= */}

                        <div className="
                            flex
                            flex-col
                            gap-4

                            border-t
                            border-gray-100

                            bg-gray-50/50

                            px-4
                            py-5

                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            sm:px-5
                        ">

                            {/* COUNT */}

                            <p className="
                                text-center
                                text-xs
                                text-gray-500

                                sm:text-left
                                sm:text-sm
                            ">

                                Showing{' '}

                                <span className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    {categoryData.length === 0
                                        ? 0
                                        : indexOfFirstItem + 1}
                                </span>

                                {' '}to{' '}

                                <span className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    {Math.min(
                                        indexOfLastItem,
                                        categoryData.length
                                    )}
                                </span>

                                {' '}of{' '}

                                <span className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    {categoryData.length}
                                </span>

                                {' '}categories

                            </p>

                            {/* PAGINATION BUTTONS */}

                            {totalPages > 0 && (

                                <div className="
                                    flex
                                    flex-wrap
                                    items-center
                                    justify-center
                                    gap-1
                                ">

                                    <button
                                        type="button"

                                        onClick={handlePrevPage}

                                        disabled={
                                            currentPage === 1
                                        }

                                        className="
                                            rounded-lg

                                            border
                                            border-gray-200

                                            bg-white

                                            px-3
                                            py-2

                                            text-xs
                                            font-medium
                                            text-gray-600

                                            transition

                                            hover:bg-gray-50

                                            disabled:cursor-not-allowed
                                            disabled:opacity-40

                                            sm:px-4
                                            sm:text-sm
                                        "
                                    >
                                        Previous
                                    </button>

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

                                                className={`
                                                    h-9
                                                    min-w-9

                                                    rounded-lg

                                                    px-2

                                                    text-xs
                                                    font-semibold

                                                    transition

                                                    sm:px-3
                                                    sm:text-sm

                                                    ${
                                                        currentPage ===
                                                        num + 1
                                                            ? 'bg-gray-900 text-white shadow-md'
                                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                {num + 1}
                                            </button>

                                        )
                                    )}

                                    <button
                                        type="button"

                                        onClick={handleNextPage}

                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }

                                        className="
                                            rounded-lg

                                            border
                                            border-gray-200

                                            bg-white

                                            px-3
                                            py-2

                                            text-xs
                                            font-medium
                                            text-gray-600

                                            transition

                                            hover:bg-gray-50

                                            disabled:cursor-not-allowed
                                            disabled:opacity-40

                                            sm:px-4
                                            sm:text-sm
                                        "
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