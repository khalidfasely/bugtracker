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
import Bug from "../components/Bug";
import NewProject from "../components/NewProject";

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
            {/*make it private*/}
            <Route path="/project/:pid/bug/:bid" element={<Bug />} />
            <Route path="/new-project" element={
                <PrivateRoute>
                  <NewProject />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
)

export default AppRoute;