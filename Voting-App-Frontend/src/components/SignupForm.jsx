import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import InputBox from "./InputBox";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const [signupData, setSignupData] = useState({
    name : "",
    age: "",
    email : "",
    mobile : "",
    address : "",
    aadharCardNumber : "",
    password : ""
  });

  const handleChange =(e)=>{
    setSignupData({...signupData, [e.target.name] : e.target.value})
  }

  const signupButtonHandler = async () => {
    try {
      if(signupData.name == ''){
          alert("Please enter your Name.");
          return;
      }
      if(signupData.email == ''){
          alert("Please enter your Email.");
          return;
      }
      if(signupData.mobile == ''){
          alert("Please enter your Mobile Number.");
          return;
      }
      if(signupData.address == ''){
          alert("Please enter your Address.");
          return;
      }
      if(signupData.aadharCardNumber == ''){
          alert("Please enter your AddharCard Number.");
          return;
      }
      if(signupData.password == ''){
          alert("Please enter your Password.");
          return;
      }
      if(signupData.age == ''){
          alert("Please enter your Password.");
          return;
      }
      const data = await authService.userSignup(signupData);
      if(data){
        dispatch(login(data));
        if(data.role === 'admin'){
          navigate("/admin");
        }else{
          navigate("/");
        }
      }else{
        dispatch(logout());
        setSignupData({name : "",age: "",email : "",mobile : "",address : "",aadharCardNumber : "",password : ""});
        navigate("/login");
      }
    } catch (error) {
      alert("Internal Server Error. Refresh Again");
    }
  };

  useEffect(()=>{
    if(authStatus){
      if(userData.role === 'admin'){
        navigate('/admin');
      }else{
        navigate('/');
      }
    }
  },[authStatus, userData, navigate])

  return (
      <div className="min-h-[90vh] flex justify-center items-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-xl w-full max-w-lg">
          <h1 className="text-center font-semibold text-lg sm:text-xl md:text-2xl text-blue-600 mb-4">
            Create a New Account
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputBox
              type="text"
              placeholder="Full Name"
              name = "name"
              value={signupData.name}
              onChange={handleChange}
            />
            <InputBox
              type="text"
              placeholder="Email Address"
              name = "email"
              value={signupData.email}
              onChange={handleChange}
            />
            <InputBox
              type="text"
              placeholder="Mobile Number"
              name = "mobile"
              value={signupData.mobile}
              onChange={handleChange}
            />
            <InputBox
              type="text"
              placeholder="Residential Address"
              name = "address"
              value={signupData.address}
              onChange={handleChange}
            />
            <InputBox
              type="text"
              placeholder="AadharCard Number"
              name = "aadharCardNumber"
              value={signupData.aadharCardNumber}
              onChange={handleChange}
            />
            <InputBox
              type="password"
              placeholder="Password"
              name = "password"
              value={signupData.password}
              onChange={handleChange}
            />
            <InputBox
              type="text"
              placeholder="Age"
              name = "age"
              value={signupData.age}
              onChange={handleChange}
              className="sm:col-span-2"
            />
          </div>
          <button
            onClick={signupButtonHandler}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-300 mt-4"
          >
            Create New Account
          </button>
          <div className="text-center mt-3">
            <Link to="/login" className="text-blue-600 text-sm hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
  );
}

export default SignupForm;
