import { Label } from './ui/label';

const BestMatch = ({ checked, toggleBestMatch }: { 
  checked: boolean, 
  toggleBestMatch: (e: React.ChangeEvent<HTMLInputElement>) => void, 
}) => {
  return (
    <div>
      <input 
        id='bestMatch'
        type='checkbox' 
        value='bestMatch'
        className='hidden'
        checked={checked}
        onChange={toggleBestMatch}
      />
      <Label 
        htmlFor='bestMatch'
        className={`items-center cursor-pointer font-normal capitalize rounded-full px-4 py-2 text-[14px] ${
          checked 
          ? 'bg-black text-white' 
          : 'border-gray-100 bg-gray-100'
        }`}
      >
        best match
      </Label>
    </div>
  )
}

export default BestMatch;
