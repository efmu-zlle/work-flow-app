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

function TodoList() {
  const { teamId } = useParams<{ teamId: string }>();
  const { data, isLoading: isLoadingTodos } = useGetTodosByTeamIdQuery(teamId!);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const [todoList, setTodoList] = useState<ITodo | undefined>(undefined);

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

    setTodoList(patchCollection.patches[0].value);
  };

  const handleUpdate = () => {
    console.log("handleUpdate");
    if (todoList) {
      updateTodo(todoList)
        .unwrap()
        .then((res) => {
          enqueueSnackbar(res.message, {
            variant: "success",
            autoHideDuration: 1000,
          });
          setTodoList(undefined);
        })
        .catch((err) => console.error(err));
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
    <div>
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
          <Button type="button" onClick={() => handleDelete(todo)}>
            delete
          </Button>
        </ListItem>
      ))}
    </div>
  );
}

export default TodoList;
