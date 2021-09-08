import React, { useState } from "react";
import { ClickAwayListener, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { PinIcon } from "../Common/Icons";
import TextareaAutosize from "react-textarea-autosize";
import Menubar from "./Menubar";
import { addNote } from "../../apis/noteServices";
import { useNote } from "../../context";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "32px auto 16px auto",
    width: "70vw",
    [theme.breakpoints.down("xs")]: {
      margin: "16px auto 16px auto",
    },
  },
  rootCss: {
    padding: "1em",
    margin: "2em",
  },
  shortNoteContainerCss: {},
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
  contentCss: {
    flexGrow: 11,
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
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [noteColor, setNoteColor] = useState(null);
  const [showShort, setShowShort] = useState(true);
  const theme = useTheme();

  const { notesDispatch } = useNote();
  const handleNoteColorChange = color => {
    setNoteColor(color);
  };

  function handleAddNote() {
    let requestParams = {
      title: title,
      description: description,
      color: noteColor,
    };

    addNote(requestParams)
      .then(function (res) {
        notesDispatch({ type: "ADD_NOTE", payload: res.data.data });
        setTitle("");
        setDescription("");
        setNoteColor("");
        setShowShort(true);
      })
      .catch(err => {});
  }
  return (
    <div className={classes.root}>
      {showShort ? (
        <div className={classes.shortNoteContainerCss}>
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
        <ClickAwayListener
          onClickAway={e => {
            setShowShort(true);

            //save note if having desc
            if (description && description.length > 0) {
              handleAddNote();
            }
          }}
        >
          <Paper
            elevation={4}
            style={{
              borderColor:
                theme.palette[noteColor] === theme.palette.default
                  ? theme.palette.outline
                  : theme.palette[noteColor],
              backgroundColor: theme.palette[noteColor],
            }}
            className={classes.noteCss}
          >
            <div
            // className={classes.containerCss}
            >
              <div className={classes.contentCss}>
                <TextareaAutosize
                  // rows="1"
                  className={classes.textareaInput}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  style={{ fontSize: "20px" }}
                  type="text"
                  placeholder="Title"
                  value={title}
                />

                <TextareaAutosize
                  className={classes.textareaInput}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  style={{ fontSize: "16px" }}
                  placeholder="Take a note..."
                  value={description ? description : ""}
                  autoFocus
                />
              </div>

              <div>
                {/* <PinIcon
            style={{ color: "red" }}
            isPinned={true} //{isPinned}
            // setPinned={setPinned}
            handlePinClick={null} //{pinClickHandler}
          /> */}
              </div>
            </div>
            <div style={{ padding: "0px 15px" }}>
              <Menubar
                colorPallete
                addImage
                archiveNote
                closeNote
                handleNoteColorChange={handleNoteColorChange}
              />
            </div>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
}
