import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Authorize from './routes/Authorize';
import Task from './routes/Task';
import is_admin from "./helpers/is_admin";
import { useEffect, useState } from "react";

function App() {
  const [admin, setAdmin] = useState(is_admin);
  return (
    <>
    <Navbar admin={admin} setAdmin={setAdmin} />
    <RouterProvider router={createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/authorize",
    element: <Authorize />
  },
  {
    path: "/home",
    element: <Task admin={admin}/>
  },
])} />
    
    
    </>
  );
}

export default App;
