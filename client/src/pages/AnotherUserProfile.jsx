import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUserEdit,
  FaEnvelope,
  FaPenFancy,
  FaPhoneAlt,
  FaLock,
  FaShieldAlt,
  FaRegNewspaper,
  FaCalendarTimes
} from "react-icons/fa";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const AnotherUserProfile = () => {
  const { userData, rehydrated, token } = useSelector((state) => state.auth);
  const {id} = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [postCount, setPostCount] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get(`/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthor(res.data);

        const countRes = await api.get(`/api/posts/count/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostCount(countRes.data.count);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    if (rehydrated && id) {
      fetchProfileData();
    }
  }, [rehydrated, id, token]);

  if (!author) return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center py-6">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Info Card */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3 text-blue-400">
                <FaUserEdit />
                {author.name}
              </h1>
              <p className="text-gray-400 flex items-center gap-2 mt-2 text-sm">
                <FaEnvelope />
                {author.email}
              </p>
              {postCount !== null && (
                <p className="text-gray-400 flex items-center gap-2 mt-2 text-sm">
                  <FaRegNewspaper  />
                  Total Posts: <span className="text-gray-400 font-semibold">{postCount}</span>
                </p>
              )}
              <p className="text-gray-400 flex items-center gap-2 mt-2 text-sm">
                <FaCalendarTimes />
                Joined: <span className="text-gray-400 font-semibold">{new Date(author.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </p>
            </div>

            <button
              onClick={() => navigate(`/user/posts/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <FaPenFancy />
              All Posts
            </button>
          </div>
        </div>

        {/* Branding & Company Info */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md text-gray-300 space-y-6">
          <h2 className="text-xl font-semibold text-white">About Unmasked</h2>
          <p className="text-gray-400">
            Unmasked is a modern social platform designed for open expression with privacy and choice. Whether you want to share your thoughts publicly or anonymously, Unmasked gives you the freedom to do both. <br/>
            Our mission is to empower users by providing a secure and inclusive space to communicate, share ideas, and support each other. We believe in respectful discussions, innovation, and putting users first. <br/>
            Founded in 2025, Unmasked continues to grow as a platform committed to ethical technology, free speech, and mental wellness.
          </p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <h3 className="font-semibold text-white">Contact & Support</h3>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-400" />
                +91-9999999999
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                ankur07.js@gmail.com
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-white">Legal</h3>
              <p onClick={() => navigate("/privacy")} className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaShieldAlt />
                Privacy Policy
              </p>
              <p onClick={() => navigate("/terms")} className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
                <FaLock />
                Terms of Service
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex gap-4 text-2xl text-gray-400">
              <a
                href="https://www.linkedin.com/in/ankur-bhowmik-83921b18b/"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillLinkedin className="hover:text-blue-500" />
              </a>
              <a
                href="https://github.com/imankurbhowmik"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillGithub className="hover:text-pink-500" />
              </a>
              <a
                href="https://twitter.com/iamankurbhowmik"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillTwitterCircle className="hover:text-sky-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AnotherUserProfile;




