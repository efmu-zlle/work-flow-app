import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces/user";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";
import { ITeam } from "../interfaces/team";
import { useCreateTeamMutation } from "../store/api/teamSlice";
import { isRequiredError } from "../services/helpers";
import { enqueueSnackbar } from "notistack";
import { ITeamError } from "../interfaces/error";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

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

function ListTeamModal({ open, setOpen }: Props) {
  const [{ userId, username }, _] = useLocalStorage<IUser>("currentUser", null);
  const [createTeam, { isLoading, isError }] = useCreateTeamMutation();
  const [team, setTeam] = useState<ITeam>({
    name: "",
    description: "",
    creatorId: "",
  });

  const [teamError, setTeamError] = useState<ITeamError>({
    Name: {},
  });

  const getNameError = () =>
    teamError.Name && teamError.Name[0] ? teamError.Name[0] : "";

  const handleClose = () => {
    setTeamError({ Name: {} });
    setTeam({ name: "", description: "", creatorId: "" });
    setOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTeam((prevTeam) => ({ ...prevTeam, [name]: value, creatorId: userId! }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await createTeam(team).unwrap();
      setOpen(false);

      enqueueSnackbar(response.message, {
        variant: "success",
        autoHideDuration: 1000,
      });
    } catch (error) {
      if (isRequiredError(error)) {
        const { Name } = error.data.errors;
        setTeamError({ Name });

        enqueueSnackbar(error.data.title, {
          variant: "error",
          autoHideDuration: 1000,
        });
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
            create a new team
          </Typography>
        </Box>
        <TextField
          autoFocus
          fullWidth
          label="name"
          placeholder="name"
          variant="filled"
          name="name"
          error={isError}
          helperText={getNameError()}
          sx={{ mt: "1em", mb: "1em" }}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <TextField
          fullWidth
          variant="filled"
          label="description"
          placeholder="description"
          name="description"
          multiline
          rows={4}
          sx={{ mt: "1em", mb: "1em" }}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <Grid container spacing={2} sx={{ mt: ".50em" }}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "create team"}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={handleClose}
              disabled={isLoading}
            >
              cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ListTeamModal;
