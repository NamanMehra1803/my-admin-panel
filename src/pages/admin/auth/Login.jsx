import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/Ucclogg.png';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // =========================
    // LOGIN
    // =========================

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your email.');
            return;
        }

        if (!password.trim()) {
            toast.error('Please enter your password.');
            return;
        }

        try {
            setLoading(true);

            const body = {
                email: email.trim(),
                password: password
            };

            const ApiUrl =
                'https://my-backend-api-usbu.onrender.com/api/admin/login';

            const response = await axios.post(ApiUrl, body);

            const msg = response.data.message;

            if (response.data.success) {
                toast.success(
                    msg || 'Login successful!'
                );

                localStorage.setItem(
                    'admin-token',
                    response.data.token
                );

                localStorage.setItem(
                    'admin-id',
                    response.data.data._id
                );

                setTimeout(() => {
                    navigate('/dashboard');
                }, 700);
            } else {
                toast.error(
                    msg || 'Invalid email or password.'
                );
            }
        } catch (err) {
            console.error(err);

            toast.error(
                err.response?.data?.message ||
                'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>

            <div
                className="
                    min-h-screen
                    overflow-x-hidden
                    bg-[#f8fafc]
                "
            >

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />

                {/* =========================
                    BACKGROUND
                ========================= */}

                <div
                    className="
                        pointer-events-none
                        fixed
                        inset-0
                        overflow-hidden
                    "
                >

                    <div
                        className="
                            absolute
                            -left-40
                            -top-40
                            h-96
                            w-96
                            rounded-full
                            bg-blue-100/60
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-40
                            -right-40
                            h-96
                            w-96
                            rounded-full
                            bg-indigo-100/60
                            blur-3xl
                        "
                    />

                </div>

                {/* =========================
                    MAIN
                ========================= */}

                <div
                    className="
                        relative
                        flex
                        min-h-screen
                        items-center
                        justify-center

                        px-3
                        py-6

                        sm:px-6
                        sm:py-10
                    "
                >

                    <div
                        className="
                            w-full
                            max-w-[1050px]
                        "
                    >

                        <div
                            className="
                                grid
                                overflow-hidden

                                rounded-2xl

                                border
                                border-gray-100

                                bg-white

                                shadow-[0_25px_80px_-25px_rgba(0,0,0,0.18)]

                                sm:rounded-[28px]

                                lg:grid-cols-2
                            "
                        >

                            {/* =========================
                                LEFT SIDE
                            ========================= */}

                            <div
                                className="
                                    hidden

                                    bg-gray-900

                                    p-10

                                    lg:flex
                                    lg:flex-col
                                    lg:justify-between
                                "
                            >

                                <div>

                                    {/* LOGO */}

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
                                                h-12
                                                w-12

                                                items-center
                                                justify-center

                                                rounded-2xl

                                                bg-white

                                                shadow-lg
                                            "
                                        >

                                            <img
                                                src={Logo}
                                                alt="Logo"
                                                className="
                                                    max-h-8
                                                    max-w-8
                                                    object-contain
                                                "
                                            />

                                        </div>

                                        <div>

                                            <p
                                                className="
                                                    text-lg
                                                    font-bold
                                                    text-white
                                                "
                                            >
                                                Admin Panel
                                            </p>

                                            <p
                                                className="
                                                    text-xs
                                                    text-gray-400
                                                "
                                            >
                                                Management System
                                            </p>

                                        </div>

                                    </div>

                                    {/* HEADING */}

                                    <div className="mt-24">

                                        <p
                                            className="
                                                mb-3
                                                text-sm
                                                font-semibold
                                                uppercase
                                                tracking-[3px]
                                                text-blue-400
                                            "
                                        >
                                            Welcome Back
                                        </p>

                                        <h1
                                            className="
                                                max-w-md
                                                text-4xl
                                                font-bold
                                                leading-tight
                                                text-white
                                            "
                                        >
                                            Manage your business

                                            <span
                                                className="
                                                    block
                                                    text-blue-400
                                                "
                                            >
                                                from one place.
                                            </span>

                                        </h1>

                                        <p
                                            className="
                                                mt-5
                                                max-w-md
                                                text-sm
                                                leading-7
                                                text-gray-400
                                            "
                                        >
                                            Access your dashboard to
                                            manage users, products,
                                            categories and orders
                                            with ease.
                                        </p>

                                    </div>

                                </div>

                                {/* FEATURES */}

                                <div
                                    className="
                                        grid
                                        grid-cols-3
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            p-4
                                        "
                                    >

                                        <div className="mb-2 text-xl">
                                            👤
                                        </div>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Users
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            p-4
                                        "
                                    >

                                        <div className="mb-2 text-xl">
                                            📦
                                        </div>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Products
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            border
                                            border-white/10
                                            bg-white/5
                                            p-4
                                        "
                                    >

                                        <div className="mb-2 text-xl">
                                            🛒
                                        </div>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            Orders
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* =========================
                                RIGHT SIDE
                            ========================= */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-center

                                    px-4
                                    py-8

                                    sm:px-8
                                    sm:py-10

                                    lg:px-14
                                "
                            >

                                <div
                                    className="
                                        w-full
                                        max-w-[420px]
                                    "
                                >

                                    {/* MOBILE LOGO */}

                                    <div
                                        className="
                                            mb-7
                                            flex
                                            flex-col
                                            items-center

                                            sm:mb-8

                                            lg:hidden
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

                                                border
                                                border-gray-100

                                                bg-white

                                                shadow-lg
                                            "
                                        >

                                            <img
                                                src={Logo}
                                                alt="Logo"
                                                className="
                                                    max-h-10
                                                    max-w-10
                                                    object-contain
                                                "
                                            />

                                        </div>

                                        <h2
                                            className="
                                                mt-4
                                                text-xl
                                                font-bold
                                                text-gray-900
                                            "
                                        >
                                            Admin Panel
                                        </h2>

                                    </div>

                                    {/* LOGIN HEADER */}

                                    <div className="mb-7 sm:mb-8">

                                        <p
                                            className="
                                                mb-2
                                                text-xs
                                                font-semibold
                                                text-blue-600

                                                sm:text-sm
                                            "
                                        >
                                            ADMIN LOGIN
                                        </p>

                                        <h2
                                            className="
                                                text-2xl
                                                font-bold
                                                tracking-tight
                                                text-gray-900

                                                sm:text-3xl
                                            "
                                        >
                                            Welcome back
                                        </h2>

                                        <p
                                            className="
                                                mt-2
                                                text-xs
                                                text-gray-500

                                                sm:text-sm
                                            "
                                        >
                                            Sign in to access your
                                            admin dashboard.
                                        </p>

                                    </div>

                                    {/* =========================
                                        FORM
                                    ========================= */}

                                    <form onSubmit={handleLogin}>

                                        {/* EMAIL */}

                                        <div className="mb-5">

                                            <label
                                                htmlFor="emailaddress"
                                                className="
                                                    mb-2
                                                    block
                                                    text-sm
                                                    font-semibold
                                                    text-gray-800
                                                "
                                            >
                                                Email Address
                                            </label>

                                            <div className="relative">

                                                <svg
                                                    className="
                                                        absolute
                                                        left-4
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
                                                    className="
                                                        w-full

                                                        rounded-xl

                                                        border
                                                        border-gray-200

                                                        bg-gray-50

                                                        py-3.5
                                                        pl-12
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
                                                    type="email"
                                                    name="email"
                                                    id="emailaddress"
                                                    required
                                                    autoComplete="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                            </div>

                                        </div>

                                        {/* PASSWORD */}

                                        <div className="mb-5">

                                            <div
                                                className="
                                                    mb-2
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-2
                                                "
                                            >

                                                <label
                                                    htmlFor="password"
                                                    className="
                                                        block
                                                        text-sm
                                                        font-semibold
                                                        text-gray-800
                                                    "
                                                >
                                                    Password
                                                </label>

                                                <button
                                                    type="button"
                                                    className="
                                                        text-xs
                                                        font-semibold
                                                        text-blue-600

                                                        transition

                                                        hover:text-blue-700
                                                    "
                                                    onClick={() =>
                                                        toast(
                                                            'Forgot password feature is not available yet.'
                                                        )
                                                    }
                                                >
                                                    Forgot Password?
                                                </button>

                                            </div>

                                            <div className="relative">

                                                <svg
                                                    className="
                                                        absolute
                                                        left-4
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

                                                    <rect
                                                        x="4"
                                                        y="10"
                                                        width="16"
                                                        height="11"
                                                        rx="2"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        d="M8 10V7a4 4 0 018 0v3"
                                                    />

                                                </svg>

                                                <input
                                                    className="
                                                        w-full

                                                        rounded-xl

                                                        border
                                                        border-gray-200

                                                        bg-gray-50

                                                        py-3.5
                                                        pl-12
                                                        pr-12

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
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    name="password"
                                                    id="password"
                                                    required
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                {/* SHOW PASSWORD */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    className="
                                                        absolute
                                                        right-2
                                                        top-1/2

                                                        flex
                                                        h-9
                                                        w-9

                                                        -translate-y-1/2

                                                        items-center
                                                        justify-center

                                                        rounded-lg

                                                        text-gray-400

                                                        transition

                                                        hover:bg-gray-100
                                                        hover:text-gray-600
                                                    "
                                                >

                                                    {showPassword ? (

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
                                                                d="M3 3l18 18"
                                                            />

                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M10.6 10.6a2 2 0 002.8 2.8"
                                                            />

                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9.9 4.2A10.7 10.7 0 0112 4c5.2 0 8.5 4 9.5 6-.4.8-1.2 2.1-2.5 3.3"
                                                            />

                                                        </svg>

                                                    ) : (

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
                                                                d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                                                            />

                                                            <circle
                                                                cx="12"
                                                                cy="12"
                                                                r="2.5"
                                                            />

                                                        </svg>

                                                    )}

                                                </button>

                                            </div>

                                        </div>

                                        {/* REMEMBER */}

                                        <div className="mb-6 flex items-center">

                                            <input
                                                className="
                                                    h-4
                                                    w-4

                                                    rounded

                                                    border-gray-300

                                                    text-blue-600

                                                    focus:ring-blue-500
                                                "
                                                type="checkbox"
                                                id="checkbox-signin"
                                                defaultChecked
                                            />

                                            <label
                                                className="
                                                    ml-2
                                                    text-sm
                                                    text-gray-600
                                                "
                                                htmlFor="checkbox-signin"
                                            >
                                                Remember me
                                            </label>

                                        </div>

                                        {/* LOGIN BUTTON */}

                                        <button
                                            className="
                                                group

                                                flex
                                                w-full

                                                items-center
                                                justify-center
                                                gap-2

                                                rounded-xl

                                                bg-gray-900

                                                px-5
                                                py-3.5

                                                text-sm
                                                font-semibold
                                                text-white

                                                shadow-lg

                                                transition
                                                duration-300

                                                hover:-translate-y-0.5
                                                hover:bg-blue-600
                                                hover:shadow-blue-200

                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                            "
                                            type="submit"
                                            disabled={loading}
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

                                                    Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    Log In

                                                    <svg
                                                        className="
                                                            h-5
                                                            w-5

                                                            transition-transform

                                                            group-hover:translate-x-1
                                                        "
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >

                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M5 12h14"
                                                        />

                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m13 6 6 6-6 6"
                                                        />

                                                    </svg>
                                                </>
                                            )}

                                        </button>

                                    </form>

                                    {/* FOOTER */}

                                    <div
                                        className="
                                            mt-7
                                            text-center

                                            sm:mt-8
                                        "
                                    >

                                        <p
                                            className="
                                                text-xs
                                                text-gray-400
                                            "
                                        >
                                            Secure Admin Dashboard
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-gray-300
                                            "
                                        >
                                            ©{' '}
                                            {new Date().getFullYear()}{' '}
                                            Admin Panel
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Fragment>
    );
}

export default Login;