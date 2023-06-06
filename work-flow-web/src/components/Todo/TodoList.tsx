import { useParams } from "react-router-dom";
import {
  todoService,
  useDeleteTodoMutation,
  useGetTodosByTeamIdQuery,
  useUpdateTodoMutation,
} from "../../services/todoService";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { ITodo } from "../../interfaces/todo";
import { useAppDispatch } from "../../hooks/useStore";
import TextField from "@mui/material/TextField";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoList() {
  const { teamId } = useParams<{ teamId: string }>();
  const { data, isLoading: isLoadingTodos } = useGetTodosByTeamIdQuery(teamId!);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const [todoUpdate, setTodoUpdate] = useState<ITodo | undefined>(undefined);

  const handleInputChange = (value: string, todo: ITodo) => {
    const updateTitle = data?.payload.map((t) =>
      t.todoId === todo.todoId ? { ...t, title: value } : t
    );

    const patchCollection = dispatch(
      todoService.util.updateQueryData(
        "getTodosByTeamId",
        todo.teamId!,
        (draft) => {
          Object.assign(draft.payload, updateTitle);
        }
      )
    );

    setTodoUpdate(patchCollection.patches[0].value);
  };

  const handleUpdate = () => {
    if (todoUpdate) {
      updateTodo(todoUpdate)
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, {
            variant: "success",
            autoHideDuration: 1000,
          });
          setTodoUpdate(undefined);
        })
        .catch((error) => console.error(error));
      //here handle the other error
    }
  };

  const handleToggle = (todo: ITodo) => {
    const updateIsCompleted = data?.payload.map((t) =>
      t.todoId === todo.todoId ? { ...t, isCompleted: !todo.isCompleted } : t
    );

    const patchCollection = dispatch(
      todoService.util.updateQueryData(
        "getTodosByTeamId",
        todo.teamId!,
        (draft) => {
          Object.assign(draft.payload, updateIsCompleted);
        }
      )
    );

    updateTodo(patchCollection.patches[0].value).unwrap();
  };

  const handleDelete = useCallback(
    (todo: ITodo) =>
      deleteTodo(todo)
        .unwrap()
        .then((res) => enqueueSnackbar(res.message, { variant: "success" })),
    [deleteTodo]
  );

  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data?.payload.map((todo) => (
        <ListItem key={todo.todoId}>
          <Checkbox
            onClick={() => handleToggle(todo)}
            checked={todo.isCompleted}
            color="success"
          />
          <TextField
            fullWidth
            name="title"
            variant="standard"
            value={todo.title}
            onBlur={handleUpdate}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e.target.value, todo)
            }
          />
          <IconButton type="button" onClick={() => handleDelete(todo)}>
            <DeleteIcon color="error" />
          </IconButton>
        </ListItem>
      ))}
    </>
  );
}

export default TodoList;
