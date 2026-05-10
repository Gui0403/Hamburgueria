import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/Login";

import Dashboard from "../pages/admin/Dashboard";
import CreateBurger from "../pages/admin/CreateBurger";
import EditBurger from "../pages/admin/EditBurger";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
    const isAuthenticated = !!localStorage.getItem("token"); 
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={isAuthenticated ? "/admin" : "/login"} replace />} />

                <Route element={<MainLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* 🔐 ADMIN SAAS */}
                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="admin">
                        <Route index element={<Dashboard />} />
                        <Route path="create" element={<CreateBurger />} />
                        <Route path="edit/:id" element={<EditBurger />} />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}
