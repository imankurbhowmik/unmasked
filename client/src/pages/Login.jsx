import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, ...userData } = res.data;

      dispatch(login({ token, userData }));
      localStorage.setItem("auth", JSON.stringify({ token, userData }));
      navigate("/feed");
    } catch (error) {
      setErr(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 text-white px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {err && <p className="text-red-500 text-sm text-center">{err}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white font-semibold transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
