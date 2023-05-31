import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import useLocalStorage from "../hooks/useLocalStorage";
import { IUser } from "../interfaces/user";

type Props = {
  open: boolean;
  handleClose: () => void;
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

function BasicModal({ open, handleClose }: Props) {
  const [{ userId, username }, _] = useLocalStorage<IUser>("currentUser", null);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
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
            sx={{ mt: "1em", mb: "1em" }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="description"
            placeholder="description"
            sx={{ mt: "1em", mb: "1em" }}
          />
          <Grid container spacing={2} sx={{ mt: ".50em" }}>
            <Grid item xs={12} sm={6}>
              <Button fullWidth type="submit" variant="contained">
                create team
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={handleClose}
              >
                cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
