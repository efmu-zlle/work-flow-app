import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/bg-hero.png";
import logo from "../assets/svg/logo.svg";
import CustomButton from "../components/CustomButton";
import CustomDivider from "../components/CustomDivider";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IUser } from "../interfaces/user";
import { useSignUpMutation } from "../store/api/authSlice";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    password: "",
  });

  const handleTogglePassword = () =>
    setShowPassword((prevToggle) => !prevToggle);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await signUp(user).unwrap();
      console.log("has succeded", response);
    } catch (error) {
      console.error("request failed", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bolder" }}>
            Create an account
          </Typography>
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
                  fullWidth
                  autoFocus
                  variant="outlined"
                  type="email"
                  placeholder="Enter your email address"
                  label="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  // error={isError}
                  disabled={isLoading}
                  // helperText={
                  //   isError && Array.isArray(errors?.Email)
                  //     ? errors?.Email[0]
                  //     : ""
                  // }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your username"
                  label="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  error={isError}
                  // helperText={
                  //   isError && Array.isArray(errors?.Username)
                  //     ? errors?.Username
                  //     : ""
                  // }
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  label="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  error={isError}
                  // helperText={
                  //   isError && Array.isArray(errors?.Password)
                  //     ? errors?.Password
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
            <CustomButton
              isLink={false}
              isLoading={isLoading}
              text={"create account"}
            />
            <CustomDivider />
            <Link to="/">
              <CustomButton
                isLink={true}
                isLoading={isLoading}
                text={"sign in"}
              />
            </Link>
          </Box>
          <Typography variant="body2">
            Creating an account means you&apos;re okay with our{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "#0359AE" }}
            >
              Terms of Service
            </Typography>{" "}
            and{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "#0359AE" }}
            >
              Privacy Policy.
            </Typography>
          </Typography>
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
    </Grid>
  );
}

export default SignUpPage;
