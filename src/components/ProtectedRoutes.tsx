import type React from "react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useContextProvider } from "../context/ContextProvider";


function ProtectedRoutes({children}:{children:React.ReactNode}) {
    const navigation = useNavigate()
  const { authUser, authenticationUser } = useContextProvider();
  const [loadingApplication,setApplicationLoading] = useState<boolean>(true)

  useEffect(() => {
    const useDataFetching = async () => {
      try {
        setApplicationLoading(true)
        await authenticationUser();

      } catch (error) {
        const err = error as Error
        console.log("Error in Data:- ", JSON.parse(err.message));
        const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number }
        console.log(errorMessageData);
        navigation("/auth/login")
      } finally {
        setApplicationLoading(false)
      }
    }
    useDataFetching()
  }, [])

  useEffect(() => {
    if (!authUser && !loadingApplication) {
      navigation("/auth/login")
    }
  }, [authUser,loadingApplication]);
  
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoutes