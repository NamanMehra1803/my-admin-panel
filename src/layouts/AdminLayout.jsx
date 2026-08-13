import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="lg:pl-64 min-h-screen flex flex-col">

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 min-h-[calc(100vh-120px)] p-4 sm:p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}