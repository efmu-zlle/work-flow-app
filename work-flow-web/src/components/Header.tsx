import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../assets/images/logo.svg";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import deepOrange from "@mui/material/colors/deepOrange";
import Container from "@mui/material/Container";

function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton sx={{ "&:hover": { backgroundColor: "transparent" } }}>
              <CardMedia
                component="img"
                src={logo}
                className="filter-grey"
              ></CardMedia>
            </IconButton>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
