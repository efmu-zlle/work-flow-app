import { useParams } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../../store/api/todoSlice";
import Checkbox from "@mui/material/Checkbox";
import { useCallback } from "react";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { ITodo } from "../../interfaces/todo";

function TodoList() {
  const { id } = useParams<{ id: string }>();
  const { data: todos, isLoading: isLoadingTodos } = useGetTodoByIdQuery(id!);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const onToggle = useCallback(
    (todo: ITodo) => updateTodo({ ...todo, isCompleted: !todo.isCompleted }),
    [updateTodo]
  );

  const onDelete = useCallback(
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
      {todos?.payload?.map((todo) => (
        <span key={todo.todoId}>
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => onToggle(todo)}
            color="success"
            inputProps={{ "aria-label": "controlled" }}
          />
          <span>{todo.title}</span>
          <Button type="button" onClick={() => onDelete(todo)}>
            delete
          </Button>
        </span>
      ))}
    </div>
  );
}

export default TodoList;
