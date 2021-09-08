import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";

export const SnackbarView = props => {
  const { open } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      //   onClose={handleClose}
      message="Note archived"
      action={
        <React.Fragment>
          {/* <Button
            color="secondary"
            size="small"
            //   onClick={handleClose}
          >
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </React.Fragment>
      }
    />
  );
};
