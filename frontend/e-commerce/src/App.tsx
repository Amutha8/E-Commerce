import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import OrdersPage from "./Components/OrderPage";
import Products from "./Components/Products";
import EditProfile from "./Components/EditProfile";
import ProfilePage from "./Components/ProfilePage";
import "./index.css";
import CategoryProducts from "./Components/categoryProducts";
import CartPage from "./Components/Cart";
import Category from "./Components/category";
import { Login } from "./Components/Login";
import Registration from "./Components/Register";
import { AuthenticationProvider } from "./Components/Authcontext";
import ScrollToTop from "./Components/ScrolltoTop";
const App: React.FC = () => {
  return (
    <>
     <ScrollToTop /> 
    <AuthenticationProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Category />} />
      </Routes>
    </AuthenticationProvider>
    </>
  );
};

export default App;
