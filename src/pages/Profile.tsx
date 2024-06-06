import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useGetUser from '@/hooks/useGetUser';
import profile from '@/assets/profile.png';
import UserDetails from '@/components/UserDetails';

const Profile = () => {
  useDocumentTitle('Profile');

  const { currentUser, isLoading } = useGetUser();

  if (isLoading) return (
    <div className='h-[540px]'>
      <p className='px-4'>Loading...</p>
    </div>
  );

  if (!currentUser) return (
    <div className='h-[540px]'>
      <p className='px-4 text-gray-800'>unable to load user profile!</p>
    </div>
  );

  const user_details: Pick<User, 'name' | 'email' | 'city' | 'phone'> = {
    name: currentUser.name, 
    city: currentUser.city, 
    email: currentUser.email, 
    phone: currentUser.phone, 
  }

  return (
    <div className='px-10 py-4'>
      <h1 className='capitalize text-3xl font-bold'>account info</h1>
      <div className='relative py-4'>
        <img 
          src={profile} 
          alt='user profile icon' 
          className='w-40'
        />
        <Link 
          to='/edit-profile' 
          className='absolute top-[55%] bg-gray-100 p-3 rounded-full'
        >
          <Pencil className='text-gray-700' />
        </Link>
      </div>
      <h1 className='capitalize text-2xl font-bold'>basic info</h1>
      <div>
        {Object.entries(user_details).map((user) => (
          <UserDetails 
            key={user[0]}
            label={user[0]} 
            value={user[1]} 
          />
        ))}
      </div>
    </div>
  );
}

export default Profile;
