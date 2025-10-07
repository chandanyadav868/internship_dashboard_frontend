import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Authentication from './Authentication.tsx';
import Dashboard from './Dashboard.tsx';
import ErrorPage from './ErrorPage.tsx';
import Privacy from './Privacy.tsx';
import Posts from './components/Posts.tsx';
import ContextProvider from './context/ContextProvider.tsx';
import ProtectedRoutes from './components/ProtectedRoutes.tsx';
import Home from './Home.tsx';

// const { authenticationUser } = useContextProvider();

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      {
        path:"/",  element:<Home/>,
      },
      {
        path: "/dashboard/:id", element: <ProtectedRoutes children={<Dashboard />}/> ,
        children: [

          // future routes
          // {
          //   path: "/dashboard/:id/tasks", element: <Tasks />
          // },
          // {
          //   path: "/dashboard/:id/notes", element: <Notes />
          // },

          {
            path: "/dashboard/:id/posts", element: <Posts />
          },
        ]
      },
      {
        path: "/privacy", element: <Privacy />
      },
    ]
  },
  {
    path: "/auth/:type", element: <Authentication />
  },
  {
    path: "*", element: <ErrorPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
