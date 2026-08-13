import React from "react";
import { NavLink } from "react-router-dom";

const items = [
  ["⌂", "Dashboard", "/dashboard"],
  ["👤", "Users", "/users"],
  ["▦", "Categories", "/category"],
  ["▣", "Products", "/product"],
  ["✉", "Contacts", "/contactUs"],
  ["🛒", "Orders", "/Orders"],
];

export default function Sidebar() {
  return (
    <>
      <style>{`
        .admin-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          width: 255px;
          height: 100vh;

          background: #ffffff;
          border-right: 1px solid #e5e7eb;

          z-index: 9999;

          display: flex;
          flex-direction: column;

          overflow-y: auto;
          overflow-x: hidden;

          box-shadow: 4px 0 20px rgba(15, 23, 42, 0.05);
        }

        /* BRAND */
        .admin-brand {
          height: 72px;
          min-height: 72px;

          display: flex;
          align-items: center;

          gap: 12px;
          padding: 0 18px;

          border-bottom: 1px solid #f1f5f9;
        }

        .admin-brand img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .admin-brand div {
          display: flex;
          flex-direction: column;
        }

        .admin-brand strong {
          color: #111827;
          font-size: 17px;
          font-weight: 800;
        }

        .admin-brand span {
          margin-top: 2px;
          color: #94a3b8;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* NAV */
        .admin-nav {
          padding: 18px 10px;
        }

        .admin-nav-label {
          padding: 0 12px;
          margin-bottom: 10px;

          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .admin-nav a {
          position: relative;

          display: flex;
          align-items: center;

          width: 100%;
          height: 46px;

          gap: 12px;
          padding: 0 13px;
          margin-bottom: 5px;

          box-sizing: border-box;

          border-radius: 11px;

          color: #64748b;
          text-decoration: none;

          font-size: 13px;
          font-weight: 600;

          transition: 0.2s ease;
        }

        .admin-nav a:hover {
          background: #f8fafc;
          color: #2563eb;
        }

        .admin-nav a.active {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 700;
        }

        .admin-nav a.active::before {
          content: "";

          position: absolute;
          left: 0;
          top: 9px;

          width: 3px;
          height: 28px;

          background: #2563eb;
          border-radius: 0 5px 5px 0;
        }

        .admin-nav-icon {
          width: 25px;
          min-width: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 17px;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 992px) {
          .admin-sidebar {
            width: 220px;
          }
        }

        /* =========================
           PHONE
        ========================= */

        @media (max-width: 768px) {

          .admin-sidebar {
            width: 64px !important;
            min-width: 64px;

            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .admin-brand {
            width: 64px;
            height: 64px;
            min-height: 64px;

            padding: 0;

            justify-content: center;
          }

          .admin-brand img {
            width: 38px;
            height: 38px;
          }

          .admin-brand div {
            display: none;
          }

          .admin-nav {
            width: 64px;
            padding: 14px 7px;
          }

          .admin-nav-label {
            display: none;
          }

          .admin-nav a {
            width: 50px;
            height: 48px;

            padding: 0;
            margin: 0 auto 7px;

            justify-content: center;

            border-radius: 11px;
          }

          .admin-nav-icon {
            width: auto;
            min-width: auto;

            font-size: 18px;
          }

          .admin-nav a > span:last-child {
            display: none;
          }

          .admin-nav a.active::before {
            left: -7px;
            height: 28px;
          }
        }

        /* SMALL PHONE */

        @media (max-width: 480px) {

          .admin-sidebar {
            width: 58px !important;
            min-width: 58px;
          }

          .admin-brand {
            width: 58px;
          }

          .admin-nav {
            width: 58px;
            padding: 12px 5px;
          }

          .admin-nav a {
            width: 46px;
            height: 45px;
          }

          .admin-nav-icon {
            font-size: 17px;
          }
        }
      `}</style>

      <aside className="admin-sidebar">

        {/* LOGO */}
        <div className="admin-brand">

          <img
            src="/img/logo.png"
            alt="MyShop Logo"
          />

          <div>
            <strong>MyShop</strong>
            <span>ADMIN CONSOLE</span>
          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="admin-nav">

          <div className="admin-nav-label">
            WORKSPACE
          </div>

          {items.map(([icon, label, path]) => (
            <NavLink
              key={path}
              to={path}
              title={label}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              <span className="admin-nav-icon">
                {icon}
              </span>

              <span>
                {label}
              </span>
            </NavLink>
          ))}

        </nav>

      </aside>
    </>
  );
}