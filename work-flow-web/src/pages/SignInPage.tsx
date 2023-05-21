import { ChangeEvent, FormEvent, useState } from "react";
import { EndPoints, IUser } from "../interfaces";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/bg-hero.png";
import logo from "../assets/images/logo.svg";
import CustomButton from "../components/CustomButton";
import CustomDivider from "../components/CustomDivider";
import useFetch from "../hooks/useFetch";
import Alert from "@mui/material/Alert";

function SignInPage() {
  const [
    { isLoading, showAlert, isSuccess, messageSuccess, messageError },
    setConfig,
  ] = useFetch();

  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setConfig({ method: "POST", url: `${EndPoints.signin}`, body: user });
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
        sx={{ backgroundColor: "#EBE5D9" }}
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your username"
                  label="username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  disabled={isLoading ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your password"
                  label="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  disabled={isLoading ? true : false}
                />
              </Grid>
            </Grid>
            <CustomButton isLink={false} isLoading={isLoading} text={"login"} />
            <CustomDivider />
            <Link to="/sign-up">
              <CustomButton
                isLink={true}
                isLoading={isLoading}
                text={"sing up"}
              />
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
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {showAlert && isSuccess && (
          <Alert
            sx={{ position: "absolute", top: "5%", left: "80%" }}
            severity="success"
            variant="filled"
          >
            {messageSuccess}
          </Alert>
        )}

        {showAlert && !isSuccess && (
          <Alert
            sx={{ position: "absolute", top: "5%", left: "80%" }}
            severity="error"
            variant="filled"
          >
            {messageError}
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default SignInPage;
