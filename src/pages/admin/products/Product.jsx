import React, { useEffect, useState } from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Product() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [productData, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [cat_id, setCat_id] = useState('');
    const [category, setCategory] = useState([]);

    const handleButtonClick = (productData, product_id) => {
        navigate('/product-edit', {
            state: productData,
            _id: product_id,
        });
    };

    const productview = async () => {
        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/view-product'
            );

            if (response.data.success) {
                setProducts(response.data.data || []);
                setCurrentPage(1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const categoryView = async () => {
        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/view-categoryes'
            );

            if (response.data.success) {
                setCategory(response.data.data || []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        productview();
        categoryView();
    }, []);

    const handleDelete = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (!result.isConfirmed) return;

        try {
            await axios.post(
                'https://my-backend-api-usbu.onrender.com/delete-product',
                {
                    _id: productId,
                }
            );

            Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
            );

            productview();
        } catch (err) {
            console.error(err);
        }
    };

    const searchProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://my-backend-api-usbu.onrender.com/product-Search',
                {
                    name,
                    cat_id,
                }
            );

            if (response.data.success) {
                setProducts(response.data.data || []);
                setCurrentPage(1);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReset = (e) => {
        e.preventDefault();

        setName('');
        setCat_id('');
        setCurrentPage(1);

        productview();
    };

    const handleStatusUpdate = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to update status?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
        });

        if (!result.isConfirmed) return;

        try {
            await axios.post(
                'https://my-backend-api-usbu.onrender.com/product-status',
                {
                    _id: productId,
                }
            );

            Swal.fire(
                'Updated!',
                'Status has been updated.',
                'success'
            );

            productview();
        } catch (err) {
            console.error(err);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            productData.map((product, index) => ({
                '#': index + 1,
                Name: product.name,
                Price: product.price,
                Category: product.cat_id?.name || 'N/A',
                Description: product.description,
                Status: product.status ? 'Active' : 'Inactive',
                Created: product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString('en-US')
                    : '',
            }))
        );

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            'Products'
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        const data = new Blob([excelBuffer], {
            type: 'application/octet-stream',
        });

        saveAs(data, 'products_list.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();

        const tableColumn = [
            '#',
            'Name',
            'Price',
            'Category',
            'Description',
            'Status',
            'Created',
        ];

        const tableRows = [];

        productData.forEach((product, index) => {
            tableRows.push([
                index + 1,
                product.name,
                product.price,
                product.cat_id?.name || 'N/A',
                product.description,
                product.status ? 'Active' : 'Inactive',
                product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString('en-US')
                    : '',
            ]);
        });

        doc.text('Product List', 14, 15);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: {
                fontSize: 8,
            },
        });

        doc.save('products_list.pdf');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = productData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(
        productData.length / itemsPerPage
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

    const getImageUrl = (image) => {
        if (!image) {
            return 'https://via.placeholder.com/100?text=Product';
        }

        return `https://my-backend-api-usbu.onrender.com/uploads/${image}`;
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
            <Sidebar />

            <div className="ml-[58px] flex min-h-screen min-w-0 flex-col sm:ml-[64px] lg:ml-[255px]">
                <Header />

                <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <div className="mb-6 sm:mb-7">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                                    Inventory Management
                                </p>

                                <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    Products
                                </h1>

                                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    Manage products, categories and availability.
                                </p>
                            </div>

                            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                                <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <i className="fas fa-box-open" />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Total Products
                                        </p>

                                        <p className="text-lg font-bold text-gray-900">
                                            {productData.length}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    to="/product-add"
                                    className="w-full sm:w-auto"
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600"
                                    >
                                        <span className="text-lg">+</span>
                                        Add Product
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.10)] sm:rounded-3xl">
                        <div className="border-b border-gray-100 p-4 sm:p-6">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                                <form
                                    onSubmit={searchProduct}
                                    className="flex w-full flex-col gap-3 xl:max-w-2xl"
                                >
                                    <div className="flex w-full flex-col gap-3 sm:flex-row">
                                        <div className="relative flex-1">
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
                                                    d="M20 20l-3.5-3.5"
                                                />
                                            </svg>

                                            <input
                                                type="text"
                                                placeholder="Search product..."
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                                            />
                                        </div>

                                        <select
                                            value={cat_id}
                                            onChange={(e) =>
                                                setCat_id(e.target.value)
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-52"
                                        >
                                            <option value="">
                                                All Categories
                                            </option>

                                            {category.map((item) => (
                                                <option
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex w-full gap-2 sm:w-auto">
                                        <button
                                            type="submit"
                                            className="flex-1 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 sm:flex-none"
                                        >
                                            Search
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="flex-1 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 sm:flex-none"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>

                                <div className="grid grid-cols-2 gap-2 sm:flex">
                                    <button
                                        type="button"
                                        onClick={exportToExcel}
                                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white sm:px-5 sm:text-sm"
                                    >
                                        📊 Excel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={exportToPDF}
                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white sm:px-5 sm:text-sm"
                                    >
                                        🧾 PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[1250px]">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/80">
                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            #
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Image
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Price
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Description
                                        </th>

                                        <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Created
                                        </th>

                                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-500">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {productData.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="9"
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="mx-auto flex max-w-sm flex-col items-center">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-2xl">
                                                        📦
                                                    </div>

                                                    <h3 className="mt-4 text-base font-bold text-gray-900">
                                                        No products found
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Try changing your search or category.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map(
                                            (product, index) => (
                                                <tr
                                                    key={product._id}
                                                    className="group transition hover:bg-blue-50/30"
                                                >
                                                    <td className="px-5 py-5 text-sm font-semibold text-gray-500">
                                                        {indexOfFirstItem +
                                                            index +
                                                            1}
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <div className="h-14 w-14 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm">
                                                            <img
                                                                src={getImageUrl(
                                                                    product.image
                                                                )}
                                                                alt={
                                                                    product.name ||
                                                                    'Product'
                                                                }
                                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                                                                onError={(e) => {
                                                                    e.currentTarget.src =
                                                                        'https://via.placeholder.com/100?text=Product';
                                                                }}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="max-w-[180px] truncate font-semibold text-gray-900">
                                                            {product.name}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <span className="font-semibold text-gray-900">
                                                            ₹{product.price}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                                                            {product.cat_id?.name ||
                                                                'N/A'}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="max-w-[220px] truncate text-sm text-gray-500">
                                                            {product.description ||
                                                                'No description'}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5">
                                                        <p className="text-sm text-gray-500">
                                                            {product.createdAt
                                                                ? new Date(
                                                                      product.createdAt
                                                                  ).toLocaleDateString(
                                                                      'en-US',
                                                                      {
                                                                          year: 'numeric',
                                                                          month: 'short',
                                                                          day: 'numeric',
                                                                      }
                                                                  )
                                                                : '-'}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-5 text-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleStatusUpdate(
                                                                    product._id
                                                                )
                                                            }
                                                            className={`relative h-7 w-12 rounded-full transition-colors ${
                                                                product.status
                                                                    ? 'bg-emerald-500'
                                                                    : 'bg-gray-300'
                                                            }`}
                                                        >
                                                            <span
                                                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all ${
                                                                    product.status
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
                                                                        product,
                                                                        product._id
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
                                                                        product._id
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
                            <p className="text-center text-xs text-gray-500 sm:text-left sm:text-sm">
                                Showing{' '}
                                <span className="font-semibold text-gray-900">
                                    {productData.length === 0
                                        ? 0
                                        : indexOfFirstItem + 1}
                                </span>{' '}
                                to{' '}
                                <span className="font-semibold text-gray-900">
                                    {Math.min(
                                        indexOfLastItem,
                                        productData.length
                                    )}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold text-gray-900">
                                    {productData.length}
                                </span>{' '}
                                products
                            </p>

                            {totalPages > 0 && (
                                <div className="flex flex-wrap items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
                                    >
                                        Previous
                                    </button>

                                    <div className="hidden items-center gap-1 sm:flex">
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
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
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