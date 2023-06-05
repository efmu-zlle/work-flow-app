// material ui
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// react-dom
import { useNavigate } from "react-router-dom";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListIcon from "@mui/icons-material/List";
import CardMedia from "@mui/material/CardMedia";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// redux
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import {
  useDeleteTeamMutation,
  useGetTeamsQuery,
} from "../../services/teamService";
import {
  openModal,
  resetEdit,
  setCurrentTeam,
} from "../../store/slices/teamModalSlice";

import { MouseEvent, Dispatch, SetStateAction } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { IUser } from "../../interfaces/user";
import { enqueueSnackbar } from "notistack";
import teamwork from "../../assets/svg/teamwork_dark.svg";

type Props = {
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  anchorEl: HTMLElement | null;
};

function TeamList({ anchorEl, setAnchorEl }: Props) {
  const { currentTeam } = useAppSelector((state) => state.teamModalSlice);
  const dispatch = useAppDispatch();

  const openAnchor = Boolean(anchorEl);
  const navigate = useNavigate();
  const [{ userId }, _] = useLocalStorage<IUser>("currentUser", null);

  const { data: teams, isLoading } = useGetTeamsQuery(userId!);

  const [deleteTeam] = useDeleteTeamMutation();

  const handleClickAnchor = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleDeleteTeam = async (): Promise<void> => {
    try {
      const response = await deleteTeam(currentTeam.teamId).unwrap();

      setAnchorEl(null);
      dispatch(resetEdit());
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          onClick={() => dispatch(openModal())}
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
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                  }}
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
                    <TaskAltIcon
                      fontSize="small"
                      sx={{ mr: ".25em", color: "green" }}
                    />
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
                    aria-controls={openAnchor ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAnchor ? "true" : undefined}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                      dispatch(setCurrentTeam(team));
                      handleClickAnchor(e);
                    }}
                  >
                    <MoreVertIcon color="primary" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openAnchor}
                    onClose={() => {
                      dispatch(resetEdit());
                      setAnchorEl(null);
                    }}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => navigate(`todo/${currentTeam.teamId}`)}
                    >
                      <ListItemIcon>
                        <ListIcon fontSize="small" sx={{ color: "blue" }} />
                      </ListItemIcon>
                      Todo
                    </MenuItem>
                    <MenuItem onClick={() => dispatch(openModal())}>
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
