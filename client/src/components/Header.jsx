import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { LogOut, User, KeyRound } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left: Logo / Brand Name */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Unmasked
      </h1>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/profile")}
          title="Profile"
          className="hover:text-blue-400 transition"
        >
          <User size={20} />
        </button>

        <button
          onClick={() => navigate("/change-password")}
          title="Change Password"
          className="hover:text-blue-400 transition"
        >
          <KeyRound size={20} />
        </button>

        <button
          onClick={handleLogout}
          title="Logout"
          className="hover:text-red-400 transition"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
