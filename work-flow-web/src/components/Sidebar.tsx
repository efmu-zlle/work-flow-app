import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const drawerWidth = 300;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          pl: 3,
          pr: 5,
          mt: 3,
          borderRight: "none",
          backgroundColor: "#D5E4FF",
        },
      }}
    >
      <Toolbar />
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: "#7c9cab",
            fontSize: ".75em",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          managment
        </Typography>
        <List>
          {["Team", "Members"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  p: 0,
                  mb: 0.7,
                  pl: 0.7,
                  position: "relative",
                  transition: "transform 0.3s",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "50%",
                    height: 2,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider
          sx={{
            border: "1px solid #B4CBD6",
            my: 3,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            color: "#7C9CAB",
            fontSize: ".75em",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          others
        </Typography>
        <List>
          {["Contact us"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  p: 0,
                  mb: 0.7,
                  pl: 0.7,
                  position: "relative",
                  transition: "transform 0.3s",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "75%",
                    height: 2,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
