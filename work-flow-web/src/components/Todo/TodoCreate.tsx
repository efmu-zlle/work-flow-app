// material ui
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { todoService, useCreateTodoMutation } from "../../services/todoService";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "../../interfaces/todo";
import { enqueueSnackbar } from "notistack";
// icons
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch } from "../../hooks/useStore";

function TodoCreate() {
  const { teamId } = useParams<{ teamId: string }>();
  const [createTodo, { isLoading: isLoadingCreate }] = useCreateTodoMutation();
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<ITodo>({
    title: "",
    isCompleted: false,
    teamId: teamId!,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTodo(todo)
      .unwrap()
      .then((res) => enqueueSnackbar(res.message, { variant: "success" }))
      .catch((error) => console.log(error));
    // error here too
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        <Grid item xs={6} sm={10}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="title"
            label="title"
            name="title"
            onChange={handleInputChange}
            disabled={isLoadingCreate}
            size="small"
          />
        </Grid>

        <Grid item xs={6} sm={2}>
          <IconButton
            type="submit"
            aria-label="submit"
            size="small"
            sx={{
              ml: 1,
              px: 3,
              py: 1,
              borderRadius: ".25em",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            }}
          >
            {isLoadingCreate ? (
              <CircularProgress size={24} />
            ) : (
              <SendIcon
                sx={{ color: "black", "&:hover": { color: "white" } }}
              />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TodoCreate;
