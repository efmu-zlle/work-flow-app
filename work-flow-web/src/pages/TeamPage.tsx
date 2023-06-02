import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces/user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import { ITeam } from "../interfaces/team";
import Button from "@mui/material/Button";
import {
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamsQuery,
  useUpdateTeamMutation,
} from "../store/api/teamSlice";
import Modal from "@mui/material/Modal";
import { IResponseAPI } from "../interfaces";
import { enqueueSnackbar } from "notistack";
import { isRequiredError } from "../utils/helpers";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  closeModal,
  onChangeTeam,
  openModal,
  resetEdit,
  setCurrentTeam,
  setTeamError,
} from "../store/slices/teamModalSlice";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import teamwork from "../assets/svg/teamwork_dark.svg";

//icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListIcon from "@mui/icons-material/List";
import CardMedia from "@mui/material/CardMedia";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  backgroundImage: "linear-gradient(68deg, #CEDFFF, #D7FFEF, #D4F7FF)",
  borderRadius: ".25em",
};

const MAX_WORD_COUNT = 10;

function TeamPage() {
  const { open, isEdit, currentTeam, teamError } = useSelector(
    (state: RootState) => state.teamModalSlice
  );
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);
  const navigate = useNavigate();
  const [{ userId, username }, _] = useLocalStorage<IUser>("currentUser", null);

  const { data } = useGetTeamsQuery(userId!);
  const [createTeam, { isLoading: isCreateLoading, isError: isErrorCreate }] =
    useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdateLoading, isError: isErrorUpdate }] =
    useUpdateTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const getNameError = () =>
    teamError.Name && teamError.Name[0] ? teamError.Name[0] : "";

  const handleClickAnchor = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(onChangeTeam({ name, value, userId }));
  };

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      let response: IResponseAPI<ITeam>;
      if (isEdit) {
        // sending the entire team with the teamId in it
        response = await updateTeam(currentTeam).unwrap();
        setAnchorEl(null);
      } else {
        response = await createTeam(currentTeam).unwrap();
      }

      dispatch(closeModal());
      dispatch(resetEdit());
      enqueueSnackbar(response!.message, { variant: "success" });
    } catch (error) {
      if (isRequiredError(error)) {
        const { Name } = error.data.errors;
        dispatch(setTeamError({ Name }));
        enqueueSnackbar(error.data.title, { variant: "error" });
      }
    }
  };

  return (
    <>
      <Header />
      <Box
        component="section"
        sx={{
          backgroundImage:
            "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          px: 15,
          py: 15,
        }}
      >
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
        {data?.payload && data.payload.length !== 0 ? (
          <Grid container spacing={2} sx={{ width: "100%", maxHeight: "100%" }}>
            {data.payload.map((team) => (
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
                      <TaskAltIcon fontSize="small" sx={{ mr: ".25em" }} />
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
                      <MenuItem onClick={() => navigate("task")}>
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
      </Box>

      <Modal
        open={open}
        onClose={() => {
          dispatch(closeModal());
          dispatch(resetEdit());
          setAnchorEl(null);
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={style}
          noValidate
          autoComplete="off"
        >
          <Box>
            <Typography variant="h6">Welcome, {username}</Typography>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {isEdit ? "update a " : "create a new"} team
            </Typography>
          </Box>
          <TextField
            fullWidth
            label="name"
            placeholder="name"
            variant="filled"
            name="name"
            value={currentTeam.name}
            error={isErrorCreate || isErrorUpdate}
            helperText={getNameError()}
            sx={{ mt: "1em", mb: "1em" }}
            onChange={handleInputChange}
            disabled={isCreateLoading || isUpdateLoading}
            required
            inputProps={{ maxLength: MAX_WORD_COUNT }}
            InputProps={{
              endAdornment: (
                <div>
                  {currentTeam.name.length}/{MAX_WORD_COUNT}
                </div>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="description"
            placeholder="description"
            name="description"
            value={currentTeam.description}
            multiline
            rows={4}
            sx={{ mt: "1em", mb: "1em" }}
            onChange={handleInputChange}
            disabled={isCreateLoading || isUpdateLoading}
          />

          <Grid container spacing={2} sx={{ mt: ".50em" }}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isCreateLoading || isUpdateLoading}
              >
                {isCreateLoading || isUpdateLoading ? (
                  <CircularProgress size={24} />
                ) : isEdit ? (
                  "update team"
                ) : (
                  "create team"
                )}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => {
                  dispatch(closeModal());
                  dispatch(resetEdit());
                  setAnchorEl(null);
                }}
                disabled={isCreateLoading || isUpdateLoading}
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default TeamPage;
