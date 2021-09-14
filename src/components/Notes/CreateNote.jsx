import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "react-textarea-autosize";
import { EditNote } from "./EditNote";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "80px auto 16px auto",
    width: "70vw",
    [theme.breakpoints.down("xs")]: {
      margin: "80px auto 16px auto",
    },
  },

  shortNoteCss: {
    borderRadius: "5px",
    border: "1px solid",
    borderColor: theme.palette.outline,
  },
  noteCss: {
    border: "1px solid ",
    borderRadius: "5px",
    borderColor: theme.palette.outline,
  },
  containerCss: {
    display: "flex",
    justifyContent: "space-between",
  },

  textareaInput: {
    border: "none",
    width: "100%",
    wordWrap: "break-word",
    resize: "none",
    padding: "1em",
    background: "transparent",
    outline: "none", //onclick or hover border
    overflow: "hidden",
  },
}));

export default function CreateNote(props) {
  const classes = useStyles();
  const [description, setDescription] = useState(null);
  const [showShort, setShowShort] = useState(true);
  return (
    <div className={classes.root}>
      {showShort ? (
        <div>
          <Paper elevation={4} className={classes.shortNoteCss}>
            <TextareaAutosize
              // rows="1"
              className={classes.textareaInput}
              onClick={() => {
                setShowShort(false);
              }}
              onChange={e => {
                setShowShort(false);
                setDescription(e.target.value);
              }}
              style={{ fontSize: "16px" }}
              type="text"
              placeholder="Take a note..."
              value={description ? description : ""}
              autoFocus
            />
          </Paper>
        </div>
      ) : (
        <EditNote closeWindow={() => setShowShort(true)} />
      )}
    </div>
  );
}
