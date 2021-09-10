import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

export function PrimaryButton(props) {
  const { message, onClick } = props;
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: "#1a73e8",
        color: "#ffffff",
        textTransform: "capitalize",
      }}
    >
      {message}
    </Button>
  );
}
