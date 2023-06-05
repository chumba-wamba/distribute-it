import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import AcceptTaskPage from "./hoc/AcceptTaskPage";
import LoginPage from "./hoc/LoginPage";
import TaskUploadPage from "./hoc/TaskUploadPage";
import Navbar from "./shared/Navbar";
import { getAccessToken, isLoggedIn } from "./utils/auth";
import theme from "./utils/theme";
import UploadedTaskPage from "./hoc/UploadedTaskPage";
import ExecutedTaskPage from "./hoc/ExecutedTaskPage";

function App() {
  const location = useLocation();
  const PrivateRoutes = () => {
    return getAccessToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const HideOnLoginRoutes = () => {
    return getAccessToken() ? <Navigate to="/accept-task" /> : <Outlet />;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/" && isLoggedIn() && <Navbar></Navbar>}
        <Routes>
          <Route element={<HideOnLoginRoutes />}>
            <Route path="/" element={<LoginPage />}></Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/accept-task"
              element={<AcceptTaskPage></AcceptTaskPage>}
            ></Route>
            <Route
              path="/uploaded-task"
              element={<UploadedTaskPage></UploadedTaskPage>}
            ></Route>
            <Route
              path="/executed-task"
              element={<ExecutedTaskPage></ExecutedTaskPage>}
            ></Route>
          </Route>
        </Routes>
        {location.pathname !== "/" && isLoggedIn() && (
          <TaskUploadPage></TaskUploadPage>
        )}
      </ThemeProvider>
    </GoogleOAuthProvider>
    /* <div
        style={{ display: "flex", justifyContent: "center", margin: "1rem" }}
      >
        <Task></Task>
      </div>
    */
  );
}

export default App;
