import { json, useParams } from "react-router-dom";
import {
  todoService,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} from "../../services/todoService";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useCallback } from "react";
import Button from "@mui/material/Button";
import { enqueueSnackbar } from "notistack";
import { ITodo } from "../../interfaces/todo";
import { useAppDispatch } from "../../hooks/useStore";
import { IResponseAPI } from "../../interfaces";
import TextField from "@mui/material/TextField";
import useLocalStorage from "../../hooks/useLocalStorage";

function TodoList() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: isLoadingTodos } = useGetTodoByIdQuery(id!);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  // const onToggle = useCallback(
  //   (todo: ITodo) =>
  //     dispatch(
  //       todoService.util.upsertQueryData("getTodoById", todo.teamId!, {
  //         payload: [{ ...todo, isCompleted: !todo.isCompleted }],
  //       })
  //     )
  //       .unwrap()
  //       .then((res) => res as IResponseAPI<ITodo>)
  //       .then((data) => updateTodo(data.payload[0]!)),
  //   [updateTodo]
  // );

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

  const handleOnChange = (todo: ITodo) => {
    dispatch(
      todoService.util.upsertQueryData("getTodoById", todo.teamId, {
        payload: [{ ...todo, isCompleted: !todo.isCompleted }],
      })
    )
      .unwrap()
      .then((res) => res.payload as ITodo[])
      .then((data) => updateTodo(data[0]));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    todo: ITodo
  ) => {
    dispatch(
      todoService.util.upsertQueryData("getTodoById", todo.teamId, {
        payload: [{ ...todo, title: event.target.value }],
      })
    )
      .unwrap()
      .then((res) => res.payload as ITodo[])
      .then((data) => updateTodo(data[0]));
  };

  return (
    <div>
      {data?.payload ? (
        <>
          {data.payload.map((todo) => (
            <span key={todo.todoId}>
              <Checkbox
                checked={todo.isCompleted}
                onChange={() => handleOnChange(todo)}
                color="success"
              />
              <TextField
                name="title"
                value={todo.title}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, todo)
                }
              />
              <Button type="button" onClick={() => onDelete(todo)}>
                delete
              </Button>
            </span>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TodoList;
