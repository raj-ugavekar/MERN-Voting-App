import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import authService from "./services/auth";
import { login, logout } from "./store/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
          if(userData.role === 'admin'){
            navigate("/admin");
          }else{
            navigate("/");
          }
        } else {
          dispatch(logout());
            navigate("/login");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
  if (!loading && !authStatus) {
    navigate("/login");
  }
  }, [authStatus, loading, navigate]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <Header />
      <hr />
      <Outlet />
      {authStatus && (
        <>
          <hr />
          <Footer />
        </>
      )}
    </div> 
  );
}

export default App;
