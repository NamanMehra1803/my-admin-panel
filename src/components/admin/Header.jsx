import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("admin-id");

    if (!id) return;

    axios
      .post(
        "https://my-backend-api-usbu.onrender.com/api/admin/my-profile",
        { _id: id }
      )
      .then((response) => {
        if (response.data.success) {
          setUserData(response.data.data);
        }
      })
      .catch(() => {});
  }, []);

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
        .admin-header {
          position: sticky;
          top: 0;
          z-index: 999;

          width: 100%;
          height: 72px;

          display: flex;
          align-items: center;
          justify-content: flex-end;

          padding: 0 28px;

          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;

          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);

          box-sizing: border-box;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-profile-btn,
        .admin-logout {
          height: 40px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 17px;

          border-radius: 10px;

          font-size: 13px;
          font-weight: 600;

          cursor: pointer;

          transition: all 0.2s ease;
        }

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
        }

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

        .admin-btn-icon {
          font-size: 15px;
          line-height: 1;
        }

        @media (max-width: 576px) {
          .admin-header {
            height: 65px;
            padding: 0 12px;
          }

          .admin-profile-btn,
          .admin-logout {
            width: 40px;
            height: 40px;
            padding: 0;
          }

          .admin-btn-text {
            display: none;
          }

          .admin-btn-icon {
            font-size: 16px;
          }
        }
      `}</style>

      <header className="admin-header">

        <div className="admin-header-actions">

          {/* PROFILE */}

          <Link
            to="/myprofile"
            className="admin-profile-btn"
          >
            <span className="admin-btn-icon">👤</span>
            <span className="admin-btn-text">Profile</span>
          </Link>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={logout}
            className="admin-logout"
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