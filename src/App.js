import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/admin/auth/Login";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import User from "./pages/admin/users/User";
import UserAdd from "./pages/admin/users/Add";
import UserEdit from "./pages/admin/users/Edit";
import Category from "./pages/admin/categories/Category";
import CategoryAdd from "./pages/admin/categories/CategoryAdd";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import Profile from "./pages/admin/profile/Profile";
import ProfileEdit from "./pages/admin/profile/ProfileEdit";
import ChangePassword from "./pages/admin/profile/ChangePassword";
import Product from "./pages/admin/products/Product";
import ProductAdd from "./pages/admin/products/ProductAdd";
import ProductEdit from "./pages/admin/products/ProductEdit";
import ContactUs from "./pages/admin/contact/ContactAdmin";
import Order from "./pages/admin/orders/Order";

const ProtectedRoute=({children})=><PrivateRoute>{children}</PrivateRoute>;
export default function App(){return <Routes>
<Route path="/admin" element={<Login/>}/>
<Route path="/" element={<Navigate to="/dashboard" replace/>}/>
<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
<Route path="/users" element={<ProtectedRoute><User/></ProtectedRoute>}/>
<Route path="/users-add" element={<ProtectedRoute><UserAdd/></ProtectedRoute>}/>
<Route path="/users-edit" element={<ProtectedRoute><UserEdit/></ProtectedRoute>}/>
<Route path="/category" element={<ProtectedRoute><Category/></ProtectedRoute>}/>
<Route path="/category-add" element={<ProtectedRoute><CategoryAdd/></ProtectedRoute>}/>
<Route path="/category-edit" element={<ProtectedRoute><CategoryEdit/></ProtectedRoute>}/>
<Route path="/myprofile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
<Route path="/myprofile-edit" element={<ProtectedRoute><ProfileEdit/></ProtectedRoute>}/>
<Route path="/changepassword" element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
<Route path="/contactUs" element={<ContactUs/>}/>
<Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>}/>
<Route path="/product-add" element={<ProtectedRoute><ProductAdd/></ProtectedRoute>}/>
<Route path="/product-edit" element={<ProtectedRoute><ProductEdit/></ProtectedRoute>}/>
<Route path="/Orders" element={<ProtectedRoute><Order/></ProtectedRoute>}/>
<Route path="*" element={<Navigate to="/dashboard" replace/>}/>
</Routes>}
