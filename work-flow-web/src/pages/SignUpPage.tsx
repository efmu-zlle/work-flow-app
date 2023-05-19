import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import hero from "../assets/images/bg-hero.png";
import logo from "../assets/images/logo.svg";

function SignUpPage() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        sx={{ backgroundColor: "#EBE5D9" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100%",
            justifyContent: "center",
            px: 4.25,
          }}
        >
          <Grid container alignItems="flex-start">
            <Grid item>
              <CardMedia
                component="img"
                image={logo}
                alt="logo"
                sx={{ height: "0", width: "80px", mb: 3 }}
              ></CardMedia>
            </Grid>
          </Grid>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textTransform: "capitalize", fontWeight: "bolder" }}
          >
            create account
          </Typography>
          <Box component="form" sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email address"
                  label="email"
                  id="email"
                  name="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoFocus
                  variant="outlined"
                  placeholder="Enter your username"
                  label="username"
                  id="username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your password"
                  label="password"
                  id="password"
                  name="password"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mt: 3, mb: 2, textTransform: "capitalize" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={8}
        sx={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
}

export default SignUpPage;
