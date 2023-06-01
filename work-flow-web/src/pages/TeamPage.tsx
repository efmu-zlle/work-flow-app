import Box from "@mui/material/Box";
import Header from "../components/Header";
import TeamList from "../components/TeamList";

function TeamPage() {
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
        <TeamList />
      </Box>
    </>
  );
}

export default TeamPage;
