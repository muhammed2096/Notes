import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Protected from "./components/Protected/Protected";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  const routers = createHashRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {path:'*', element:<NotFoundPage/>},

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Protected>
              {" "}
              <Home />{" "}
            </Protected>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthProvider>
        <NoteProvider>
          <RouterProvider router={routers} />
        </NoteProvider>
      </AuthProvider>
    </>
  );
}

export default App;
