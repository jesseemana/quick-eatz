import { Separator } from './ui/separator';

interface UserProps { 
  label: string, 
  value: string, 
}

const UserDetails: React.FC<UserProps> = ({ label, value }) => {
  return (
    <>
      <div className='py-4 px-1'>
        <h1 className='font-medium capitalize'>{label}</h1>
        <p className='text-gray-500 font-medium'>{value}</p>
      </div>
      <Separator className='md:w-[600px]' />
    </>
  )
}

export default UserDetails;
