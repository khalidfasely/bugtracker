import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Register from "../components/Register";
import SignRoute from "./SignRoute";

const AppRoute = () => (
    <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
                <SignRoute>
                  <Login />
                </SignRoute>
              }
            />
            <Route path="/register" element={
                <SignRoute>
                  <Register />
                </SignRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
)

export default AppRoute;