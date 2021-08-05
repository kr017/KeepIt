import React, { useState } from "react";
import { Menu, MenuItem, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  listItemCss: {
    display: "inline-flex",
    margin: "1px 8px",
    width: "32px",
  },
}));

export default function UserInfoMenu({ open }) {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(open);
  function handleDialogClose() {
    setOpenDialog(!openDialog);
  }
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
