import { Grid, useTheme } from "@material-ui/core";
import { SvgIcons } from "../Common/SvgIcons";

export function EmptyNotes(props) {
  const theme = useTheme();
  return (
    <Grid style={{ display: "flex", justifyContent: "center" }}>
      {props.sidebar === "Archive" && (
        <Grid>
          <SvgIcons
            style={{
              height: 100,
              width: 100,
              color: theme.palette.secondary.dark,
            }}
            label="ARCHIVE"
          />
          <div>Your archived notes appear here</div>
        </Grid>
      )}
      {props.sidebar === "Trash" && (
        <Grid>
          <div>Notes in Trash are deleted after 7 days.</div>
          <SvgIcons
            style={{
              height: 200,
              width: 200,
              color: theme.palette.primary.main,
            }}
            label="TRASH"
          />
        </Grid>
      )}
      {props.sidebar === "Notes" && (
        <Grid>
          <SvgIcons
            style={{
              height: 200,
              width: 200,
              color: theme.palette.primary.main,
            }}
            label="NOTES"
          />
          <div>Notes you add appear here</div>
        </Grid>
      )}
    </Grid>
  );
}
