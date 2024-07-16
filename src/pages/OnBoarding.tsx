import UserProfileForm from '@/components/forms/user-profile-form/UserProfileForm';
import useGetUser from '@/hooks/useGetUser';
import useUpdateUser from '@/hooks/useUpdateUser';
import { useNavigate } from 'react-router';

const OnBoarding = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading: isGetUserLoading } = useGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  
  if (isGetUserLoading) return (
    <div className='h-[540px]'>
      <p className='px-4 md:px-8'>
        Loading...
      </p>
    </div>
  );

  if (!currentUser) return (
    <div className='h-[540px]'>
      <p className='px-4 text-gray-600'>
        unable to load user profile!
      </p>
    </div>
  );

  if (
    currentUser.name 
    && currentUser.phone 
    && currentUser.city 
    && currentUser.country
    && currentUser.addressLine1 
  ) {
    navigate('/');
  }

  return (
    <div className='py-4'>
      <UserProfileForm 
        title='onboarding' 
        subTitle={`Welcome to Quickeatz, let's finish setting up your profile!`} 
        onSave={updateUser}
        isLoading={isUpdateLoading}
        currentUser={currentUser}
      />
    </div>
  );
}

export default OnBoarding;
