interface TaskDetailsCardProps {
    heading:string;
    paragraph:string;
    icon:any
}

function TaskDetailsCard({heading,paragraph,icon}:TaskDetailsCardProps) {
  return (
    <div className="outline-2 shadow-md outline-amber-50 p-4 w-[250px] max-md:w-full h-auto commanPadding flex items-center rounded-md bg-white" style={{padding:"2px"}}>
          {icon}
        {/* <div className="w-[80px] bg-amber-200 h-[80px] rounded-full">
        
        </div> */}
        <div className=" flex-1 flex flex-col items-center">
            <h1 className="font-bold text-2xl">{heading}</h1>
            <p className="font-semibold">{paragraph}</p>
        </div>
    </div>
  )
}

export default TaskDetailsCard