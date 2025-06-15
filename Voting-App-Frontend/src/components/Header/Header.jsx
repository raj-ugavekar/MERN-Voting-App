import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import ProfilePopUpModal from "./ProfilePopUpModal";
import ChangePasswordForm from "./ChangePasswordForm";
import AddUserForm from "../Admin/Pages/AddUserForm";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen , setIsEditModalOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [updateUser , setUpdateUser] = useState();
  const [updateUserId , setUpdateUserId] = useState();

  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", route: "/", active: authStatus },
    { name: "Vote Count", route: "/votecount", active: true },
    { name: "Voting", route: "/voting", active: authStatus },
    { name: "Login", route: "/login", active: !authStatus },
    { name: "Signup", route: "/signup", active: !authStatus },
  ];

  const loadEditUser = (user) => {
    setUpdateUser({
      name:user.name,
      aadharCardNumber : user.aadharCardNumber,
      age: user.age,
      address: user.address,
      email : user.email,
      mobile: user.mobile,
      password: ""
    });
    setIsEditModalOpen(true);
    setUpdateUserId(user._id);
  };

  const clearForm = () => {
		setUpdateUser({name:"",
			aadharCardNumber : "",
			age: "",
			address: "",
			email : "",
			mobile: "",
			password: ""});
		setIsEditModalOpen(false);
	  }

  return (
    <>
      <header className="bg-gray-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="text-xl font-semibold text-gray-700">VOTER</span>
          </div>

          <nav className="hidden md:flex space-x-6 md:justify-end">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.route)}
                  className="text-gray-600 hover:text-gray-900 transition duration-200"
                >
                  {item.name}
                </button>
              ) : null
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {authStatus && (
              <div className="relative">
                <div
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-blue-600 hover:text-blue-900 text-xl rounded-full cursor-pointer"
                >
                  <FaUser />
                </div>
                <ProfilePopUpModal
                  isOpen={isProfileOpen}
                  userData={userData}
                  onChangePassword={() => {
                    setIsProfileOpen(false);
                    setIsChangePasswordOpen(true);
                  }}
                  onEdit={(user) => loadEditUser(user)}
                />
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none text-2xl text-gray-700"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-y-0 left-0 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out md:hidden w-64 flex flex-col justify-between bg-gray-100 shadow-md z-50`}
        >
          <div className="flex flex-col space-y-4 p-6">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(item.route);
                  }}
                  className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-md transition"
                >
                  {item.name}
                </button>
              ) : null
            )}
          </div>
        </div>
      </header>
      <ChangePasswordForm
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      <AddUserForm
        isOpen={isEditModalOpen}
        onClose={clearForm}
        user={updateUser}
        isEditing={true}
        selectedUserId = {updateUserId}
      />
    </>
  );
}

export default Header;
