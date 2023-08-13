import "./App.css";
import Login from "../Login";
import Dashboard from "../Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../../contilio.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  return (
    <header className="App contact">
      <section id="contact">
        <RouterProvider router={router} />
      </section>
    </header>
  );
}

export default App;
