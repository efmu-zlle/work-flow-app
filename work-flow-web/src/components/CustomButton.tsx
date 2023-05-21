import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonProps {
  text: string;
  isLoading: boolean;
  isLink: boolean;
}

function CustomButton({ isLink, isLoading, text }: ButtonProps) {
  return (
    <Button
      fullWidth
      type="submit"
      variant="outlined"
      color="primary"
      sx={{
        mt: 3,
        mb: 2,
        textTransform: "capitalize",
        "&:hover": { backgroundColor: "#002233", color: "#EBE5D9" },
      }}
      disabled={isLoading}
    >
      {!isLink && isLoading ? <CircularProgress size={24} /> : text}
    </Button>
  );
}

export default CustomButton;
