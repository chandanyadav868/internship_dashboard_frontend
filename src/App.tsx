import { Outlet } from "react-router"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import { useContextProvider } from "./context/ContextProvider";

function App() {
  const { authenticationUser, authUser } = useContextProvider();
  const [applicationLoading, setApplicationLoading] = useState(false)

  useEffect(() => {
    const userFetching = async () => {
      try {
        setApplicationLoading(true)
        await authenticationUser();
        console.log(authUser);

      } catch (error) {
        const err = error as Error
        console.log("Error in Data:- ", JSON.parse(err.message));
        const errorMessageData = JSON.parse(err.message) as unknown as { error: string, message: string, stack: string, status: number };
        console.log(errorMessageData);
      } finally {
        setApplicationLoading(false)
      }
    }
    userFetching()
  }, [])
  return (
    <>
      {
        applicationLoading ?
          <div className="flex w-screen h-screen justify-center items-center">
            <span className="text-white text-4xl font-bold">Loading...</span>
          </div>
          :
          <div>
            {/* header */}
            <Header />
            <div className="min-h-lvh">
              <Outlet />
            </div>
            <Footer />
          </div>
      }
    </>
  )
}

export default App