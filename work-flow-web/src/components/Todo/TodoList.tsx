import { useParams } from "react-router-dom";
import { useGetTodoByIdQuery } from "../../store/api/todoSlice";

function TodoList() {
  const { id } = useParams<{ id: string }>();
  const { data: todos, isFetching: isLoadingTodos } = useGetTodoByIdQuery(id!);

  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {todos?.payload?.map((todos) => (
        <span key={todos.todoId}>
          <span>{todos.title}</span>{" "}
          <span>{todos.isCompleted ? "true" : "false"}</span>
        </span>
      ))}
    </div>
  );
}

export default TodoList;
