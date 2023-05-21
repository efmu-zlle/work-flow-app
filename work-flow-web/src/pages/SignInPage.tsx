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
import { ChangeEvent, FormEvent, useState } from "react";
import { EndPoints, IUser } from "../interfaces";

function SignInPage() {
  const [{ isLoading }, setConfig] = useFetch();
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    console.log(user);
    setConfig({ method: "POST", url: `${EndPoints.signin}`, body: user });
  };

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
                />
              </Grid>
            </Grid>
            <CustomButton text={"login"} />
            <CustomDivider />
            <CustomButton text={"create account"} />
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

export default SignInPage;
