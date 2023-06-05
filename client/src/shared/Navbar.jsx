import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeAccessToken();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component="div"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            distribute it
          </Typography>
          <Grid sx={{ mr: "auto" }}>
            <Button color="inherit" onClick={() => navigate("/accept-task")}>
              Accept
            </Button>
            <Button color="inherit" onClick={() => navigate("/executed-task")}>
              Executed
            </Button>
            <Button color="inherit" onClick={() => navigate("/uploaded-task")}>
              Uploaded
            </Button>
          </Grid>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logout"
            sx={{ mx: 2 }}
            onClick={logout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
