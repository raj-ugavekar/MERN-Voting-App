import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordForm from "../Header/ChangePasswordForm";
import { FaUser } from "react-icons/fa";
import ProfilePopUpModal from "../Header/ProfilePopUpModal";
import AddUserForm from "./Pages/AddUserForm";

function Header({ toggleSidebar }) {

	const [isEditModalOpen , setIsEditModalOpen] = useState(false);
  	const [updateUser , setUpdateUser] = useState();
  	const [updateUserId , setUpdateUserId] = useState();
  	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
	
	const userData = useSelector((state) => state.auth.userData);

	  const menuRef = useRef(null);
	  const profileRef = useRef(null);
	
	  useEffect(() => {
		function handleClickOutside(e) {
		  if (menuRef.current && !menuRef.current.contains(e.target)) {
			toggleSidebar();
		  }
		  if (profileRef.current && !profileRef.current.contains(e.target)) {
			setIsProfileOpen(false);
		  }
		}
		document.addEventListener("mousedown", handleClickOutside);
		  return () => document.removeEventListener("mousedown", handleClickOutside);
	  }, []);

	const loadEditUser = (user) => {
		setIsProfileOpen(false);
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
			<header className="bg-gray-100 shadow-md w-full" ref={menuRef}>
				<div className="lg:container mx-auto px-6 py-4 flex left-auto justify-between items-center">
					<button onClick={toggleSidebar} className="lg:hidden text-gray-700 text-2xl focus:outline-none">
						☰
					</button>
					<div className="hidden lg:block"></div>
					<h1 className="text-xl font-semibold text-gray-700">Admin Panel</h1>
				<div>
					<div
					onClick={() => setIsProfileOpen(!isProfileOpen)}
					className="  text-blue-600 hover:text-blue-900 text-xl pt-1 rounded-full cursor-pointer"
					>
					<FaUser />
					</div>
				</div>
				</div>
			</header>
			<div className="absolute z-50 top-6 right-12" ref={profileRef}>
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
			<ChangePasswordForm isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)}  />
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
