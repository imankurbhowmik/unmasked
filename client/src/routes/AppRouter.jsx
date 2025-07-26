import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MainFeed from "../pages/MainFeed";
import SinglePost from "../pages/SinglePost";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import MyPosts from "../pages/MyPosts";
import ProtectedRoute from "../routes/ProtectedRoute";
import {PrivacyPolicy} from "../pages/Privacy";
import { AboutUs } from "../pages/AboutUs";
import { TermsOfService } from "../pages/TermsOfService";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/terms" element={<TermsOfService />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<MainFeed />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/my-posts" element={<MyPosts />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
