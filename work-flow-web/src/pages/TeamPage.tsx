import Box from "@mui/material/Box";
import Header from "../components/Header";
import Button from "@mui/material/Button";
import ListTeam from "../components/ListTeam";
import BasicModal from "../components/BasicModal";
import { useState } from "react";

function TeamPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            type="button"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={handleOpen}
          >
            create team
          </Button>
        </div>
        <ListTeam />
      </Box>
      <BasicModal open={open} handleClose={handleClose} />
    </>
  );
}

export default TeamPage;
