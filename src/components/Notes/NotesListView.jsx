import React, { useState } from "react";
import { Grid, IconButton, List, Paper } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menubar from "./Menubar";
import TextareaAutosize from "react-textarea-autosize";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import { EmptyNotes } from "./EmptyNotes";

const useStyles = makeStyles(theme => ({
  gridNoteCss: {
    padding: "16px 16px 8px 16px",
  },
  noteCss: {
    border: "1px solid ",
    borderRadius: "5px",
    margin: "16px auto",
    width: "70vw",
    padding: "5px 15px 0px 15px",
  },
  textareaInput: {
    border: "none",
    width: "100%",
    wordWrap: "break-word",
    resize: "none",
    background: "transparent",
    outline: "none",
    overflow: "hidden",
    color: theme.palette.primary.dark,
  },
  pinIconCss: {
    position: "absolute",
    top: "2px",
    right: "0px",
  },
}));

export default function NotesListView(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [selectedNote, setSelectedNote] = useState(null);
  function handleShowMenu(note) {
    setSelectedNote(note._id);
  }
  console.log(props.list);
  return (
    <Grid>
      {props.list && props.list.length > 0 ? (
        <Grid>
          {props?.list &&
            props?.list?.map((note, index) => (
              <Paper
                key={index}
                elevation={4}
                className={classes.noteCss}
                style={{
                  borderColor:
                    theme.palette[note.color] === theme.palette.default
                      ? theme.palette.outline
                      : theme.palette[note.color],
                  backgroundColor: theme.palette[note.color],
                }}
                onMouseEnter={() => {
                  handleShowMenu(note);
                }}
                onMouseLeave={() => {
                  handleShowMenu(note);
                }}
              >
                <List>
                  <div style={{ display: "flex" }}>
                    <TextareaAutosize
                      className={classes.textareaInput}
                      style={{ fontSize: "18px", fontWeight: "bold" }}
                      type="text"
                      // placeholder="Title"
                      value={note.title}
                      disabled={true}
                    />

                    {note._id == selectedNote && (
                      <IconButton
                        style={{ position: "relative" }}
                        onClick={() =>
                          props.handleUpdateNote({
                            _id: note._id,
                            isPinned: !note.isPinned,
                          })
                        }
                      >
                        {note?.isPinned ? (
                          <FavoriteOutlined className={classes.pinIconCss} />
                        ) : (
                          <FavoriteIcon className={classes.pinIconCss} />
                        )}
                      </IconButton>
                    )}
                  </div>
                  <TextareaAutosize
                    className={classes.textareaInput}
                    style={{ fontSize: "16px" }}
                    type="text"
                    // placeholder="Description"
                    disabled={true}
                    value={note.description}
                  />
                  {note._id == selectedNote ? (
                    <Menubar
                      colorPallete={false} //{props.sidebar === "Trash" ? false : true}
                      addImage
                      archiveNote
                      deleteNote
                      handleNoteColorChange={color => {
                        props.handleUpdateNote({
                          _id: note._id,
                          color: color,
                        });
                      }}
                      handleDeleteNote={() => {
                        props.handleDeleteNote(note);
                      }}
                      handleAddImage={e => {
                        props.handleUpdateImage({
                          event: e,
                          _id: note._id,
                        });
                      }}
                    />
                  ) : (
                    <div style={{ height: "30px" }}></div>
                  )}
                </List>
              </Paper>
            ))}
        </Grid>
      ) : (
        <EmptyNotes sidebar={props.sidebar} />
      )}
    </Grid>
  );
}
