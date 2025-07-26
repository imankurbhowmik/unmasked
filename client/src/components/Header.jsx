import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { LogOut, User, KeyRound } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left: Logo + Brand + Tagline */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/unmasked.svg"
          alt="Unmasked Logo"
          className="h-10 w-10 object-contain"
        />
        <div>
          <h1 className="text-xl font-bold leading-tight pb-2">Unmasked</h1>
          <p className="text-xs text-gray-400 -mt-1">Speak Freely. Be Unmasked.</p>
        </div>
      </div>

      {/* Right: Profile, Password, Logout Icons */}
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

