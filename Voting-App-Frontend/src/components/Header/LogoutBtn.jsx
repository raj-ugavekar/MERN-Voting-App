import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn({className}) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const logoutHandler = () => {
    alert("Logout Successfully");
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  }

  return (
    <button
      className={`inline-block text-gray-600 hover:text-gray-900 transition duration-200 ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
