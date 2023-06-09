import { useParams } from 'react-router-dom';
import {
  todoService,
  useDeleteTodoMutation,
  useGetTodosByTeamIdQuery,
  useUpdateTodoMutation,
} from '../../services/todoService';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, useCallback, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Todo } from '../../interfaces/todo';
import { useAppDispatch } from '../../hooks/useStore';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { isRequiredError } from '../../utils/helpers';
import { TodoError } from '../../interfaces/error';

type Props = {
  state: 'completed' | 'incompleted';
};

function TodoList({ state }: Props) {
  const { teamId } = useParams<{ teamId: string }>();
  const { data: todos, isLoading: isLoadingTodos } = useGetTodosByTeamIdQuery(
    teamId || ''
  );
  const [updateTodo, { isError: isErrorUpdate }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useAppDispatch();

  const [todoUpdate, setTodoUpdate] = useState<Todo | undefined>(undefined);
  const [todoError, setTodoError] = useState<TodoError>({
    Title: {},
  });

  const getTitleError = () =>
    todoError.Title && todoError.Title[0] ? todoError.Title[0] : '';

  const handleInputChange = (value: string, todo: Todo) => {
    const updateTitle = todos?.payload.map((t) =>
      t.todoId === todo.todoId ? { ...t, title: value } : t
    );

    const patchCollection = dispatch(
      todoService.util.updateQueryData(
        'getTodosByTeamId',
        todo.teamId || '',
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
            variant: 'success',
            autoHideDuration: 1000,
          });

          setTodoError({ Title: {} });
          setTodoUpdate(undefined);
        })
        .catch((error) => {
          if (isRequiredError(error)) {
            const { Title } = error.data.errors;
            setTodoError({ Title });

            enqueueSnackbar(error.data.title, { variant: 'error' });
          }
        });
    }
  };

  const handleToggle = (todo: Todo) => {
    const updateIsCompleted = todos?.payload.map((t) =>
      t.todoId === todo.todoId ? { ...t, isCompleted: !todo.isCompleted } : t
    );

    const patchCollection = dispatch(
      todoService.util.updateQueryData(
        'getTodosByTeamId',
        todo.teamId || '',
        (draft) => {
          Object.assign(draft.payload, updateIsCompleted);
        }
      )
    );

    updateTodo(patchCollection.patches[0].value);
  };

  const handleDelete = useCallback(
    (todo: Todo) =>
      deleteTodo(todo)
        .unwrap()
        .then((res) => enqueueSnackbar(res.message, { variant: 'success' })),
    [deleteTodo]
  );

  if (isLoadingTodos) {
    return <div>Loading...</div>;
  }

  return (
    <List>
      {todos?.payload
        .filter((todo) =>
          state === 'completed' ? todo.isCompleted : !todo.isCompleted
        )
        .map((todo) => {
          const labelId = `label-${todo.todoId}`;
          return (
            <ListItem
              key={labelId}
              secondaryAction={
                <IconButton type="button" onClick={() => handleDelete(todo)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }>
              <ListItemIcon>
                <Checkbox
                  onClick={() => handleToggle(todo)}
                  checked={todo.isCompleted}
                  color="success"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <TextField
                    fullWidth
                    name="title"
                    variant="standard"
                    value={todo.title}
                    onBlur={handleUpdate}
                    error={isErrorUpdate}
                    helperText={getTitleError()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e.target.value, todo)
                    }
                  />
                }
              />
            </ListItem>
          );
        })}
    </List>
  );
}

export default TodoList;
