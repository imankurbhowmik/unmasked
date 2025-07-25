import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaEnvelope, FaPenFancy } from "react-icons/fa";

const Profile = () => {
  const { userData, rehydrated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!rehydrated || !userData) {
    return <div className="text-white p-4">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Profile Info Card */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FaUserEdit className="text-blue-400" />
                {userData.name}
              </h1>
              <p className="text-gray-400 flex items-center gap-2 mt-1">
                <FaEnvelope />
                {userData.email}
              </p>
            </div>

            <button
              onClick={() => navigate("/my-posts")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaPenFancy />
              My Posts
            </button>
          </div>

          {/* Branding + Social */}
          <div className="text-sm text-gray-400 pt-4 border-t border-gray-700 space-y-1">
            <p>🔒 Privacy-focused platform</p>
            <p>🏢 Brand: Aarthik</p>
            <p>
              🌐 Social:{" "}
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                linkedin.com/in/yourprofile
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

