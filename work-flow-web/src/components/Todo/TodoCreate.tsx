// material ui
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useCreateTodoMutation } from "../../services/todoService";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "../../interfaces/todo";
import { enqueueSnackbar } from "notistack";
// icons
import SendIcon from "@mui/icons-material/Send";
import { isRequiredError } from "../../utils/helpers";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { setTodoError } from "../../store/slices/todoErrorSlice";

function TodoCreate() {
  const { teamId } = useParams<{ teamId: string }>();
  const [createTodo, { isLoading: isLoadingCreate, isError: isErrorCreate }] =
    useCreateTodoMutation();
  const [todo, setTodo] = useState<ITodo>({
    title: "",
    isCompleted: false,
    teamId: teamId!,
  });

  const { todoError } = useAppSelector((state) => state.todoErrorSlice);
  const dispatch = useAppDispatch();

  const getTitleError = () =>
    todoError.Title && todoError.Title[0] ? todoError.Title[0] : "";

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
      .then((res) => {
        setTodo({ ...todo, title: "" });
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((error) => {
        if (isRequiredError(error)) {
          const { Title } = error.data.errors;
          dispatch(setTodoError({ Title }));

          enqueueSnackbar(error.data.title, { variant: "error" });
        }
      });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ py: "1em", px: "2em" }}
    >
      <Grid container spacing={1}>
        <Grid item alignItems="center" xs={8}>
          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            placeholder="title"
            label="title"
            name="title"
            value={todo.title}
            helperText={getTitleError()}
            error={isErrorCreate}
            onChange={handleInputChange}
            disabled={isLoadingCreate}
            size="small"
          />
        </Grid>
        <Grid item alignItems="center" xs={4}>
          <IconButton
            type="submit"
            aria-label="submit"
            size="small"
            sx={{
              width: "100%",
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
