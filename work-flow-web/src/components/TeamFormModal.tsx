import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces/user";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { ITeam } from "../interfaces/team";
import {
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../store/api/teamSlice";
import { isRequiredError } from "../utils/helpers";
import { enqueueSnackbar } from "notistack";
import { ITeamError } from "../interfaces/error";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeModal, onChangeTeam } from "../store/slices/modalTeamSlice";
import { IResponseAPI } from "../interfaces";

interface Props {
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}

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

function TeamFormModal({ setAnchorEl }: Props) {
  const [{ userId, username }, _] = useLocalStorage<IUser>("currentUser", null);
  const [updateTeam, { isLoading: isUpdateLoading }] = useUpdateTeamMutation();
  const [createTeam, { isLoading: isCreateLoading, isError }] =
    useCreateTeamMutation();
  const dispatch = useDispatch();
  const { open, team, isEdit } = useSelector(
    (state: RootState) => state.modalTeamSlice
  );
  const [teamError, onChangeTeamError] = useState<ITeamError>({
    Name: {},
  });

  const getNameError = () =>
    teamError.Name && teamError.Name[0] ? teamError.Name[0] : "";

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch(onChangeTeam({ name, value, userId }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      let response: IResponseAPI<ITeam>;
      if (isEdit) {
        // sending the entire team with the teamId in it
        response = await updateTeam(team).unwrap();
        setAnchorEl(null);
      } else {
        response = await createTeam(team).unwrap();
      }

      dispatch(closeModal());
      enqueueSnackbar(response!.message, {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (error) {
      if (isRequiredError(error)) {
        const { Name } = error.data.errors;
        onChangeTeamError({ Name });
        enqueueSnackbar(error.data.title, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        dispatch(closeModal());
        setAnchorEl(null);
      }}
    >
      <Box
        sx={style}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="h6">Welcome, {username}</Typography>
          <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
            {isEdit ? "update a " : "create a new"} team
          </Typography>
        </Box>
        <TextField
          autoFocus
          fullWidth
          label="name"
          placeholder="name"
          variant="filled"
          name="name"
          value={team.name}
          error={isError}
          helperText={getNameError()}
          sx={{ mt: "1em", mb: "1em" }}
          onChange={handleInputChange}
          disabled={isCreateLoading || isUpdateLoading}
        />
        <TextField
          fullWidth
          variant="filled"
          label="description"
          placeholder="description"
          name="description"
          value={team.description}
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
  );
}

export default TeamFormModal;
