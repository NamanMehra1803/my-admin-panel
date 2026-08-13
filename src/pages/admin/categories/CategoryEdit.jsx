import React, { useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function CategoryEdit() {
    const navigate = useNavigate();
    const location = useLocation();

    const lineData = location.state || {};

    const userId = lineData._id || '';

    const [name, setName] = useState(lineData.name || '');
    const [description, setDescription] = useState(
        lineData.description || ''
    );

    const [image, setImage] = useState(null);

    const oldImageUrl = lineData.image
        ? `https://my-backend-api-usbu.onrender.com/uploads/${lineData.image}`
        : '';

    const [imagePreview, setImagePreview] = useState(oldImageUrl);

    const [loading, setLoading] = useState(false);

    // =========================
    // IMAGE CHANGE
    // =========================

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB.');
            e.target.value = '';
            return;
        }

        setImage(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    // =========================
    // REMOVE NEW IMAGE
    // =========================

    const removeImage = () => {
        setImage(null);
        setImagePreview(oldImageUrl);
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error('Category ID not found.');
            return;
        }

        if (!name.trim()) {
            toast.error('Please enter category name.');
            return;
        }

        if (!description.trim()) {
            toast.error('Please enter category description.');
            return;
        }

        const formData = new FormData();

        formData.append('name', name);
        formData.append('_id', userId);
        formData.append('description', description);

        if (image) {
            formData.append('image', image);
        }

        try {
            setLoading(true);

            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/update-category',
                formData
            );

            const msg = response.data.message;

            if (response.data.success) {
                toast.success(
                    msg || 'Category updated successfully.'
                );

                setTimeout(() => {
                    navigate('/category');
                }, 1500);
            } else {
                toast.error(
                    msg || 'Unable to update category.'
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message ||
                'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CATEGORY NOT FOUND
    // =========================

    if (!lineData._id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
                        ⚠️
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Category Not Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Please go back to the category page and try again.
                    </p>

                    <Link
                        to="/category"
                        className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                        Back to Categories
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* ================= SIDEBAR ================= */}

            <Sidebar />

            {/* ================= MAIN ================= */}

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

                <Header />

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

                    {/* ================= PAGE HEADER ================= */}

                    <div className="mx-auto mb-6 max-w-5xl">

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

                            <div className="min-w-0">

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
                                    Category Management
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
                                    Edit Category
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-500

                                        sm:text-sm
                                    "
                                >
                                    Update your category information.
                                </p>

                            </div>

                            {/* BACK BUTTON */}

                            <Link
                                to="/category"
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

                                        border
                                        border-gray-200

                                        bg-white

                                        px-5
                                        py-3

                                        text-sm
                                        font-semibold
                                        text-gray-700

                                        shadow-sm

                                        transition
                                        duration-300

                                        hover:border-gray-300
                                        hover:bg-gray-50

                                        sm:w-auto
                                    "
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

                                    Back to Categories

                                </button>

                            </Link>

                        </div>

                    </div>

                    {/* ================= CARD ================= */}

                    <div
                        className="
                            mx-auto
                            max-w-5xl
                            overflow-hidden

                            rounded-2xl

                            border
                            border-gray-100

                            bg-white

                            shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]

                            sm:rounded-3xl
                        "
                    >

                        {/* ================= CARD HEADER ================= */}

                        <div
                            className="
                                border-b
                                border-gray-100

                                px-5
                                py-5

                                sm:px-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3

                                    sm:gap-4
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0

                                        items-center
                                        justify-center

                                        rounded-xl

                                        bg-blue-50
                                        text-blue-600

                                        sm:h-12
                                        sm:w-12
                                        sm:rounded-2xl
                                    "
                                >

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
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13l-3.375 1.125 1.125-3.375a4.5 4.5 0 011.13-1.897l9.297-9.297z"
                                        />

                                    </svg>

                                </div>

                                <div className="min-w-0">

                                    <h2
                                        className="
                                            text-base
                                            font-bold
                                            text-gray-900

                                            sm:text-lg
                                        "
                                    >
                                        Category Details
                                    </h2>

                                    <p
                                        className="
                                            text-xs
                                            text-gray-500

                                            sm:text-sm
                                        "
                                    >
                                        Edit the details of your category.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* ================= FORM ================= */}

                        <form onSubmit={handleSubmit}>

                            <div
                                className="
                                    grid
                                    gap-6

                                    px-5
                                    py-6

                                    sm:gap-8
                                    sm:px-8
                                    sm:py-8

                                    lg:grid-cols-2
                                "
                            >

                                {/* ================= LEFT ================= */}

                                <div className="space-y-6">

                                    {/* NAME */}

                                    <div>

                                        <label
                                            className="
                                                mb-2
                                                block

                                                text-sm
                                                font-semibold
                                                text-gray-800
                                            "
                                        >
                                            Category Name

                                            <span className="ml-1 text-red-500">
                                                *
                                            </span>

                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                            placeholder="Enter category name"
                                            className="
                                                w-full

                                                rounded-xl

                                                border
                                                border-gray-200

                                                bg-gray-50

                                                px-4
                                                py-3.5

                                                text-sm
                                                text-gray-900

                                                outline-none

                                                transition

                                                placeholder:text-gray-400

                                                focus:border-blue-500
                                                focus:bg-white
                                                focus:ring-4
                                                focus:ring-blue-50
                                            "
                                        />

                                    </div>

                                    {/* DESCRIPTION */}

                                    <div>

                                        <label
                                            className="
                                                mb-2
                                                block

                                                text-sm
                                                font-semibold
                                                text-gray-800
                                            "
                                        >
                                            Description

                                            <span className="ml-1 text-red-500">
                                                *
                                            </span>

                                        </label>

                                        <textarea
                                            name="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                            required
                                            rows={8}
                                            placeholder="Write category description..."
                                            className="
                                                w-full

                                                resize-none

                                                rounded-xl

                                                border
                                                border-gray-200

                                                bg-gray-50

                                                px-4
                                                py-3.5

                                                text-sm
                                                leading-6
                                                text-gray-900

                                                outline-none

                                                transition

                                                placeholder:text-gray-400

                                                focus:border-blue-500
                                                focus:bg-white
                                                focus:ring-4
                                                focus:ring-blue-50
                                            "
                                        />

                                        <div className="mt-2 flex justify-end">

                                            <span
                                                className="
                                                    text-xs
                                                    text-gray-400
                                                "
                                            >
                                                {description.length}
                                                {' '}characters
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* ================= RIGHT IMAGE ================= */}

                                <div>

                                    <label
                                        className="
                                            mb-2
                                            block

                                            text-sm
                                            font-semibold
                                            text-gray-800
                                        "
                                    >
                                        Category Image
                                    </label>

                                    <div
                                        className="
                                            rounded-2xl

                                            border
                                            border-gray-200

                                            bg-gray-50

                                            p-3

                                            sm:p-4
                                        "
                                    >

                                        {/* IMAGE PREVIEW */}

                                        {imagePreview ? (

                                            <div
                                                className="
                                                    relative
                                                    overflow-hidden
                                                    rounded-xl

                                                    bg-white

                                                    shadow-sm
                                                "
                                            >

                                                <img
                                                    src={imagePreview}
                                                    alt="Category"
                                                    className="
                                                        h-56
                                                        w-full

                                                        object-cover

                                                        sm:h-72
                                                    "
                                                />

                                                {/* REMOVE NEW IMAGE */}

                                                {image && (

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            removeImage
                                                        }
                                                        className="
                                                            absolute
                                                            right-3
                                                            top-3

                                                            flex
                                                            h-9
                                                            w-9

                                                            items-center
                                                            justify-center

                                                            rounded-full

                                                            bg-white

                                                            text-xl
                                                            text-gray-700

                                                            shadow-lg

                                                            transition

                                                            hover:bg-red-500
                                                            hover:text-white
                                                        "
                                                    >
                                                        ×
                                                    </button>

                                                )}

                                            </div>

                                        ) : (

                                            <div
                                                className="
                                                    flex
                                                    h-56

                                                    items-center
                                                    justify-center

                                                    rounded-xl

                                                    bg-white

                                                    text-sm
                                                    text-gray-400

                                                    sm:h-72
                                                "
                                            >
                                                No image available
                                            </div>

                                        )}

                                        {/* UPLOAD */}

                                        <label
                                            className="
                                                mt-4

                                                flex
                                                cursor-pointer

                                                items-center
                                                justify-center

                                                gap-3

                                                rounded-xl

                                                border-2
                                                border-dashed
                                                border-gray-300

                                                bg-white

                                                px-4
                                                py-5

                                                transition

                                                hover:border-blue-400
                                                hover:bg-blue-50/30
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0

                                                    items-center
                                                    justify-center

                                                    rounded-xl

                                                    bg-blue-50
                                                    text-blue-600
                                                "
                                            >

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

                                            <div className="min-w-0">

                                                <p
                                                    className="
                                                        text-sm
                                                        font-semibold
                                                        text-gray-700
                                                    "
                                                >
                                                    Change Image
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-400
                                                    "
                                                >
                                                    PNG, JPG, JPEG
                                                    up to 5MB
                                                </p>

                                            </div>

                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={
                                                    handleImageChange
                                                }
                                                className="hidden"
                                            />

                                        </label>

                                        {/* NEW IMAGE NAME */}

                                        {image && (

                                            <div
                                                className="
                                                    mt-3

                                                    flex
                                                    items-center
                                                    justify-between

                                                    gap-3

                                                    rounded-lg

                                                    bg-white

                                                    px-3
                                                    py-2
                                                "
                                            >

                                                <p
                                                    className="
                                                        min-w-0
                                                        truncate

                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >
                                                    {image.name}
                                                </p>

                                                <span
                                                    className="
                                                        shrink-0

                                                        text-xs
                                                        font-medium

                                                        text-emerald-600
                                                    "
                                                >
                                                    New Image
                                                </span>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* ================= BUTTONS ================= */}

                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    gap-3

                                    border-t
                                    border-gray-100

                                    bg-gray-50/60

                                    px-5
                                    py-5

                                    sm:flex-row
                                    sm:justify-end
                                    sm:px-8
                                "
                            >

                                <Link
                                    to="/category"
                                    className="w-full sm:w-auto"
                                >

                                    <button
                                        type="button"
                                        disabled={loading}
                                        className="
                                            w-full

                                            rounded-xl

                                            border
                                            border-gray-200

                                            bg-white

                                            px-7
                                            py-3

                                            text-sm
                                            font-semibold
                                            text-gray-700

                                            shadow-sm

                                            transition

                                            hover:bg-gray-50

                                            disabled:cursor-not-allowed
                                            disabled:opacity-60

                                            sm:w-auto
                                        "
                                    >
                                        Cancel
                                    </button>

                                </Link>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        inline-flex
                                        w-full

                                        items-center
                                        justify-center
                                        gap-2

                                        rounded-xl

                                        bg-gray-900

                                        px-8
                                        py-3

                                        text-sm
                                        font-semibold
                                        text-white

                                        shadow-lg

                                        transition

                                        hover:bg-blue-600

                                        disabled:cursor-not-allowed
                                        disabled:opacity-60

                                        sm:w-auto
                                    "
                                >

                                    {loading ? (

                                        <>
                                            <svg
                                                className="
                                                    h-5
                                                    w-5
                                                    animate-spin
                                                "
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >

                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                />

                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />

                                            </svg>

                                            Updating...
                                        </>

                                    ) : (

                                        <>
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />

                                            </svg>

                                            Update Category
                                        </>

                                    )}

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