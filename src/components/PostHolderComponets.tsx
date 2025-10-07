import { useContextProvider, type userPostProps } from "../context/ContextProvider";
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DotToolBox from "./DotToolBox";
import { useState } from "react";

function PostHolderComponets({ image, description, disLikeNumber, likeNumber, _id, userLiked, userDisliked }: userPostProps) {
  const { likesPosts, disLikesPosts, deletePost, editPost } = useContextProvider();
  // dot tool box opening
  const [toolBoxView,setToolBoxView] = useState<boolean>(false);

  return (
    <div className="max-w-[95%] w-[400px] bg-white auto commanPadding rounded-md">

      <div className="flex justify-end relative">
        <span onClick={(e)=> {e.stopPropagation(), setToolBoxView((prev)=> !prev)} } className="hover:bg-gray-200 cursor-pointer rounded-full flex justify-center items-center" style={{ padding: "4px", width: "35px", height: "35px" }}>
          <MoreVertIcon sx={{color:"#000000"}}/>
        </span>
        { toolBoxView && <DotToolBox editPost={editPost} id={_id}  deletePost={deletePost} viewToolBox={toolBoxView} setToolBoxView={setToolBoxView}/> }

      </div>

      <p className="text-black font-semibold" style={{marginBottom:"8px"}}>{description}</p>
      {image && <img width={100} height={100} src={image} alt="" className="w-full object-contain rounded-md h-auto" />}

      {/* post footer section */}
      <div>
        <div className="flex gap-4 commanPadding">
          <span className="flex gap-2">
            <ThumbUpTwoToneIcon sx={{
              cursor: "pointer",
              color: `${userLiked ? "#5c76f5" : "#000000"}`,
              ":hover": {
                color: `#5c76f5`,
              }
            }} onClick={() => likesPosts(_id)} />
            <span className="text-black">{likeNumber}</span>
          </span>

          <span className="flex gap-2">
            <ThumbDownOffAltTwoToneIcon sx={{
              cursor: "pointer",
              color: `${userDisliked ? "#f35863" : "#000000"}`,
              ":hover": {
                color: `#f35863`,
              }
            }} onClick={() => disLikesPosts(_id)} />
            <span className="text-black">{disLikeNumber}</span>
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default PostHolderComponets