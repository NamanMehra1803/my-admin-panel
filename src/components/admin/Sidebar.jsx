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
          background: #fff;
          border-right: 1px solid #e5e7eb;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .admin-brand {
          height: 72px;
          min-height: 72px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 18px;
          border-bottom: 1px solid #f1f5f9;
          box-sizing: border-box;
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
          color: #94a3b8;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .admin-nav {
          padding: 18px 10px;
        }

        .admin-nav-label {
          padding: 0 12px;
          margin-bottom: 10px;
          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
        }

        .admin-nav a {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          height: 46px;
          padding: 0 13px;
          margin-bottom: 5px;
          border-radius: 11px;
          color: #64748b;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          box-sizing: border-box;
        }

        .admin-nav a:hover {
          background: #f8fafc;
          color: #2563eb;
        }

        .admin-nav a.active {
          background: #eff6ff;
          color: #2563eb;
        }

        .admin-nav-icon {
          width: 25px;
          min-width: 25px;
          display: flex;
          justify-content: center;
          font-size: 17px;
        }

        /* TABLET */

        @media (max-width: 992px) {
          .admin-sidebar {
            width: 220px;
          }
        }

        /* MOBILE */

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 64px !important;
            min-width: 64px;
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            transform: none !important;
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

          .admin-brand div,
          .admin-nav-label,
          .admin-nav a > span:last-child {
            display: none !important;
          }

          .admin-nav {
            padding: 14px 7px;
          }

          .admin-nav a {
            width: 50px;
            height: 48px;
            padding: 0;
            margin: 0 auto 7px;
            justify-content: center;
          }

          .admin-nav-icon {
            width: auto;
            min-width: auto;
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .admin-sidebar {
            width: 58px !important;
            min-width: 58px;
          }

          .admin-brand {
            width: 58px;
          }

          .admin-nav {
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

        <div className="admin-brand">
          <img src="/img/logo.png" alt="MyShop Logo" />

          <div>
            <strong>MyShop</strong>
            <span>ADMIN CONSOLE</span>
          </div>
        </div>

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

              <span>{label}</span>
            </NavLink>
          ))}

        </nav>

      </aside>
    </>
  );
}