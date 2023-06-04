import { useParams } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
} from "../../store/api/todoSlice";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";

function TodoList() {
  const { id } = useParams<{ id: string }>();
  const { data: todos, isFetching: isLoadingTodos } = useGetTodoByIdQuery(id!);
  const [deleteTodo] = useDeleteTodoMutation();
  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

  // };

  const handleDelete = async (todoId: string) => {
    try {
      const response = await deleteTodo(todoId).unwrap();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {todos?.payload?.map((todo) => (
        <span key={todo.todoId}>
          <Checkbox
            checked={todo.isCompleted}
            // onChange={handleChange}
            color="success"
            inputProps={{ "aria-label": "controlled" }}
          />
          <span>{todo.title}</span>
          <Button type="button" onClick={() => handleDelete(todo.todoId!)}>
            delete
          </Button>
        </span>
      ))}
    </div>
  );
}

export default TodoList;
