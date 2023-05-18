import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function SignUpPage() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Container
        maxWidth="xs"
        sx={{ position: "absolute", top: "0", left: "50%" }}
      >
        <Box
          sx={{
            my: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            px: "1.85em",
            py: 5,
          }}
          component={Paper}
          elevation={4}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar> */}

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2.3}>
              <Grid item xs={12}>
                <InputLabel
                  sx={{
                    fontSize: ".80em",
                    fontWeight: "Bolder",
                    mb: ".25em",
                  }}
                  htmlFor="username"
                >
                  Username
                </InputLabel>
                <TextField
                  autoFocus
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  size="small"
                  placeholder="Enter your username"
                  id="username"
                  name="username"
                  sx={{
                    "& ::placeholder": {
                      fontSize: ".80em",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{
                    fontSize: ".80em",
                    fontWeight: "Bolder",
                    mb: ".25em",
                  }}
                  htmlFor="email"
                >
                  Email
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  size="small"
                  placeholder="Enter your email address"
                  id="email"
                  name="email"
                  sx={{
                    "& ::placeholder": {
                      fontSize: ".80em", // Customize the font size here
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  sx={{
                    fontSize: ".80em",
                    fontWeight: "Bolder",
                    mb: ".25em",
                  }}
                  htmlFor="password"
                >
                  Password
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  size="small"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& ::placeholder": {
                      fontSize: ".80em", // Customize the font size here
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mt: ".90em" }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUpPage;
