import React, { useEffect, useState } from "react";
import { Grid, IconButton, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menubar from "./Menubar";
import TextareaAutosize from "react-textarea-autosize";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import Masonry from "react-masonry-css";

const useStyles = makeStyles(theme => ({
  myMasonryGrid: {
    display: "-webkit-box",
    display: "-ms-flexbox",
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

  return (
    <Grid>
      <Masonry
        breakpointCols={breakPoints}
        className={classes.myMasonryGrid}
        columnClassName={classes.myMasonryGridColumn}
      >
        {props.list &&
          props.list.length > 0 &&
          props.list.map((note, index) => (
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
              <div style={{ display: "flex" }}>
                <TextareaAutosize
                  className={classes.textareaInput}
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  type="text"
                  placeholder="Title"
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
                placeholder="Description"
                disabled={true}
                value={note.description}
              />

              {note._id == selectedNote ? (
                <Menubar
                  handleNoteColorChange={color => {
                    props.handleUpdateNote({ _id: note._id, color: color });
                  }}
                  handleDeleteNote={() => {
                    props.handleDeleteNote(note);
                  }}
                />
              ) : (
                <div style={{ height: "30px" }}></div>
              )}
            </Paper>
          ))}
      </Masonry>
    </Grid>
  );
}