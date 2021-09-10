import React, { useState } from "react";
import { ClickAwayListener, IconButton, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { PinIcon } from "../Common/Icons";
import TextareaAutosize from "react-textarea-autosize";
import Menubar from "./Menubar";
import { addNote } from "../../apis/noteServices";
import { useNote } from "../../context";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "32px auto 16px auto",
    width: "70vw",
    [theme.breakpoints.down("xs")]: {
      margin: "16px auto 16px auto",
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
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [noteColor, setNoteColor] = useState(null);
  const [showShort, setShowShort] = useState(true);
  const [pinned, setPinned] = useState(false);
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
      isPinned: pinned,
    };

    addNote(requestParams)
      .then(function (res) {
        notesDispatch({ type: "ADD_NOTE", payload: res.data.data });
        setTitle("");
        setDescription("");
        setNoteColor("");
        setShowShort(true);
        setPinned(false);
      })
      .catch(err => {});
  }
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
            <div>
              <div style={{ display: "flex" }}>
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

                <div>
                  <IconButton
                    style={{ position: "relative" }}
                    onClick={() => setPinned(!pinned)}
                  >
                    {pinned ? (
                      <FavoriteOutlined className={classes.pinIconCss} />
                    ) : (
                      <FavoriteIcon className={classes.pinIconCss} />
                    )}
                  </IconButton>
                </div>
              </div>
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
            <div style={{ padding: "0px 15px" }}>
              <Menubar
                colorPallete
                // addImage
                // archiveNote
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
