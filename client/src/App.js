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
import {useState,useEffect} from "react"
import {ethers} from "ethers"
import TestContract from "./utils/TestContract.json"

function App() {
  const location = useLocation();
  const [contractDetails,setContractDetails]=useState({
    provider:null,
    signer:null,
    contract:null
  })


  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress="0xd755E7DC18636DBb5001dE6b331A355bf527B916"
      const contractABI=TestContract.abi
      try{
        const {ethereum}=window;
        if(ethereum){
          const account=await ethereum.request({ method: 'eth_requestAccounts'})
          const provider=new ethers.providers.Web3Provider(ethereum)
          const signer=provider.getSigner()
          const contract =new ethers.Contract(
            contractAddress,
            contractABI,
            signer)

          setContractDetails({provider,signer,contract})

        }
      }catch(error){
        console.log(error)
      }
    }
    connectWallet()
  },[]);


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
              element={<AcceptTaskPage contractDetails={contractDetails} ></AcceptTaskPage>}
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
          <TaskUploadPage contractDetails={contractDetails}></TaskUploadPage>
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
