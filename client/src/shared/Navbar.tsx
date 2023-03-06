import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../distribute-it-logo.svg";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white", color: "gray" }}>
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 64,
            }}
            alt="Distribute it logo"
            src={logo}
          />
          <Typography component="div" sx={{ flexGrow: 1 }}>
            {/* Distribute-it */}
          </Typography>
          <Button
            style={{ textTransform: "none" }}
            color="inherit"
            startIcon={<LogoutIcon />}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
