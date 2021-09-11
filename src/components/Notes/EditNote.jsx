import {
  ClickAwayListener,
  IconButton,
  makeStyles,
  Paper,
  useTheme,
} from "@material-ui/core";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import Menubar from "./Menubar";
import { addNote, updateNote } from "../../apis/noteServices";
import { useNote } from "../../context";

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
export function EditNote(props) {
  const classes = useStyles();
  const { isEditNote, note, closeWindow } = props;

  const [title, setTitle] = useState(note?.title);
  const [description, setDescription] = useState(note?.description);
  const [noteColor, setNoteColor] = useState(note?.color);
  const [pinned, setPinned] = useState(note?.isPinned);

  const theme = useTheme();

  const handleNoteColorChange = color => {
    setNoteColor(color);
  };

  const { notesDispatch } = useNote();
  function handleNoteClose() {
    if (isEditNote) {
      let requestParams = {
        _id: note._id,
        title: title,
        isPinned: pinned,
        description: description,
        color: noteColor,
      };
      updateNote(requestParams)
        .then(function (res) {
          notesDispatch({ type: "UPDATE_NOTE", payload: res.data.data });
        })
        .catch(err => {});
    } else {
      if (description && description.length > 0) {
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
            setPinned(false);
          })
          .catch(err => {});
      }
    }
    closeWindow();
  }
  return (
    <ClickAwayListener
      onClickAway={e => {
        handleNoteClose();
      }}
    >
      <Paper
        elevation={4}
        style={{
          //   width: isEditNote ? "50vw" : null,
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
            handleCloseNote={handleNoteClose}
            handleNoteColorChange={handleNoteColorChange}
          />
        </div>
      </Paper>
    </ClickAwayListener>
  );
}
