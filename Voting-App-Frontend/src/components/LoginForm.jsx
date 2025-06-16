import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/auth";
import { login, logout } from "../store/authSlice";
import InputBox from "./InputBox";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [loginData , setLoginData] = useState({
    aadharCardNumber : "",
    password : ""
  });

  const handleChange=(e)=>{
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const loginButtonHandler = async () => {
    try {
      if (loginData.aadharCardNumber == '') {
          alert("Please enter your AadharCard Number.");
          return;
      }
      if (loginData.password == '') {
          alert("Please enter your Password.");
          return;
      }
      const data = await authService.userLogin(loginData);
      if(data){
        dispatch(login(data));
        if(data.role === 'admin'){
          navigate("/admin");
        }else{
          navigate("/home");
        }
      }else{
        dispatch(logout());
        setLoginData({aadharCardNumber : "", password : ""})
        navigate("/login");
      }
    } catch (error) {
      alert("Internal Server Error. Refresh Again");
    }
  };

  useEffect(()=>{
    if(authStatus){
      if(userData?.role === 'admin'){
        navigate('/admin');
      }else{
        navigate('/home');
      }
    }
  },[authStatus, userData, navigate])

  return (
      <div className="min-h-[84vh] md:min-h-[90vh] flex justify-center items-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-center font-semibold text-lg sm:text-xl md:text-2xl text-blue-600 mb-4">
            Login to Your Account
          </h1>
          <InputBox
            type="text"
            placeholder="AadharCard Number"
            name = "aadharCardNumber"
            value={loginData.aadharCardNumber}
            onChange={handleChange}
            className="mb-3"
          />
          <InputBox
            type="password"
            placeholder="Password"
            name = "password"
            value={loginData.password}
            onChange={handleChange}
            className="mb-3"
          />
          <button
            onClick={loginButtonHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Log in
          </button>
          <div className="text-center my-3">
            <span className="text-blue-600 text-sm cursor-pointer hover:underline">
              Forgot password? Contact Admin
            </span>
          </div>
          <hr className="my-4" />
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Create New Account
          </button>
        </div>
      </div>
  );
}

export default LoginForm;
