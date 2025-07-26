import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rehydrate } from "./store/authSlice";
import { useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();
  const { rehydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.token && authData?.userData) {
      dispatch(rehydrate(authData));
    } else {
      dispatch(rehydrate({ token: null, userData: null }));
    }
  }, []);

  if (!rehydrated) return null; 

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
