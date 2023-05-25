import Box from "@mui/material/Box";
import Header from "../components/Header";
import CardMedia from "@mui/material/CardMedia";
import testImage from "../assets/svg/work_together_re_dark.svg";
import Button from "@mui/material/Button";

function TeamPage() {
  return (
    <>
      <Header />
      <Box
        component="section"
        sx={{
          p: 3,
          backgroundImage:
            "linear-gradient(90deg, #CEDFFF 0%, #D7FFEF 35%, #D4F7FF 80%)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ border: (theme) => `1px dotted ${theme.palette.primary.main}` }}
        >
          <CardMedia
            component="img"
            src={testImage}
            sx={{
              height: "auto",
              width: 400,
            }}
          />

          <Button type="submit" variant="contained" color="primary">
            create team
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default TeamPage;
