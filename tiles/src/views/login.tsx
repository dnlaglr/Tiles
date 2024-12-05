import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LogIn() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const auth = useAuth();
  const navigate = useNavigate();

  function logInUser() {
    if (userInfo.email != '' && userInfo.password != '') {
      auth?.emailLogIn(userInfo.email, userInfo.password).then((user) => {
        console.log("User logged in successfully.");
        console.log(user);
      });
      
      navigate('/map');
    } else {
      console.error("User information is invalid.");
    }

  }

  useEffect(() => {
    if (auth?.getUser() != null) {
      navigate('/auth/profile');
    }
  }, [])

  return (
    <div className='flex justify-center items-center w-screen h-[calc(100vh_-_56px)]'>
      <div className='flex flex-col justify-center items-center h-full'>
        <div className='flex flex-col justify-center items-center w-full mb-4'>
          <h1 className='text-3xl font-bold'>Your details</h1>
          <h3 className='text-sm font-medium'>Please provide your email and password.</h3>
        </div>
        <div className='flex flex-col justify-center items-start w-full mb-3'>
          <label className='text-gray-900 text-base font-semibold'>Email</label>
          <input type='text' id='email' value={userInfo.email} onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} className='w-96 h-10 px-2 border-2 border-gray-900 rounded-lg' />
        </div>
        <div className='flex flex-col justify-center items-start w-full mb-3'>
          <label className='text-gray-900 text-base font-semibold'>Password</label>
          <input type='password' id='password' value={userInfo.password} onChange={(e) => setUserInfo({...userInfo, password: e.target.value})} className='w-96 h-10 px-2 border-2 border-gray-900 rounded-lg' />
        </div>
        <button onClick={logInUser} className='w-96 h-10 bg-black hover:bg-white text-white hover:text-black rounded-lg border-2 border-black mt-4'>
          <h1 className='text-lg font-semibold'>Log In</h1>
        </button>
      </div>
    </div>
  )
}