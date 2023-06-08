// react
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
// redux
import {
  closeModal,
  onChangeTeam,
  resetEdit,
  setTeamError,
} from "../../store/slices/teamModalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
//interfaces
import { IResponseAPI } from "../../interfaces";
import { ITeam } from "../../interfaces/team";
import { IUser } from "../../interfaces/user";
import { isRequiredError } from "../../utils/helpers";
import useLocalStorage from "../../hooks/useLocalStorage";
// material ui
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { enqueueSnackbar } from "notistack";
import {
  teamService,
  useCreateTeamMutation,
  useUpdateTeamMutation,
} from "../../services/teamService";

type Props = {
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
};

const MAX_WORD_COUNT = 10;

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
  const { open, isEdit, currentTeam, teamError } = useAppSelector(
    (state) => state.teamModalSlice
  );
  const dispatch = useAppDispatch();

  const [{ userId, username }, _] = useLocalStorage<IUser>("currentUser", null);
  const [createTeam, { isLoading: isCreateLoading, isError: isErrorCreate }] =
    useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdateLoading, isError: isErrorUpdate }] =
    useUpdateTeamMutation();

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

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(resetEdit());
    dispatch(teamService.util.resetApiState());
    setAnchorEl(null);
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
              onClick={handleClose}
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
