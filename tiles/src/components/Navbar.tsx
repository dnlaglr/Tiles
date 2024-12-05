import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  {
    path: '/map',
    name: 'Map',
  },
  {
    path: '/activity',
    name: 'Activity',
  },
  {
    path: '/groups',
    name: 'Groups',
  }
]

export default function Navbar() {
  const auth = useAuth();

  return (
    <div className='flex justify-center items-center w-screen h-14 px-64'>
      <div className='flex flex-row justify-between items-center w-full h-full'>
        <Link to='/'>
          <h1 className='text-gray-900 text-2xl font-semibold'>Tiles</h1>
        </Link>
        <ul className='flex flex-row justify-evenly items-center w-96 h-full'>
          {navLinks.map((link, index) => (
            <li className='text-gray-900 text-base font-medium' key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
        {auth?.currentUser == null || auth?.currentUser == undefined ? 
          <div className='flex flex-row justify-between items-center w-52'>
            <Link to='/auth/signup' className='flex justify-center items-center w-24 bg-black hover:bg-white text-white hover:text-black py-1 rounded-lg border-2 border-black'>
              <h1 className='text-base font-semibold'>Sign Up</h1>
            </Link>
            <Link to='/auth/login' className='flex justify-center items-center w-24 bg-black hover:bg-white text-white hover:text-black py-1 rounded-lg border-2 border-black'>
              <h1 className='text-base font-semibold'>Log In</h1>
            </Link>
          </div>
          :
          <div className='flex justify-center items-center'>
            <Link to='/auth/profile' className='flex justify-center items-center w-24 bg-black hover:bg-white text-white hover:text-black py-1 rounded-lg border-2 border-black'>
              <h1 className='text-base font-semibold'>Profile</h1>
            </Link>
          </div>
        }

      </div>
    </div>
  )
}