import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../distribute-it-logo.svg";
import { Button } from "@mui/material";

export const Login = () => {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <div className="container">
        <div className="button">
          <Button variant="outlined" startIcon={<GoogleIcon />}>
            Sign-in with Google
          </Button>
        </div>
        <div className="button">
          <Button variant="outlined" startIcon={<GitHubIcon />}>
            Sign-in with GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};
