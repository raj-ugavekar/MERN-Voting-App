import React, { useEffect, useState } from "react";
import InputBox from "../../InputBox";
import service from "../../../services/config";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../../store/userSlice";
import { updateUserInfo } from "../../../store/authSlice";

function AddUserForm({ isOpen, onClose, user, isEditing, selectedUserId  }) {

  const dispatch = useDispatch();

  const authUser = useSelector((state)=>state.auth.userData);

  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    aadharCardNumber: "",
    age: "",
    address: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    if (isEditing && user) {
      setFormData({
        name: user.name,
        aadharCardNumber: user.aadharCardNumber,
        age: user.age,
        address: user.address,
        email: user.email,
        mobile: user.mobile,
        password: "",
      });
    } else {
      setFormData({
        name: "",
        aadharCardNumber: "",
        age: "",
        address: "",
        email: "",
        mobile: "",
        password: "",
      });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateData =()=>{
      if(formData.name == ''){
          alert("Please enter your Name.");
          return;
      }
      if(formData.email == ''){
          alert("Please enter your Email.");
          return;
      }
      if(formData.mobile == ''){
          alert("Please enter your Mobile Number.");
          return;
      }
      if(formData.address == ''){
          alert("Please enter your Address.");
          return;
      }
      if(formData.aadharCardNumber == ''){
          alert("Please enter your AddharCard Number.");
          return;
      }
      if(formData.age == ''){
          alert("Please enter your Password.");
          return;
      }
  }

  const handleAddUser = () => {
    validateData();
    setLoading(true);
    if (formData.name && formData.aadharCardNumber && formData.age && formData.address && formData.email && formData.password && formData.mobile) {
      if(confirm("Are you sure? want to add User.")){
        service.addUser(formData).then((userData)=>{
          if(userData){
            setFormData({name:"",
              aadharCardNumber : "",
              age: "",
              address: "",
              email : "",
              mobile: "",
              password: ""});
            dispatch(addUser(userData));
            alert("User Added Successfully");
            onClose();
          }
        })
        .finally(() => {
        setLoading(false);
      });
      }
    }
  };

  const handleEditUser = () => {
    validateData();
    setLoading(true);
    if (formData.name && formData.aadharCardNumber && formData.age && formData.address && formData.email && formData.mobile) {
      if(confirm("Are you sure? want to update user details.")){
        const updateUser = {name:formData.name,
          aadharCardNumber : formData.aadharCardNumber,
          age: formData.age,
          address: formData.address,
          email : formData.email,
          mobile: formData.mobile}
        service.updateUser(selectedUserId , updateUser).then((userData)=>{
          if(userData){
            setFormData({name:"",
              aadharCardNumber : "",
              age: "",
              address: "",
              email : "",
              mobile: "",
              password: ""});
            dispatch(editUser(userData));
            if(selectedUserId == authUser._id){
              dispatch(updateUserInfo(userData));
            }
            alert("User Updated Successfully");
            onClose();
          }
        })
        .finally(() => {
        setLoading(false);
      });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{isEditing ? "Edit User" : "Add New User"}</h2>
        <div className="flex flex-col gap-2">
        <InputBox
            type="text"
            name = "name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name = "email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name = "mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name = "address"
            placeholder="Residential Address"
            value={formData.address}
            onChange={handleChange}
          />
          <InputBox
            type="text"
            name = "aadharCardNumber"
            placeholder="AadharCard Number"
            value={formData.aadharCardNumber}
            onChange={handleChange}
          />
          {!isEditing ? <InputBox
            type="password"
            name = "password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          /> : <></> }
          <InputBox
            type="number"
            name="age"               
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md" disabled={loading} onClick={onClose}>
            Cancel
          </button>
          {isEditing ? <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleEditUser}
            disabled={loading}
          >
            {loading ? 'Updating User': 'Update'}
          </button> : <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={handleAddUser}
            disabled={loading}
          >
            {loading ? 'Adding User': 'Add'}
          </button> }
        </div>
      </div>
    </div>
  );
}

export default AddUserForm;
