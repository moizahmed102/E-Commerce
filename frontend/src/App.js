import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/privateRoute";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Category from "./pages/Category";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Home />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
