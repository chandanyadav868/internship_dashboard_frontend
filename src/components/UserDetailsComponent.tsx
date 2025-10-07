import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef } from 'react';
import { useContextProvider } from '../context/ContextProvider';
import UserProfileUpdate from './UserProfileUpdate';

interface UserDetailsComponentProps {
    setProfileView: (value: React.SetStateAction<boolean>) => void
    profileView: boolean
}

function UserDetailsComponent({ setProfileView }: UserDetailsComponentProps) {
    const profileDivRef = useRef<HTMLDivElement>(null);
    const { logoutUser, authUser } = useContextProvider();

    // this useEffect run when this components mounts
    useEffect(() => {
        document.body.style.overflow = "hidden"
        const clickHandlerFun = (e: MouseEvent) => {
            const target = e.target as Node
            if (profileDivRef.current && !profileDivRef.current.contains(target)) {
                setProfileView(false)
            }
        }

        document.addEventListener("click", clickHandlerFun)
        return () => {
            document.body.style.overflow = "auto"
            document.removeEventListener("click", clickHandlerFun)
        }
    }, [])

    return (
        <>
            {authUser && <div ref={profileDivRef} className='max-md:flex-col w-[80%] h-[80%] flex rounded-md fixed left-[50%] transform -translate-x-1/2 top-[68px] bg-gray-700 gap-2 commanPadding' style={{ zIndex: 59 }}>
                <CloseIcon className='absolute rounded-full bg-gray-500/80 text-white right-0 transform translate-x-1/2 -translate-y-1/1 cursor-pointer hover:bg-gray-500' onClick={() => setProfileView(false)} />

                <div className="w-[200px] commanPadding bg-black rounded-md flex flex-col gap-2 max-md:flex-row max-md:w-full max-md:overflow-auto h-full max-md:h-[60px]">
                    <span className="bg-gray-500 font-semibold flex text-white rounded-md commanPadding mad:w-full cursor-pointer shrink-0 items-center">
                       <span>General</span> 
                    </span>
                    <span onClick={() => logoutUser()} className="bg-red-400 hover:bg-red-500 font-semibold flex items-center text-white rounded-md commanPadding md:w-full cursor-pointer shrink-0">
                        Log out
                    </span>

                </div>
                <div className="w-0.5 bg-gray-400 rounded-md h-full max-md:hidden"></div>

                <div className="flex-1 h-full bg-gray-800 text-white commanPadding rounded-md">
                    <UserProfileUpdate/>
                </div>
            </div>
            }
        </>
    )
}

export default UserDetailsComponent