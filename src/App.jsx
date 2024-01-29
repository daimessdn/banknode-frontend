import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import WelcomeView from "./views/WelcomeView";
import RegisterView from "./views/RegisterView";

import HomeView from "./views/HomeView";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<WelcomeView />} />
      <Route exact path="/register" element={<RegisterView />} />

      <Route exact path="/home" element={<HomeView />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
}

export default App;
