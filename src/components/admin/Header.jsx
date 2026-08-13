import React from "react";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    secureLocalStorage.clear();
    localStorage.removeItem("admin-id");
    localStorage.removeItem("admin-token");

    navigate("/admin");
    window.location.reload();
  };

  return (
    <>
      <style>{`
        /* ================================
           ADMIN HEADER
        ================================= */

        .admin-header {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 9999;

          width: 100%;
          min-height: 72px;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          padding: 12px 28px;

          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;

          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);

          box-sizing: border-box;
        }

        /* ================================
           HEADER ACTIONS
        ================================= */

        .admin-header-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          gap: 10px;

          width: auto;
        }

        /* ================================
           COMMON BUTTON STYLE
        ================================= */

        .admin-profile-btn,
        .admin-logout {
          min-width: 105px;
          height: 42px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 16px;

          border-radius: 10px;

          font-family: inherit;
          font-size: 14px;
          font-weight: 600;

          white-space: nowrap;

          cursor: pointer;

          box-sizing: border-box;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        /* ================================
           PROFILE
        ================================= */

        .admin-profile-btn {
          border: 1px solid #e2e8f0;

          background: #ffffff;
          color: #334155;

          text-decoration: none;
        }

        .admin-profile-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #2563eb;

          transform: translateY(-1px);

          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
        }

        /* ================================
           LOGOUT
        ================================= */

        .admin-logout {
          border: 1px solid #fee2e2;

          background: #fff7f7;
          color: #dc2626;
        }

        .admin-logout:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: #ffffff;

          transform: translateY(-1px);

          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.15);
        }

        /* ================================
           ICON
        ================================= */

        .admin-btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 18px;
          height: 18px;

          font-size: 16px;
          line-height: 1;

          flex-shrink: 0;
        }

        .admin-btn-text {
          display: inline-block;
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 768px) {
          .admin-header {
            min-height: 68px;
            padding: 10px 18px;
          }

          .admin-header-actions {
            gap: 8px;
          }

          .admin-profile-btn,
          .admin-logout {
            min-width: 95px;
            height: 40px;

            padding: 0 13px;

            font-size: 13px;
          }

          .admin-btn-icon {
            font-size: 15px;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 576px) {
          .admin-header {
            min-height: 64px;

            padding: 9px 12px;

            justify-content: flex-end;
          }

          .admin-header-actions {
            width: 100%;

            justify-content: flex-end;

            gap: 8px;
          }

          .admin-profile-btn,
          .admin-logout {
            width: 42px;
            min-width: 42px;

            height: 42px;

            padding: 0;

            border-radius: 10px;
          }

          .admin-btn-text {
            display: none;
          }

          .admin-btn-icon {
            width: 20px;
            height: 20px;

            font-size: 17px;
          }
        }

        /* ================================
           SMALL MOBILE
        ================================= */

        @media (max-width: 360px) {
          .admin-header {
            min-height: 60px;

            padding: 8px 10px;
          }

          .admin-profile-btn,
          .admin-logout {
            width: 38px;
            min-width: 38px;

            height: 38px;

            border-radius: 9px;
          }

          .admin-btn-icon {
            font-size: 15px;
          }

          .admin-header-actions {
            gap: 6px;
          }
        }

        /* ================================
           TOUCH DEVICES
        ================================= */

        @media (hover: none) {
          .admin-profile-btn:hover,
          .admin-logout:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      <header className="admin-header">
        <div className="admin-header-actions">

          {/* PROFILE */}
          <Link
            to="/myprofile"
            className="admin-profile-btn"
            aria-label="Profile"
            title="Profile"
          >
            <span className="admin-btn-icon">👤</span>
            <span className="admin-btn-text">Profile</span>
          </Link>

          {/* LOGOUT */}
          <button
            type="button"
            onClick={logout}
            className="admin-logout"
            aria-label="Logout"
            title="Logout"
          >
            <span className="admin-btn-icon">↪</span>
            <span className="admin-btn-text">Logout</span>
          </button>

        </div>
      </header>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
      />
    </>
  );
}