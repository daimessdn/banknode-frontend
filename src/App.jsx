import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import WelcomeView from "./views/WelcomeView";
import RegisterView from "./views/RegisterView";

import HomeView from "./views/HomeView";
import TransactionDetailsView from "./views/TransactionDetailsView";
import ProfileView from "./views/ProfileView";

const mainRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<WelcomeView />} />
      <Route exact path="/register" element={<RegisterView />} />

      <Route exact path="/home" element={<HomeView />} />

      <Route
        path="/transaction/details/:id"
        element={<TransactionDetailsView />}
      />

      <Route exact path="/profile" element={<ProfileView />} />
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
