import React from 'react';
import Header from '../../../components/admin/Header';
import Footer from '../../../components/admin/Footer';
import Sidebar from '../../../components/admin/Sidebar';

export default function Changepass() {
  return (
    <>
      <div className="layout-wrapper">
        <Sidebar />
        <div className="page-content">
          <Header />
          <div className="d-flex justify-content-center my-5">
            <div className=" shadow-sm" style={{ maxWidth: '350px', width: '100%' }}>
              <div className=" p-4">
                
                <form>
                  <div class="mb-3  ">
                    <label class="form-label">Current password </label>
                    <input
                      type="password"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 ">
                    <label class="form-label">New password </label>
                    <input
                      type="password"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-4 ">
                    <label class="form-label">Confirm password </label>
                    <input
                      type="password"
                      class="form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn text-white px-4"
                      style={{ backgroundColor: '#4353ff', borderColor: '#4353ff' }}>
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>

    </>
  )
}
