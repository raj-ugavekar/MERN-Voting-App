import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdClear } from "react-icons/md";
import LogoutBtn from '../Header/LogoutBtn';

const DASHBOARD_SIDEBAR_LINKS = [
	{ key: 'dashboard', label: 'Dashboard', path: '/admin' },
	{ key: 'users', label: 'Users', path: '/admin/users' },
	{ key: 'candidates', label: 'Candidates', path: '/admin/candidates' },
];

export default function Sidebar({toggleSidebar}) {
	const { pathname } = useLocation();

	const menuRef = useRef(null);

	  useEffect(() => {
		function handleClickOutside(e) {
			console.log(e.target);
			console.log(menuRef.current);
		  if (menuRef.current && !menuRef.current.contains(e.target)) {
			toggleSidebar();
		  }
		}
		document.addEventListener("mousedown", handleClickOutside);
		  return () => document.removeEventListener("mousedown", handleClickOutside);
	  }, []);

	return (
		<div className="h-full w-full p-4 flex flex-col bg-gray-100 shadow-lg" ref={menuRef}>
			<div className="flex items-center relative gap-2 mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
					strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
					className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
					viewBox="0 0 24 24">
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
				</svg>
				<span className="text-xl font-bold text-gray-800">Voter</span>
				<button onClick={toggleSidebar}
              className="absolute right-0 mr-2 text-2xl text-gray-600 lg:hidden">
				<MdClear />
				</button>
			</div>
			<div className="flex-1 space-y-2">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<Link key={link.key} to={link.path} onClick={toggleSidebar}
						className={`flex items-center gap-2 px-4 py-3 hover:bg-gray-300 rounded-md transition-all ${pathname === link.path ? "bg-blue-500 text-white" : "text-gray-700"}`}>
						{link.label}
					</Link>
				))}
			</div>
			<div className="mt-auto text-center bg-blue-500 hover:bg-blue-700 rounded-md p-2">
				<LogoutBtn className="text-white"/>
			</div>
		</div>
	);
}
