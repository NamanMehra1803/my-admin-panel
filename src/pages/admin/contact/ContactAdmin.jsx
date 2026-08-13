import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import { Modal, Button } from 'react-bootstrap';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Contact() {
    const [contactData, setContactData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const [showModal, setShowModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // =========================
    // FETCH CONTACT
    // =========================

    const contactview = async () => {
        try {
            const ApiUrl =
                'https://my-backend-api-usbu.onrender.com/view-contact';

            const response = await axios.post(ApiUrl);

            if (Array.isArray(response.data.data)) {
                setContactData(response.data.data);
            } else {
                setContactData([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        contactview();
    }, []);

    // =========================
    // SEARCH
    // =========================

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = contactData.filter((contact) => {
        const query = searchQuery.toLowerCase();

        return (
            contact.name
                ?.toLowerCase()
                .includes(query) ||
            contact.email
                ?.toLowerCase()
                .includes(query) ||
            contact.phone
                ?.toLowerCase()
                .includes(query) ||
            contact.message
                ?.toLowerCase()
                .includes(query)
        );
    });

    // =========================
    // PAGINATION
    // =========================

    const indexOfLastItem =
        currentPage * itemsPerPage;

    const indexOfFirstItem =
        indexOfLastItem - itemsPerPage;

    const currentItems = filteredData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
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

    // =========================
    // VIEW MESSAGE
    // =========================

    const handleViewMessage = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    // =========================
    // CLOSE MODAL
    // =========================

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContact(null);
    };

    // =========================
    // DELETE
    // =========================

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this message?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (!result.isConfirmed) return;

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/delete-contact',
                {
                    _id: userId
                }
            );

            if (response.data.success !== false) {
                await Swal.fire({
                    title: 'Deleted!',
                    text: 'Contact message has been deleted.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                contactview();

                if (
                    currentItems.length === 1 &&
                    currentPage > 1
                ) {
                    setCurrentPage((prev) => prev - 1);
                }
            } else {
                Swal.fire({
                    title: 'Error',
                    text:
                        response.data.message ||
                        'Unable to delete message.',
                    icon: 'error'
                });
            }
        } catch (err) {
            console.error(err);

            Swal.fire({
                title: 'Error',
                text: 'Unable to delete message.',
                icon: 'error'
            });
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">

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
                                    Communication
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
                                    Contact Messages
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-gray-500

                                        sm:text-sm
                                    "
                                >
                                    Manage and review messages received
                                    from your customers.
                                </p>

                            </div>

                            {/* MESSAGE COUNT */}

                            <div
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-3

                                    rounded-2xl
                                    border
                                    border-gray-100

                                    bg-white

                                    px-4
                                    py-3

                                    shadow-sm

                                    sm:w-fit
                                    sm:px-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0

                                        items-center
                                        justify-center

                                        rounded-xl

                                        bg-blue-50
                                        text-blue-600
                                    "
                                >
                                    <FaEnvelopeOpenText size={19} />
                                </div>

                                <div>

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            text-gray-400
                                        "
                                    >
                                        Total Messages
                                    </p>

                                    <p
                                        className="
                                            text-lg
                                            font-bold
                                            text-gray-900
                                        "
                                    >
                                        {contactData.length}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* ================= MAIN CARD ================= */}

                    <div
                        className="
                            overflow-hidden

                            rounded-2xl
                            border
                            border-gray-100

                            bg-white

                            shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)]

                            sm:rounded-3xl
                        "
                    >

                        {/* ================= SEARCH ================= */}

                        <div
                            className="
                                border-b
                                border-gray-100

                                p-4

                                sm:p-6
                            "
                        >

                            <div className="relative w-full sm:max-w-md">

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
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
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

                        </div>

                        {/* ================= TABLE ================= */}

                        <div className="w-full overflow-x-auto">

                            <table
                                className="
                                    w-full
                                    min-w-[1000px]
                                "
                            >

                                <thead>

                                    <tr
                                        className="
                                            border-b
                                            border-gray-100

                                            bg-gray-50/80
                                        "
                                    >

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            #
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Name
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Email
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Message
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Mobile
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-left
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Created
                                        </th>

                                        <th
                                            className="
                                                px-4
                                                py-4

                                                text-center
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wider
                                                text-gray-500

                                                sm:px-5
                                            "
                                        >
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody
                                    className="
                                        divide-y
                                        divide-gray-100
                                    "
                                >

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

                                                <div
                                                    className="
                                                        mx-auto
                                                        flex
                                                        max-w-sm
                                                        flex-col
                                                        items-center
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            h-16
                                                            w-16

                                                            items-center
                                                            justify-center

                                                            rounded-2xl

                                                            bg-gray-100
                                                            text-blue-500
                                                        "
                                                    >
                                                        <FaEnvelopeOpenText
                                                            size={27}
                                                        />
                                                    </div>

                                                    <h3
                                                        className="
                                                            mt-4
                                                            text-base
                                                            font-bold
                                                            text-gray-900
                                                        "
                                                    >
                                                        No messages found
                                                    </h3>

                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            text-gray-500
                                                        "
                                                    >
                                                        No contact messages
                                                        match your search.
                                                    </p>

                                                </div>

                                            </td>

                                        </tr>

                                    ) : (

                                        currentItems.map(
                                            (contact, index) => (

                                                <tr
                                                    key={contact._id}
                                                    className="
                                                        group
                                                        transition
                                                        hover:bg-blue-50/30
                                                    "
                                                >

                                                    {/* NUMBER */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            text-sm
                                                            font-semibold
                                                            text-gray-500

                                                            sm:px-5
                                                        "
                                                    >
                                                        {indexOfFirstItem +
                                                            index +
                                                            1}
                                                    </td>

                                                    {/* NAME */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            sm:px-5
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    h-10
                                                                    w-10
                                                                    shrink-0

                                                                    items-center
                                                                    justify-center

                                                                    rounded-xl

                                                                    bg-blue-50

                                                                    text-sm
                                                                    font-bold
                                                                    text-blue-600
                                                                "
                                                            >
                                                                {contact.name
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase()}
                                                            </div>

                                                            <p
                                                                className="
                                                                    font-semibold
                                                                    text-gray-900
                                                                "
                                                            >
                                                                {contact.name}
                                                            </p>

                                                        </div>

                                                    </td>

                                                    {/* EMAIL */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            sm:px-5
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                max-w-[220px]
                                                                truncate

                                                                text-sm
                                                                text-gray-600
                                                            "
                                                        >
                                                            {contact.email}
                                                        </p>

                                                    </td>

                                                    {/* MESSAGE */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            sm:px-5
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                max-w-[280px]
                                                                truncate

                                                                text-sm
                                                                text-gray-500
                                                            "
                                                        >
                                                            {contact.message}
                                                        </p>

                                                    </td>

                                                    {/* PHONE */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            text-sm
                                                            text-gray-600

                                                            sm:px-5
                                                        "
                                                    >
                                                        {contact.phone}
                                                    </td>

                                                    {/* DATE */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            text-sm
                                                            text-gray-500

                                                            sm:px-5
                                                        "
                                                    >

                                                        {new Date(
                                                            contact.createdAt
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            }
                                                        )}

                                                    </td>

                                                    {/* ACTION */}

                                                    <td
                                                        className="
                                                            px-4
                                                            py-5

                                                            sm:px-5
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                justify-center
                                                                gap-2
                                                            "
                                                        >

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleViewMessage(
                                                                        contact
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
                                                                View
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        contact._id
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

                        {/* ================= PAGINATION ================= */}

                        <div
                            className="
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
                            "
                        >

                            <p
                                className="
                                    text-center
                                    text-xs
                                    text-gray-500

                                    sm:text-left
                                    sm:text-sm
                                "
                            >

                                Showing{' '}

                                <span
                                    className="
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {filteredData.length === 0
                                        ? 0
                                        : indexOfFirstItem + 1}
                                </span>

                                {' '}to{' '}

                                <span
                                    className="
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {Math.min(
                                        indexOfLastItem,
                                        filteredData.length
                                    )}
                                </span>

                                {' '}of{' '}

                                <span
                                    className="
                                        font-semibold
                                        text-gray-900
                                    "
                                >
                                    {filteredData.length}
                                </span>

                                {' '}messages

                            </p>

                            {totalPages > 0 && (

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        items-center
                                        justify-center
                                        gap-1
                                    "
                                >

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

            {/* ================= CONTACT MODAL ================= */}

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                size="lg"
                centered
                aria-labelledby="contact-modal-title"
                backdropClassName="contact-modal-backdrop"
            >

                <div
                    className="
                        overflow-hidden

                        rounded-2xl
                        border-0

                        bg-white

                        shadow-2xl

                        sm:rounded-3xl
                    "
                >

                    {/* MODAL HEADER */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between

                            border-b
                            border-gray-100

                            bg-gray-50

                            px-4
                            py-4

                            sm:px-6
                            sm:py-5
                        "
                    >

                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-3

                                sm:gap-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
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
                                <FaEnvelopeOpenText
                                    size={20}
                                />
                            </div>

                            <div className="min-w-0">

                                <h2
                                    id="contact-modal-title"
                                    className="
                                        text-lg
                                        font-bold
                                        text-gray-900

                                        sm:text-xl
                                    "
                                >
                                    Contact Details
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500

                                        sm:text-sm
                                    "
                                >
                                    Message information
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0

                                items-center
                                justify-center

                                rounded-xl

                                bg-white

                                text-xl
                                text-gray-400

                                shadow-sm

                                transition

                                hover:bg-gray-100
                                hover:text-gray-700
                            "
                        >
                            ×
                        </button>

                    </div>

                    {/* MODAL BODY */}

                    <div
                        className="
                            max-h-[75vh]
                            overflow-y-auto

                            px-4
                            py-6

                            sm:px-6
                            sm:py-7
                        "
                    >

                        {selectedContact && (

                            <div className="space-y-5">

                                {/* USER */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4

                                        rounded-2xl

                                        bg-gray-50

                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-12
                                            w-12
                                            shrink-0

                                            items-center
                                            justify-center

                                            rounded-2xl

                                            bg-blue-100

                                            text-lg
                                            font-bold
                                            text-blue-600

                                            sm:h-14
                                            sm:w-14
                                        "
                                    >
                                        {selectedContact.name
                                            ?.charAt(0)
                                            ?.toUpperCase()}
                                    </div>

                                    <div className="min-w-0">

                                        <h3
                                            className="
                                                truncate
                                                font-bold
                                                text-gray-900
                                            "
                                        >
                                            {selectedContact.name}
                                        </h3>

                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                text-gray-500
                                            "
                                        >
                                            {selectedContact.email}
                                        </p>

                                    </div>

                                </div>

                                {/* DETAILS */}

                                <div
                                    className="
                                        grid
                                        gap-3

                                        sm:grid-cols-2
                                        sm:gap-4
                                    "
                                >

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-gray-100

                                            bg-white

                                            p-4

                                            shadow-sm
                                        "
                                    >

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                            "
                                        >
                                            Name
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                font-semibold
                                                text-gray-900
                                            "
                                        >
                                            {selectedContact.name}
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-gray-100

                                            bg-white

                                            p-4

                                            shadow-sm
                                        "
                                    >

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                            "
                                        >
                                            Email
                                        </p>

                                        <p
                                            className="
                                                mt-2

                                                break-all

                                                text-sm
                                                font-semibold
                                                text-gray-900
                                            "
                                        >
                                            {selectedContact.email}
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-gray-100

                                            bg-white

                                            p-4

                                            shadow-sm
                                        "
                                    >

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                            "
                                        >
                                            Phone
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                font-semibold
                                                text-gray-900
                                            "
                                        >
                                            {selectedContact.phone}
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-gray-100

                                            bg-white

                                            p-4

                                            shadow-sm
                                        "
                                    >

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-gray-400
                                            "
                                        >
                                            Created At
                                        </p>

                                        <p
                                            className="
                                                mt-2
                                                text-sm
                                                font-semibold
                                                text-gray-900
                                            "
                                        >
                                            {new Date(
                                                selectedContact.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                </div>

                                {/* MESSAGE */}

                                <div>

                                    <p
                                        className="
                                            mb-2
                                            text-sm
                                            font-bold
                                            text-gray-900
                                        "
                                    >
                                        Message
                                    </p>

                                    <div
                                        className="
                                            rounded-2xl

                                            border
                                            border-gray-100

                                            bg-gray-50

                                            p-4

                                            sm:p-5
                                        "
                                    >

                                        <p
                                            className="
                                                text-sm
                                                leading-7
                                                text-gray-600
                                            "
                                        >
                                            {selectedContact.message}
                                        </p>

                                    </div>

                                </div>

                                {/* IMAGE */}

                                {selectedContact.image && (

                                    <div>

                                        <p
                                            className="
                                                mb-3
                                                text-sm
                                                font-bold
                                                text-gray-900
                                            "
                                        >
                                            Attached Image
                                        </p>

                                        <div
                                            className="
                                                overflow-hidden

                                                rounded-2xl

                                                border
                                                border-gray-100

                                                bg-gray-50

                                                p-2
                                            "
                                        >

                                            <img
                                                src={`https://my-backend-api-usbu.onrender.com/uploads/${selectedContact.image}`}
                                                alt="User"
                                                className="
                                                    max-h-[300px]
                                                    w-full

                                                    rounded-xl

                                                    object-contain

                                                    sm:max-h-[350px]
                                                "
                                            />

                                        </div>

                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                    {/* MODAL FOOTER */}

                    <div
                        className="
                            flex
                            justify-end

                            border-t
                            border-gray-100

                            bg-gray-50

                            px-4
                            py-4

                            sm:px-6
                        "
                    >

                        <Button
                            variant="light"
                            onClick={handleCloseModal}
                            className="
                                w-full

                                rounded-xl

                                border
                                border-gray-200

                                bg-white

                                px-6
                                py-2.5

                                text-sm
                                font-semibold
                                text-gray-700

                                shadow-sm

                                hover:bg-gray-100

                                sm:w-auto
                            "
                        >
                            Close
                        </Button>

                    </div>

                </div>

            </Modal>

            <style>
                {`
                    .contact-modal-backdrop {
                        backdrop-filter: blur(8px);
                        background: rgba(15, 23, 42, 0.35);
                    }

                    .modal-content {
                        border: none !important;
                        background: transparent !important;
                    }

                    @media (max-width: 576px) {
                        .modal-dialog {
                            margin: 12px !important;
                            max-width: calc(100% - 24px) !important;
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default Contact;