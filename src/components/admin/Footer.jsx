import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        .admin-footer {
          position: relative;
          overflow: hidden;

          border-top: 1px solid #e2e8f0;
          background: #ffffff;

          padding: 16px 20px;

          text-align: center;

          font-size: 12px;
          color: #94a3b8;

          transition: all 0.3s ease;
        }

        .admin-footer::before {
          content: "";

          position: absolute;
          top: 0;
          left: -30%;

          width: 30%;
          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            #3b82f6,
            #8b5cf6,
            transparent
          );

          animation: footerLine 4s linear infinite;
        }

        .admin-footer-text {
          display: inline-block;

          transition:
            color 0.3s ease,
            transform 0.3s ease;
        }

        .admin-footer:hover .admin-footer-text {
          color: #64748b;
          transform: translateY(-1px);
        }

        @keyframes footerLine {
          0% {
            left: -30%;
          }

          100% {
            left: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .admin-footer::before {
            animation: none;
          }

          .admin-footer-text {
            transition: none;
          }
        }
      `}</style>

      <footer className="admin-footer lg:pl-64">
        <span className="admin-footer-text">
          © {new Date().getFullYear()} MyShop Admin
        </span>
      </footer>
    </>
  );
}