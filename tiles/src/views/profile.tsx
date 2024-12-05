import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import profilePlaceholder from '../assets/profile/profile-placeholder.jpg'
import getGroups from '../util/groups/getGroups';
import getUser from '../util/users/getUser';
import deleteUserData from '../util/users/deleteUser';

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [groups, setGroups] = useState([]);

  function logOutUser() {
    auth?.logOut();
    navigate('/auth/login');
  }

  function deleteUser() {
    if (auth?.currentUser) {
      deleteUserData(auth, auth?.currentUser?.uid);
      navigate('/auth/signup');
    }
  }

  useEffect(() => {
    if (auth?.getUser() == null) {
      navigate('/auth/login');
    }

    async function getUserDoc() {
      if (auth?.currentUser) {
        const userQuery = await getUser(auth.currentUser.uid);
        setUser(userQuery);
      }
    }

    async function getGroupDocs() {
      if (auth?.currentUser) {
        const groupQuery = await getGroups(auth.currentUser.uid);
        setGroups(groupQuery);
      }
    }

    getUserDoc();
    getGroupDocs();
  }, [])

  console.log(user)

  return (
    <div className='flex justify-center items-center w-screen h-[calc(100vh_-_56px)]'>
      <div className='flex flex-row justify-between items-center w-[50%] h-[80%] rounded-md border border-gray-100 shadow-md p-12'>
        <div className='flex flex-col justify-between items-center w-1/3 h-full border-r'>
          {/* Profile Picture, Username, Join Date, Membership Status */}
          <div className='flex flex-col justify-evenly items-center pt-16'>
            <img className='w-[200px] h-[200px] border border-gray-100 rounded-md' src={profilePlaceholder}></img>
            <h1 className='pt-4'>{user?.displayName == null ? '' : user?.displayName}</h1>
          </div>
          <div className='flex flex-col justify-evenly items-center w-[80%] pb-24'>
            <button onClick={logOutUser} className='w-[90%] h-10 bg-black hover:bg-white text-white hover:text-black rounded-lg border-2 border-black mt-4'>Log Out</button>
            <button onClick={deleteUser} className='w-[90%] h-10 bg-red-700 hover:bg-white text-white hover:text-red-700 rounded-lg border-2 border-red-700 mt-4'>Delete Account</button>
          </div>
        </div>

        <div className='flex flex-col justify-start items-start w-2/3 h-full p-6 pr-0'>
          <div className='flex flex-col justify-start items-start w-full h-44 border border-gray-100 rounded-lg p-4'>
            <div className='flex flex-row justify-between items-center w-full pb-1 border-b mb-2'>
              <h1 className='text-xl text-gray-950 font-semibold'>Your Groups:</h1>
              <h1 className='text-xl text-gray-900 font-semibold'>({groups.length} / 1)</h1>
            </div>
            <div className='flex flex-col items-center w-full overflow-y-scroll'>
              {/* Display joined groups here */}
              {groups.map((group, index) => {
                return (
                  <div className='flex flex-row justify-between items-center w-full px-4 py-2 mb-2 rounded-md bg-gray-50' key={index}>
                    <h2 className='text-base text-gray-900 font-medium'>{group.groupName}</h2>
                    <h3>({group.memberIDs.length} / 5)</h3>
                  </div>
                )
              })

              }
              {/* Join Group Button */}
              <div onClick={() => navigate('/groups')} className='flex flex-row justify-between items-center w-full px-4 py-2 mb-2 rounded-md bg-gray-50 cursor-pointer'>
                <h2 className='text-base text-gray-900 font-medium'>Join a Group</h2>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}