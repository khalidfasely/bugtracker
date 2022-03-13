import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignRoute from "./SignRoute";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header";
import Projects from "../components/Projects";
import Home from "../components/Home";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Register from "../components/Register";
import Project from "../components/Project";

const AppRoute = () => (
    <Router>
        <div>
          <Header />
          <Projects />
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
            <Route path="/project/:pid" element={
                <PrivateRoute>
                  <Project />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
)

export default AppRoute;