import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function CustomDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "1em 0",
        padding: "0 1.25em",
      }}
    >
      <Divider style={{ flex: 1, borderColor: "#002233" }} />
      <Typography
        variant="body1"
        style={{ margin: "0 2em", fontSize: ".80em" }}
      >
        Or
      </Typography>
      <Divider style={{ flex: 1, borderColor: "#002233" }} />
    </div>
  );
}

export default CustomDivider;
