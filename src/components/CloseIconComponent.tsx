import CloseIcon from '@mui/icons-material/Close';

interface CloseIconComponentsProps {
  funCall:()=>void
}

function CloseIconComponents({funCall}:CloseIconComponentsProps) {
  return (
    <CloseIcon className='absolute rounded-full bg-gray-500/80 text-white right-0 transform translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-500' onClick={()=> funCall()}/>
  )
}

export default CloseIconComponents