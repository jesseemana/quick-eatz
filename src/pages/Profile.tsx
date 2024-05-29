import UserProfileForm from '@/components/forms/user-profile-form/UserProfileForm';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import useGetUser from '@/hooks/useGetUser';
import useUpdateUser from '@/hooks/useUpdateUser';

const Profile = () => {
  const { currentUser, isLoading: isGetUserLoading } = useGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  
  useDocumentTitle('Profile');

  if (isGetUserLoading) return (
    <div className='h-[540px]'>
      <p className='px-4'>Loading...</p>
    </div>
  )

  if (!currentUser) return (
    <div className='h-[540px]'>
      <p className='px-4 text-gray-600'>unable to load user profile!</p>
    </div>
  )

  return (
    <div className='px-4'>
      <UserProfileForm 
        onSave={updateUser} 
        currentUser={currentUser} 
        isLoading={isUpdateLoading} 
      />
    </div>
  )
}

export default Profile;
