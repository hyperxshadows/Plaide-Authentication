import React from "react";
import { Routes, Route } from "react-router-dom";
import { WelcomePage } from "./screens/WelcomePage";
import { LoginPage } from "./screens/LoginPage";
import { SignUpPage } from "./screens/SignUpPage";
import { HomePage } from "./screens/HomePage";

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};
