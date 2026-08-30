import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Shell from "./components/Shell";
import { ToastProvider } from "./components/Toast";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import LoginPage from "./pages/LoginPage";
import SectionPage from "./pages/SectionPage";

const App = () => (
  <ToastProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <Shell />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="section/:key" element={<SectionPage />} />
            <Route path="leads" element={<LeadsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ToastProvider>
);

export default App;
