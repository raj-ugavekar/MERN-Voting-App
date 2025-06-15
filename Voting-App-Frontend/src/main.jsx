import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import VoterCount from './components/VoterCount';
import Voting from './components/Voting';
import Layout from './components/Admin/Layout';
import Dashboard from './components/Admin/Dashboard.jsx';
import UserDetails from './components/Admin/Pages/UserDetails.jsx';
import CandidateDetails from './components/Admin/Pages/CandidateDetails.jsx';
import FrontPage from './components/FrontPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <FrontPage /> },
      { path: "/votecount", element: <VoterCount /> },
      { path: "/voting", element: <Voting /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignupForm /> }
    ]
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/users", element: <UserDetails /> },
      { path: "/admin/candidates", element: <CandidateDetails /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
