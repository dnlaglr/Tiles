import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import getActivity from '../util/groups/getActivity';

export default function Activity() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [groupActivity, setGroupActivity] = useState([]);

  useEffect(() => {
    if (!auth?.currentUser) {
      navigate('/auth/login');
    }

    async function fetchGroupActivity() {
      if (auth?.currentUser) {
        const activityData = await getActivity(auth.currentUser.uid);
        setGroupActivity(activityData || []);
      }
    }
    fetchGroupActivity();
  }, [])

  return (
    <div className='flex justify-center items-center w-screen h-[calc(100vh_-_56px)] bg-gray-50'>
      <div className='flex flex-col justify-between items-center w-[60%] h-[95%]'>
        <div className='flex flex-col justify-evenly items-start w-[95%] h-[90px] bg-white rounded-lg shadow-sm p-4'>
          <h1 className='text-xl text-gray-950 font-bold mb-1'>Welcome to your group's activity feed.</h1>
          <h2 className='text-base text-gray-600 font-medium'>Start visiting new tiles to build up your feed!</h2>
        </div>

        {/* Activity Feed */}
        <div className='flex flex-col justify-evenly items-start w-[95%] h-[calc(100%_-_105px)] bg-white rounded-lg shadow-sm p-4 overflow-y-scroll'>
          {groupActivity.length == 0 ?
            <div className='flex justify-center items-center w-full h-full'>
              <h3 className='text-xl text-gray-500 font-medium'>Nothing to see here yet!</h3>
            </div>
          :
            <div className='flex flex-col justify-start w-full h-full'>
              {groupActivity.map((activity, index) => (
                <div key={index} className='flex flex-col w-full px-4 py-1 mb-4 bg-gray-50 rounded-md'>
                  <div className='flex flex-row justify-between items-center'>
                    <h1 className='text-lg text-gray-900 font-semibold'>{activity.displayName}</h1>
                    <h1 className='text-base text-gray-700 font-medium'>{new Date(activity.timestamp.seconds * 1000).toLocaleString()}</h1>
                  </div>
                  <h2>Unlocked a tile at: {activity.unlockedCoords._lat} N, {activity.unlockedCoords._long} E!</h2>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}