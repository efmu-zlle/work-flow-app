import Box from "@mui/material/Box";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

function HomePage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          color: (theme) => `${theme.palette.primary.light}`,
        }}
      >
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "rgb(213,228,255)",
            backgroundImage:
              "linear-gradient(90deg, rgba(206,223,255,1) 0%, rgba(215,255,239,1) 35%, rgba(212,247,255,1) 80%)",
          }}
        >
          <Toolbar />
          <Box
            sx={{
              maxWidth: "100%",
              maxHeight: 400,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <CardMedia
              component="img"
              src="src/assets/svg/welcoming_re.svg"
              sx={{ height: 500, width: "auto" }}
            />
          </Box>

          {/* <Box sx={{ maxWidth: "100%", maxHeight: 300 }}>
            <CardMedia
              component="img"
              src="src/assets/svg/welcoming_re.svg"
              sx={{ height: 550, width: "100%", objectFit: "contain" }}
            />
          </Box> */}
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
