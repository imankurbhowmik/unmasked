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
import { TermsOfService } from "../pages/TermsOfService";
import AnotherUserPosts from "../pages/AnotherUserPosts";
import AnotherUserProfile from "../pages/AnotherUserProfile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<MainFeed />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/user/:id" element={<AnotherUserProfile />} />
        <Route path="/user/posts/:id" element={<AnotherUserPosts />} />

      </Route>
    </Routes>
  );
};

export default AppRouter;
