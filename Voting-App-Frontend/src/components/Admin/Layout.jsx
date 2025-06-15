import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import authService from '../../services/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/authSlice';

export default function Layout() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
  }, [dispatch]);

	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex">
			<div className={`fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:w-60 w-64 bg-gray-100 z-50`}>
				<Sidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
			</div>
			<div className="flex flex-col flex-1">
				<Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
