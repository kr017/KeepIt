import React, { useEffect, useState } from "react";
import { Grid, IconButton, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menubar from "./Menubar";
import TextareaAutosize from "react-textarea-autosize";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import Masonry from "react-masonry-css";
import { EmptyNotes } from "./EmptyNotes";

const useStyles = makeStyles(theme => ({
  myMasonryGrid: {
    // display: "-webkit-box",
    // display: "-ms-flexbox",
    display: "flex",
    width: "auto",
  },
  myMasonryGridColumn: {
    backgroundClip: "padding-box",
  },

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
    outline: "none", //onclick or hover border
    overflow: "hidden",
    color: theme.palette.primary.dark,
  },
  pinIconCss: {
    position: "absolute",
    top: "2px",
    right: "0px",
    // opacity: 1,
  },
}));

export default function NotesGridView(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedNote, setSelectedNote] = useState(null);
  function handleShowMenu(note) {
    setSelectedNote(note._id);
  }
  const [breakPoints, setBreakPoints] = useState(3);
  /**
   * to set breakpoints for grid view
   */
  const xs = useMediaQuery(theme.breakpoints.up("xs")); //375 //1
  const sm = useMediaQuery(theme.breakpoints.up("sm")); //600 //2
  const md = useMediaQuery(theme.breakpoints.up("md")); //960 //3
  const lg = useMediaQuery(theme.breakpoints.up("lg")); //1280 //4
  const xl = useMediaQuery(theme.breakpoints.up("xl")); //1920 //5
  function setPageBreakPoints() {
    if (xl) {
      setBreakPoints(5);
    } else if (lg) {
      setBreakPoints(4);
    } else if (md) {
      setBreakPoints(3);
    } else if (sm) {
      setBreakPoints(2);
    } else if (xs) {
      setBreakPoints(1);
    }
  }

  useEffect(() => {
    setPageBreakPoints();
  });
  let pinnedNotes = props.list.filter(function (note) {
    return note.isPinned === true;
  });

  let otherNotes = props.list.filter(function (note) {
    return note.isPinned !== true;
  });
  const renderNote = (note, index) => {
    return (
      <Paper
        key={index}
        elevation={4}
        className={classes.gridNoteCss}
        style={{
          margin: "8px",
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
        <div
        // onClick={() => {
        //   alert("clicked!");
        // }}
        >
          <div style={{ display: "flex" }}>
            <TextareaAutosize
              className={classes.textareaInput}
              style={{ fontSize: "18px", fontWeight: "bold" }}
              type="text"
              placeholder="Title"
              value={note.title}
              disabled={true}
            />

            {note._id === selectedNote && props.sidebar !== "Trash" && (
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
            placeholder="Description"
            disabled={true}
            value={note.description}
          />
        </div>
        {note._id === selectedNote ? (
          <Menubar
            colorPallete={props.sidebar === "Trash" ? false : true}
            // addImage={props.sidebar === "Trash" ? false : true}
            archiveNote={
              props.sidebar === "Trash"
                ? false
                : props.sidebar === "Archive"
                ? false
                : true
            }
            handleArchieveNote={() => {
              props.handleArchieveNote(note);
            }}
            unArchiveNote={props.sidebar === "Archive" ? true : false}
            handleNoteUnArchive={() => {
              props.handleUnArchieveNote(note);
            }}
            deleteNote={props.sidebar === "Trash" ? false : true}
            handleDeleteNote={() => {
              props.handleDeleteNote(note);
            }}
            permanentDeleteNote={props.sidebar === "Trash" ? true : false}
            handlePermanentDeleteNote={() => {
              props.handlePermanentDeleteNote(note);
            }}
            restoreNote={props.sidebar === "Trash" ? true : false}
            handleRestoreNote={() => {
              props.handleRestoreNote({ _id: note._id });
            }}
            handleNoteColorChange={color => {
              props.handleUpdateNote({
                _id: note._id,
                color: color,
              });
            }}
            // handleAddImage={e => {
            //   props.handleUpdateImage({
            //     event: e,
            //     _id: note._id,
            //   });
            // }}
          />
        ) : (
          <div style={{ height: "30px" }}></div>
        )}
      </Paper>
    );
  };
  return (
    <Grid>
      {props.list && props.list.length > 0 ? (
        <Grid>
          {pinnedNotes && (
            <Grid>
              {pinnedNotes.length > 0 && otherNotes.length > 0 && (
                <span>PINNED</span>
              )}
              <Masonry
                breakpointCols={breakPoints}
                className={classes.myMasonryGrid}
                columnClassName={classes.myMasonryGridColumn}
              >
                {pinnedNotes.map((note, index) => renderNote(note, index))}
              </Masonry>
            </Grid>
          )}

          {otherNotes && (
            <Grid>
              {pinnedNotes.length > 0 && otherNotes.length > 0 && (
                <span>OTHERS</span>
              )}
              <Grid>
                <Masonry
                  breakpointCols={breakPoints}
                  className={classes.myMasonryGrid}
                  columnClassName={classes.myMasonryGridColumn}
                >
                  {otherNotes.map((note, index) => renderNote(note, index))}
                </Masonry>
              </Grid>
            </Grid>
          )}
        </Grid>
      ) : (
        <EmptyNotes sidebar={props.sidebar} />
      )}
    </Grid>
  );
}
