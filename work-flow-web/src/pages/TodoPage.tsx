import Header from "../components/Header";
import TodoCreate from "../components/Todo/TodoCreate";
import TodoList from "../components/Todo/TodoList";

// material ui
import Box from "@mui/material/Box";

function TodoPage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          px: 15,
          py: 15,
        }}
      >
        <TodoCreate />
        <TodoList />
      </Box>
    </>
  );
}

export default TodoPage;
