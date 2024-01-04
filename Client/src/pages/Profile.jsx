import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2' src={currentUser.otherUserInfo.profilePic} alt="Profile Pic" />
        <input type='text' placeholder='User Name' className='border p-3 rounded-lg' id='username' value={currentUser.otherUserInfo.username} />
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' value={currentUser.otherUserInfo.email} />
        <input type='text' placeholder='Password' className='border p-3 rounded-lg' id='password' value={currentUser.otherUserInfo.name} />
        <button className='bg-slate-700 text-white border p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >Update Profile</button>
      </form>
      <div className='flex flex-auto justify-between mt-4'>
        <span className='text-red-500'>Delete Account</span>
        <span className='text-red-500'>Logout</span>
      </div>
    </div>

  )
}
