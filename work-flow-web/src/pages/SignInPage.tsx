import { ChangeEvent, FormEvent, useState } from "react";
import { EndPoints, IUser } from "../interfaces";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/bg-hero.png";
import logo from "../assets/svg/logo.svg";
import CustomButton from "../components/CustomButton";
import CustomDivider from "../components/CustomDivider";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () =>
    setShowPassword((prevToggle) => !prevToggle);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    // const { name, value } = e.target;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* first item of the container */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        sx={{
          backgroundImage: "linear-gradient(68deg, #CEDFFF, #D7FFEF, #D4F7FF)",
        }}
      >
        {/* container of the form  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 4,
            px: 4.25,
          }}
        >
          <CardMedia
            component="img"
            image={logo}
            alt="logo"
            sx={{ height: "0", width: "80px", mb: 15 }}
          ></CardMedia>
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bolder", mb: 0.5 }}
          >
            Welcome back,
          </Typography>
          <Typography variant="body2">Please enter your details</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your username"
                  label="username"
                  name="username"
                  // value={data?.username || ""}
                  // onChange={handleInputChange}
                  // disabled={isLoading}
                  // error={isError}
                  // helperText={
                  //   isError && Array.isArray(errors?.Username)
                  //     ? errors?.Username[0]
                  //     : ""
                  // }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  label="password"
                  name="password"
                  // value={data?.password || ""}
                  // onChange={handleInputChange}
                  // disabled={isLoading}
                  // error={isError}
                  // helperText={
                  //   isError && Array.isArray(errors?.Password)
                  //     ? errors?.Password[0]
                  //     : ""
                  // }
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {/* <CustomButton isLink={false} isLoading={isLoading} text={"login"} /> */}
            <CustomDivider />
            <Link to="/sign-up">
              {/* <CustomButton
                isLink={true}
                isLoading={isLoading}
                text={"sign up"}
              /> */}
            </Link>
          </Box>
        </Box>
      </Grid>

      {/* second grid item */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        lg={8}
        sx={{
          backgroundImage: `url(${hero})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
}

export default SignInPage;
