import Box from "@mui/material/Box";
import { useState } from "react";
import Header from "../components/Header";
import TeamFormModal from "../components/Team/TeamFormModal";
import TeamList from "../components/Team/TeamList";

function TeamPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        <TeamList anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Box>

      <TeamFormModal setAnchorEl={setAnchorEl} />
    </>
  );
}

export default TeamPage;
