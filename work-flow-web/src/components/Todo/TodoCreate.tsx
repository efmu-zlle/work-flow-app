// material ui
import { CircularProgress, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCreateTodoMutation } from "../../services/todoService";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "../../interfaces/todo";
import { enqueueSnackbar } from "notistack";
// icons
import SendIcon from "@mui/icons-material/Send";

function TodoCreate() {
  const { teamId } = useParams<{ teamId: string }>();
  const [createTodo, { isLoading: isLoadingCreate }] = useCreateTodoMutation();
  const [todo, setTodo] = useState<ITodo>({
    title: "",
    isCompleted: false,
    teamId: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTodo((prevTodo) => ({
      ...prevTodo,
      teamId: teamId!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await createTodo(todo).unwrap();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ width: "100%" }}
      onSubmit={handleSubmit}
    >
      <TextField
        autoFocus
        fullWidth
        placeholder="title"
        variant="standard"
        name="title"
        onChange={handleInputChange}
        disabled={isLoadingCreate}
      />

      <IconButton type="submit" aria-label="submit" size="large" sx={{ ml: 1 }}>
        {isLoadingCreate ? (
          <CircularProgress size={24} />
        ) : (
          <SendIcon sx={{ color: "blue" }} />
        )}
      </IconButton>
    </Box>
  );
}

export default TodoCreate;
