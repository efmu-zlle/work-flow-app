import Button from "@mui/material/Button";

interface ButtonProps {
  text: string;
}

function CustomButton({ text }: ButtonProps) {
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
    >
      {text}
    </Button>
  );
}

export default CustomButton;
