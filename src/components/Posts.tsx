import { useEffect } from "react";
import { useContextProvider } from "../context/ContextProvider"
import PostHolderComponets from "./PostHolderComponets"
import { apiClass } from "../Api/Apiclass";

function Posts() {
  const  {setUserPosts,setFiltringData,filtringData} = useContextProvider();

  useEffect(()=>{
    const response = async ()=>{
      try {
        if(filtringData.length > 0) return
        const allPost = await apiClass.get("/post/all");
        console.log("allPost:- ",allPost);
        setUserPosts(allPost.data??[]);
        setFiltringData(()=> [...allPost.data??[]])
      } catch (error) {
        const err = error as Error
            console.log("Error in Data:- ", JSON.parse(err.message));
            const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number }
            console.log(errorMessageData);
            
      }
    }
    response()
  },[]);

  return (
    <div className="flex flex-wrap justify-center items-center flex-col gap-4">
      {filtringData.length > 0 ? filtringData.map((data,index)=>(
        <PostHolderComponets key={index} {...data}/>
      )):
      <div> <h1 className="text-center font-bold">No Result Found!</h1></div>
       }
    </div>
  )
}

export default Posts