import { Grid, useTheme, makeStyles } from "@material-ui/core";
import { SvgIcons } from "../Common/SvgIcons";
const useStyles = makeStyles(theme => ({
  alignCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20vh",
  },
  labelCss: { marginTop: "20px", fontSize: "18px" },
}));
export function EmptyNotes(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      {props.sidebar === "Archive" && (
        <Grid className={classes.alignCenter}>
          <SvgIcons
            style={{
              height: 100,
              width: 100,
              color: theme.palette.secondary.dark,
            }}
            label="ARCHIVE"
          />
          <span className={classes.labelCss}>
            Your archived notes appear here
          </span>
        </Grid>
      )}
      {props.sidebar === "Trash" && (
        <Grid style={{ marginTop: "20px" }}>
          <i style={{ fontSize: "16px" }}>
            Notes in Trash are deleted after 7 days.
          </i>
          <div className={classes.alignCenter}>
            <SvgIcons
              style={{
                height: 100,
                width: 100,
                color: "darkgray",
              }}
              label="TRASH"
            />
            <span className={classes.labelCss}>No notes in Trash</span>
          </div>
        </Grid>
      )}
      {props.sidebar === "Notes" && (
        <Grid>
          <div className={classes.alignCenter}>
            <SvgIcons
              style={{
                height: 100,
                width: 100,
                color: "darkgray",
              }}
              label="NOTES"
            />
            <span className={classes.labelCss}>Notes you add appear here</span>
          </div>
        </Grid>
      )}
    </Grid>
  );
}
