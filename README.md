# 👻 Unmasked – Speak Freely, Be Unmasked

**Unmasked** is a full-stack anonymous social media platform that allows users to share their thoughts without revealing their identity. It's fast, private, and built for open expression in a judgment-free digital space.

Live at: [🌐 https://unmasked.online](https://unmasked.online)

---

## 🚀 Features

- ✅ **JWT-Based Authentication**
- 🗣️ **Post Anonymously**
- 🧾 **View Public Anonymous Feed**
- 🚪 **Login, Logout, and Session Handling**
- 📱 **Fully Responsive on All Devices**
- ⚙️ **Redux-Based State Management**
- 🔐 **Secure Token Storage & Access Control**

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite**
- **Redux Toolkit** for global state
- **Axios** for API communication
- **React Router DOM** for routing
- **Lucide-react Icons** for a modern UI
- **Tailwind CSS** (or custom CSS assumed)
- **Vercel** for deployment

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose ODM**
- **JWT** for secure authentication
- **Bcrypt.js** for password hashing
- **Railway** for deployment

---

## Getting Started Locally

### Clone the repo

- git clone **[github](https://github.com/imankurbhowmik/unmasked.git)**

### Setup Backend

- cd server
- npm install
- npm run dev

### Setup Frontend

- cd client
- npm install
- npm run dev

---

## Security

- JWT tokens stored in localStorage
- Logout clears token + resets Redux state
- No sensitive keys exposed on frontend
- Backend protected with environment variables

---

## Deployment

- Hosted with custom domain: https://unmasked.online

---

## Future Scopes

- Add Google Sign-In / OAuth
- Send Personal Messages
- Follow profiles
- File uploads
- Join Community and Groups 
- Threading in comments

---

## Author

**Ankur Bhowmik**
**[LinkedIn](https://www.linkedin.com/in/ankur-bhowmik-83921b18b)**



