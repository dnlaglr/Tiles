import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import getGroups from '../util/groups/getGroups';
import joinGroup from '../util/groups/joinGroup';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

export default function Groups() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [groupCode, setGroupCode] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!auth?.currentUser) {
      navigate('/auth/login');
    }
    
    async function getGroupDocs() {
      if (auth?.currentUser) {
        const groupQuery = await getGroups(auth.currentUser.uid);
        setGroups(groupQuery);
      }
    }

    getGroupDocs();
  }, []);

  async function joinGroupByCode() {
    if (auth?.currentUser) {
      await joinGroup(auth.currentUser.uid, groupCode);
    }
  }
  
  return (
    <div className='flex justify-center items-center w-screen h-[calc(100vh_-_56px)] bg-gray-50'>
      <div className='flex flex-col items-center w-[60%] h-[95%]'>
        {/* Group Information */}
        <div className='flex flex-col justify-evenly items-start w-[95%] bg-white rounded-lg shadow-sm p-4'>
          <h1 className='text-xl text-gray-950 font-bold mb-1'>Welcome to your group homepage.</h1>
          <h2 className='text-base text-gray-600 font-medium'>See your current groups and join new ones! Unlock more group slots by purchasing a membership.</h2>
        </div>

        {/* Group Code */}
        <div className='flex flex-col justify-evenly items-start w-[95%] bg-white rounded-lg shadow-sm p-4 my-2'>
          <div className='flex flex-row justify-between items-center w-full py-1'>
            <h3 className='text-base text-gray-900 font-semibold'>Enter a group code: </h3>
            <div className='flex flex-1 flex-row justify-end items-center px-4'>
              <input type='text' id='email' value={groupCode} onChange={(e) => setGroupCode(e.target.value)} className='w-36 py-[2px] px-2 border border-gray-200 rounded-lg mr-1' />
              <button onClick={joinGroupByCode} className='bg-gray-100 hover:bg-gray-200 py-[2px] px-2 rounded-md'>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-1 flex-col justify-evenly items-start w-[95%] bg-white rounded-lg shadow-sm p-4'>
          <div className='flex flex-row justify-between items-center w-full pb-1 border-b mb-2'>
            <h1 className='text-xl text-gray-950 font-semibold'>Your Groups:</h1>
            <h1 className='text-xl text-gray-900 font-semibold'>({groups.length} / 1)</h1>
          </div>
          <div className='flex flex-1 flex-col items-center w-full overflow-y-scroll'>
            {groups.map((group, index) => {
              return (
                <div key={index} className='flex flex-col w-[95%] px-4 py-2 bg-gray-50 rounded-lg mb-2'>
                  <div className='flex flex-row justify-between items-center'>
                    <h2 className='text-lg text-gray-900 font-semibold'>{group.groupName}</h2>
                    <h3>({group.memberIDs.length} / 5)</h3>
                  </div>
                </div>
              )
            })
            }
            <div className='flex flex-col w-[95%] px-4 py-2 bg-gray-50 rounded-lg cursor-pointer'>
              <div className='flex flex-row justify-between items-center'>
                <h2 className='text-lg text-gray-900 font-semibold'>Create Group</h2>
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}