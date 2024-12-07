import { createRoot } from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Tiles from './views/tiles'
import SignUp from './views/signup'
import LogIn from './views/login'
import Profile from './views/profile'
import Activity from './views/activity'
import Groups from './views/groups'
import UserLocation from './components/UserLocation'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />  {/* Render the child component */}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'map',
        element: <Tiles />
      },
      {
        path: 'activity',
        element: <Activity />
      },
      {
        path: 'groups',
        element: <Groups />
      }
    ]
  },
  {
    path: '/auth/',
    element: <Layout />,
    children: [
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <LogIn />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <UserLocation />
    <RouterProvider router={router} />
  </AuthProvider>
)
