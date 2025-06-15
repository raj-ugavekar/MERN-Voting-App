import React, { useEffect, useState } from "react";
import UserDetailsCard from "./UserDetailsCard";
import AddUserForm from "./AddUserForm";
import service from "../../../services/config";
import { useDispatch, useSelector } from "react-redux";
import { setInitialUsers } from "../../../store/userSlice";
import UserDetailsPopUpModal from "./UserDetailsPopUpModal";
import LoadingSpinner from "../../LoadingSpinner";

function UserDetails() {

  const dispatch = useDispatch();

  const users = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({name:"",
    aadharCardNumber : "",
    age: "",
    address: "",
    email : "",
    mobile: "",
    password: ""});

  useEffect(() => {
    service.getUsers().then((data) => {
      if (data) {
        dispatch(setInitialUsers(data));
      }
    });
  }, []);

  useEffect(()=>{
    if(users){
      setFilteredUsers(users);
    }
  },[users])

  function searchUser(){
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  const loadEditUser = (user) => {
    setNewUser({
      name:user.name,
      aadharCardNumber : user.aadharCardNumber,
      age: user.age,
      address: user.address,
      email : user.email,
      mobile: user.mobile,
      password: ""
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setSelectedUserId(user.id);
  };
  
  const openUserDetails = (user) =>{
    setSelectedUser(user);
    setIsDetailsPopupOpen(true);
  }

  useEffect(()=>{
    if(isModalOpen){
      setIsDetailsPopupOpen(false);
    }
  },[isModalOpen])

  const clearForm = () => {
    setNewUser({name:"",
      aadharCardNumber : "",
      age: "",
      address: "",
      email : "",
      mobile: "",
      password: ""});
      setIsModalOpen(false);
      setIsEditing(false);
  }

  return (
    <section className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col justify-between items-center gap-4 mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-700">USERS</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search User..."
            className="border rounded-md px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-4 justify-center mt-4 md:mt-0">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => searchUser()}
          >
            Search
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            + Add User
          </button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserDetailsCard key={user.id} user={user} onEdit={loadEditUser} onClick={()=> openUserDetails(user)}/>
          ))
        ) : (
          <LoadingSpinner className="min-h-[174px]"/>
        )}
      </div>
      <AddUserForm
        isOpen={isModalOpen}
        onClose={()=>clearForm()}
        user={newUser}
        isEditing={isEditing}
        selectedUserId = {selectedUserId}
      />
        <UserDetailsPopUpModal 
        isOpen={isDetailsPopupOpen} 
        onClose={() => setIsDetailsPopupOpen(false)} 
        user={selectedUser} 
      />
    </section>
    
  );
}

export default UserDetails;
