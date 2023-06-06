import Card from "@mui/material/Card";
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
          px: 4,
          py: 15,
          backgroundImage:
            "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundImage:
              "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
            py: 4,
            px: 6,
          }}
        >
          <TodoCreate />
          <TodoList />
        </Card>
      </Box>
    </>
  );
}

export default TodoPage;
