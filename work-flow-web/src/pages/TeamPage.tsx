import Box from "@mui/material/Box";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import useFetch from "../hooks/useFetch";
import { IUser } from "../interfaces";
import ListTeam from "../components/ListTeam";

function TeamPage() {
  const [{ currentUser }] = useFetch<IUser>();

  return (
    <>
      <Header />
      <Box
        component="section"
        sx={{
          backgroundImage:
            "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          px: 15,
          py: 15,
        }}
      >
        <div style={{ marginBottom: "1em", alignSelf: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            create team
          </Button>
        </div>
        <ListTeam userId={currentUser?.userId} />
      </Box>
    </>
  );
}

export default TeamPage;
