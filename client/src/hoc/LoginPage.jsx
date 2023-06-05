import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import logo from "../distribute-it-logo.svg";

import { setAccessToken } from "../utils/auth";
import { verifyGoogleToken } from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const rs = await verifyGoogleToken(credentialResponse.credential);
    console.log(rs);
    setAccessToken(rs.data.access_token);
    navigate("/accept-task");
  };

  const onError = () => console.log("Login failed!");

  return (
    <div className="container">
      <div>
        <img src={logo} className="logo" alt="logo" />
      </div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccess(credentialResponse);
        }}
        onError={onError}
      />
    </div>
  );
};

export default LoginPage;
