import { Link } from "react-router";
import { headers } from "../utils/content";
import UserDetailsComponent from "./UserDetailsComponent";
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";

function Header() {
    const [profileView, setProfileView] = useState<boolean>(false);
    const { authUser } = useContextProvider();

    return (
        <header className="bg-white commanPadding flex justify-around items-center gap-4">
            <nav>
                <ul className="flex justify-center gap-4">
                    {headers.map(({ name, to }) => (
                        <Link key={to} className="font-bold text-xl" to={to}>{name}</Link>
                    ))}
                </ul>
            </nav>

            {   !authUser?
                <Link to={{pathname:"/auth/login"}} className="rounded-md hover:bg-blue-500/70 bg-blue-400/60 shadow-md font-semibold" style={{padding:"4px 7px"}}>Login</Link>
                :
                <div onClick={(e) => {
                    e.stopPropagation();
                    setProfileView((prev) => !prev)
                }} className="w-[40px] cursor-pointer h-[40px] bg-gray-600 rounded-full relative">
                    { authUser.avatar && <img src={`${authUser.avatar}`} alt="" className='w-full h-full object-cover rounded-full' />}
                </div>
            }

            {/* this components will render when user is login */}
            {profileView && authUser && <UserDetailsComponent profileView={profileView} setProfileView={setProfileView} />}
        </header>
    )
}

export default Header