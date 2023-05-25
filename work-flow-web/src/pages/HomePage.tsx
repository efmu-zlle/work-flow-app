import Box from "@mui/material/Box";
import Header from "../components/Header";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import useFetch from "../hooks/useFetch";
import { EndPoints } from "../interfaces";

function HomePage() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundImage:
            "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
          height: "100vh",
        }}
      >
        <Box
          component="section"
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            mt: "4em",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              mb: "6em",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              Design your dreams,
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              one line at a time.
            </Typography>
          </Box>
          <CardMedia
            component="img"
            src="src/assets/svg/festivities_dark.svg"
            sx={{
              height: "auto",
              width: 400,
              alignSelf: "center",
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
