import Box from "@mui/material/Box";
import Header from "../components/Header";
import CardMedia from "@mui/material/CardMedia";
import teamwork from "../assets/svg/teamwork_dark.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { MouseEvent, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TeamPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const tiers = [
    {
      title: "Free",
      price: "0",
      description: [
        "10 users included",
        "2 GB of storage",
        "Help center access",
        "Email support",
      ],
      buttonText: "Sign up for free",
      buttonVariant: "outlined",
    },
    {
      title: "Pro",
      subheader: "Most popular",
      price: "15",
      description: [
        "20 users included",
        "10 GB of storage",
        "Help center access",
        "Priority email support",
      ],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
    {
      title: "Enterprise",
      price: "30",
      description: [
        "50 users included",
        "30 GB of storage",
        "Help center access",
        "Phone & email support",
      ],
      buttonText: "Contact us",
      buttonVariant: "outlined",
    },
    {
      title: "Test",
    },
    {
      title: "Test1",
    },
  ];

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
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.primary.main,
              },
            }}
          >
            create team
          </Button>
        </div>
        <Grid container spacing={2} sx={{ width: "100%", maxHeight: "100%" }}>
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: "flex",
                  backgroundColor: (theme) => theme.palette.secondary.main,
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <CardHeader
                    title={tier.title}
                    titleTypographyProps={{
                      fontSize: "1.15em",
                      fontWeight: 800,
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: "1 0 auto",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <TaskOutlinedIcon fontSize="small" sx={{ mr: ".25em" }} />
                    <Typography
                      component="span"
                      variant="subtitle2"
                      color="text.primary"
                      sx={{ mr: ".25em" }}
                    >
                      {tier.price}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="span"
                    >
                      tasks
                    </Typography>
                  </CardContent>
                </Box>
                <CardActions sx={{ flexGrow: 0, alignItems: "flex-start" }}>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <MoreVertIcon color="primary" />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Box
          sx={{
            border: (theme) => `1px dotted ${theme.palette.primary.main}`,
            borderRadius: ".50em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            src={teamwork}
            sx={{
              height: "auto",
              width: 400,
            }}
          />

          <div style={{ fontStyle: "italic", marginTop: "5em" }}>
            <Typography
              component="span"
              sx={{ display: "block", textAlign: "center", fontWeight: 700 }}
            >
              You don&apos;t have a team yet
            </Typography>
            <Typography component="span">
              Create one, and be part of our community
            </Typography>
          </div>
        </Box> */}
      </Box>
    </>
  );
}

export default TeamPage;
