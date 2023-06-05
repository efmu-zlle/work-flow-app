// material ui
import { Button, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useCreateTodoMutation } from "../../services/todoService";
import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITodo } from "../../interfaces/todo";

function TodoCreate() {
  const { id } = useParams<{ id: string }>();
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
      teamId: id!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await createTodo(todo).unwrap();
      console.log(response);
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
      />

      <Button type="submit" variant="contained">
        create todo
      </Button>
    </Box>
  );
}

export default TodoCreate;
