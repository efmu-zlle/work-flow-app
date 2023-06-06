import Card from "@mui/material/Card";
import Header from "../components/Header";
import TodoCreate from "../components/Todo/TodoCreate";
import TodoList from "../components/Todo/TodoList";

// material ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
            maxWidth: 1100,
            backgroundImage:
              "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
          }}
        >
          <TodoCreate />
          <Divider
            sx={{ borderColor: (theme) => theme.palette.primary.main }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography textAlign="center" variant="h6">
                  Incompleted
                </Typography>
                <TodoList state="incompleted" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography textAlign="center" variant="h6">
                  Completed
                </Typography>
                <TodoList state="completed" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default TodoPage;
