import Grid from "@mui/material/Grid";
import { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import teamwork from "../assets/svg/teamwork_dark.svg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CardHeader from "@mui/material/CardHeader";
import {
  useDeleteTeamMutation,
  useGetTeamsQuery,
} from "../store/api/teamSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces/user";
import { enqueueSnackbar } from "notistack";

function ListTeam() {
  const [{ userId }, _] = useLocalStorage<IUser>("currentUser", null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteTeam] = useDeleteTeamMutation();
  const [id, setId] = useState("");
  const open = Boolean(anchorEl);
  const { data: teams, isFetching } = useGetTeamsQuery(userId!, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleEditTeam = async (): Promise<void> => {
    console.log(id);
  };

  const handleDeleteTeam = async (): Promise<void> => {
    try {
      const response = await deleteTeam(id).unwrap();
      setAnchorEl(null);

      enqueueSnackbar(response.message, {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {teams?.payload && teams.payload.length !== 0 ? (
        <Grid container spacing={2} sx={{ width: "100%", maxHeight: "100%" }}>
          {teams.payload.map((team) => (
            <Grid item key={team.teamId} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <CardHeader
                    title={team.name}
                    titleTypographyProps={{
                      fontSize: "1.15em",
                      fontWeight: 800,
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <TaskOutlinedIcon fontSize="small" sx={{ mr: ".25em" }} />
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                      sx={{ mr: ".25em" }}
                    ></Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      tasks
                    </Typography>
                  </CardContent>
                </Box>
                <CardActions sx={{ flexGrow: 0, alignItems: "flex-start" }}>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      handleClick(e), setId(team.teamId!);
                    }}
                  >
                    <MoreVertIcon color="primary" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleEditTeam}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" sx={{ color: "green" }} />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeleteTeam}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" sx={{ color: "red" }} />
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            border: (theme) => `1px dotted ${theme.palette.primary.main}`,
            borderRadius: ".50em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            src={teamwork}
            sx={{
              height: "auto",
              width: 400,
            }}
          />

          <div style={{ fontStyle: "italic", marginTop: "5em" }}>
            <Typography
              component="span"
              sx={{ display: "block", textAlign: "center", fontWeight: 700 }}
            >
              You don&apos;t have a team yet
            </Typography>
            <Typography component="span">
              Create one, and be part of our community
            </Typography>
          </div>
        </Box>
      )}
    </>
  );
}

export default ListTeam;
