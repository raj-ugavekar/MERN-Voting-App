import React, { useState } from "react";
import InputBox from "../InputBox";
import authService from "../../services/auth";

function ChangePasswordForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [changePassword, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
  };

  const changePasswordHandler = () =>{
    if(changePassword.oldPassword == ''){
          alert("Please enter your Old Password.");
          return;
    }
    if(changePassword.newPassword == ''){
          alert("Please enter your New Password.");
          return;
    }
    setLoading(true);
    authService.changeUserPassword(changePassword)
    .then((data)=>{
      if(data){
        alert(data);
        onClose();
      }
      setLoading(false);
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Update Password</h2>
        <div className="flex flex-col gap-2">
        <InputBox
            type="password"
            name = "oldPassword"
            placeholder="Old Password"
            value={changePassword.oldPassword}
            onChange={handleChange}
          />
        <InputBox
            type="password"
            name = "newPassword"
            placeholder="New Password"
            value={changePassword.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md" disabled={loading} onClick={onClose}>
            Cancel
          </button>
         <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={changePasswordHandler}
            disabled={loading}
          >
            {loading ? "Updating Password" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
