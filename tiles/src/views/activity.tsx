
export default function Activity() {
  return (
    <div className='flex justify-center items-center w-screen h-[calc(100vh_-_56px)] bg-gray-50'>
      <div className='flex flex-col justify-between items-center w-[60%] h-[95%]'>
        <div className='flex flex-col justify-evenly items-start w-[95%] h-[90px] bg-white rounded-lg shadow-sm p-4'>
          <h1 className='text-xl text-gray-950 font-bold mb-1'>Welcome to your group's activity feed.</h1>
          <h2 className='text-base text-gray-600 font-medium'>Start visiting new tiles to build up your feed!</h2>
        </div>

        {/* Activity Feed */}
        <div className='flex flex-col justify-evenly items-start w-[95%] h-[calc(100%_-_105px)] bg-white rounded-lg shadow-sm p-4 overflow-y-scroll'>
          {true ?
            <div className='flex justify-center items-center w-full h-full'>
              <h3 className='text-xl text-gray-500 font-medium'>Nothing to see here yet!</h3>
            </div>
          :
            <div></div>
          }
        </div>
      </div>
    </div>
  )
}