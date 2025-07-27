import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";
import Header from "../components/Header";
import { current } from "@reduxjs/toolkit";

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return setError("All fields are required.");
    }

    if (currentPassword === newPassword) {
      return setError("New password cannot be same as current password.");
    }

    if (newPassword !== confirmNewPassword) {
      return setError("New passwords do not match.");
    }

    try {
      setLoading(true);
      await api.put(
        "/api/auth/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err?.response?.data?.msg || "Password change failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen w-full bg-gray-900 text-white px-4">
      <main className="max-w-md mx-auto p-6 mt-8 bg-gray-800 rounded-2xl shadow-md space-y-6">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </main>
    </div>
    </>
  );
};

export default ChangePassword;
