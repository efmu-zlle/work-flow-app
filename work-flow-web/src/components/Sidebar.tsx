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
          mt: 8,
          px: 4,
          border: "none",
          backgroundColor: (theme) => `${theme.palette.primary.dark}`,
          color: (theme) => `${theme.palette.primary.light}`,
        },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          {["General"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => `${theme.palette.primary.main}`,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                  }}
                >
                  {index % 2 === 0 ? <SettingsIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List>
          {["Teams", "Members"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                  }}
                >
                  {index % 2 === 0 ? <WorkspacesIcon /> : <GroupsIcon />}
                </ListItemIcon>
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
