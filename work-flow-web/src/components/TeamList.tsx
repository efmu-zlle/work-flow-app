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
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { ITeam } from "../interfaces/team";
import { openModal } from "../store/slices/modalTeamSlice";
import TeamFormModal from "./TeamFormModal";

function TeamList() {
  const dispatch = useDispatch();
  const [{ userId }, _] = useLocalStorage<IUser>("currentUser", null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteTeam] = useDeleteTeamMutation();
  const open = Boolean(anchorEl);
  const [currentTeam, setCurrentTeam] = useState<ITeam>({
    teamId: "",
    name: "",
    description: "",
    creatorId: "",
  });

  const { data: teams, isFetching } = useGetTeamsQuery(userId!, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const handleClickAnchor = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleDeleteTeam = async (): Promise<void> => {
    try {
      const response = await deleteTeam(currentTeam.teamId!).unwrap();
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
      <TeamFormModal setAnchorEl={setAnchorEl} />

      <div style={{ marginBottom: "1em", alignSelf: "flex-end" }}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.primary.main,
            },
          }}
          onClick={() =>
            dispatch(
              openModal({
                teamId: "",
                name: "",
                description: "",
                creatorId: "",
              })
            )
          }
        >
          create team
        </Button>
      </div>

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
                      setCurrentTeam({
                        teamId: team.teamId,
                        name: team.name,
                        description: team.description,
                        creatorId: team.creatorId,
                      });
                      handleClickAnchor(e);
                    }}
                  >
                    <MoreVertIcon color="primary" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseAnchor}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => dispatch(openModal(currentTeam))}>
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

export default TeamList;
