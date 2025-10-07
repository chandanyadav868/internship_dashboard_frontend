
export const headers = [
    {
        to:"/",
        name:"Home"
    },
    {
        to:"/dashboard/1234424",
        name:"Dashboard"
    },
    {
        to:"/privacy",
        name:"Privacy"
    },
]

export const task = [
    //{
    //     to:"/tasks",
    //     name:"Tasks"
    // },
    // {
    //     to:"/notes",
    //     name:"Notes"
    // },
    
    {
        to:"/posts",
        name:"Posts"
    }
]


export const lastUrlSlashValue = (pathname:string)=>{
    const lastvalue = pathname.slice(pathname.lastIndexOf("/"), pathname.length)
    return lastvalue
}


export const toolBox = [
    "Edit", "Delete"
]

export const ProfileUserMenu = [
    "General",
]