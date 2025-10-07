import { Link, Outlet, useLocation } from "react-router"
import TaskDetailsCard from "./components/TaskDetailsCard"
import { lastUrlSlashValue, task } from "./utils/content"
import UniqueForm from "./components/UniqueForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContextProvider } from "./context/ContextProvider";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Input from "./components/Input";
import type { ChangeEvent } from "react";


function Dashboard() {
  const { pathname } = useLocation();
  const lastvalue = lastUrlSlashValue(pathname);
  const { formOpen, setFormOpen, formPreviousData, userPost, setFiltringData,authUser } = useContextProvider();

  const Searching = (e:ChangeEvent<HTMLInputElement>)=>{
    const text = e.target.value.trim();
    console.log(text);

    console.log(pathname);
    

    const userFiltringData = userPost.filter(({description,tags})=> {
      if (description.includes(text) || tags.includes(text)) {
        return true
      }
      return false
    });

    setFiltringData(userFiltringData)
    console.log(userFiltringData);
    
  }

  return (
    <div className="w-[80%] max-md:w-full bg-amber-300/10 marginCenter commanPadding commonflex items-center flex-col">

      {/* this is the sub task card details */}
      <div className="commonflex">

        {/* future Features */}
        {/* <TaskDetailsCard icon={<AddTaskIcon fontSize="large" sx={{ width: 80, height: 80 }} />} heading="Task" paragraph={authUser?.tasks??0} />
        <TaskDetailsCard icon={<NotesIcon fontSize="large" sx={{ width: 80, height: 80 }} />} heading="Notes" paragraph={authUser?.notes??0} /> */}

        <TaskDetailsCard icon={<PostAddIcon fontSize="large" sx={{ width: 80, height: 80 }} />} heading="Posts" paragraph={authUser?.posts??0} />
      </div>

      {/* this is the sub task card menu */}
      <div className="bg-gray-800 rounded-md text-white commanPadding commonflex w-full justify-center">
        {task.map(({ name, to }) => (
          <span className={`font-bold hover:bg-gray-500 ${lastvalue === to ? "bg-gray-500" : ""} cursor-pointer rounded-md uppercase`} style={{ padding: "4px 8px" }} key={to}>
            <Link to={`/dashboard/1234424${to}`}>{name}</Link>
          </span>
        ))}
      </div>

      {/* this is the plus button */}
      <div className="w-full flex justify-end">
        <AddCircleOutlineIcon onClick={() => setFormOpen(true)} className={`text-end font-bold cursor-pointer rounded-full springTransition text-2xl text-white`} style={{ padding: "2px" }} />
      </div>

      {/* searching capabity */}
      <div className="text-white w-full flex justify-end">
        <div className="w-[350px]">
          <Input type="search" onChange={(e)=> Searching(e)} placeholder="Searching..." text="Filter" className="bg-gray-800 placeholder:text-white text-white" requiredField={false} />
        </div>
      </div>

      {formOpen && <UniqueForm {...formPreviousData} />}

      {/* outlet shower mini */}
      <div className="w-full rounded-md commanPadding text-white">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard