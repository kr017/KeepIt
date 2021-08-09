import React, { useContext } from "react";
import {
  Grid,
  IconButton,
  List,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Menubar from "./Menubar";
import TextareaAutosize from "react-textarea-autosize";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderRounded";
import { Favorite } from "@material-ui/icons";
import clsx from "clsx";
import Masonry from "react-masonry-css";
import { useState } from "react";
import { useEffect } from "react";
import { getAllNotes, updateNote } from "../../apis/noteServices";

const useStyles = makeStyles(theme => ({
  myMasonryGrid: {
    display: "-webkit-box" /* Not needed if autoprefixing */,
    display: "-ms-flexbox" /* Not needed if autoprefixing */,
    display: "flex",
    // marginLeft: "-30px" /* gutter size offset */,
    width: "auto",
  },
  myMasonryGridColumn: {
    // margin: "16px" /* gutter size */,
    backgroundClip: "padding-box",
  },

  // /* Style your items */
  // .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  //   background: grey;
  //   margin-bottom: 30px;
  // },

  root: {
    //color: theme.primary,
    //backgroundColor: theme.secondary,
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

    // "&:hover": {
    //   "& > List > IconButton": {
    //     ":hover": {
    //       opacity: 1,
    //     },
    //   },
    // },
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
  },
}));

export default function NotesListView() {
  const classes = useStyles();
  const theme = useTheme();
  const user = { theme: "light" };
  const [breakPoints, setBreakPoints] = useState(4);

  function handleUpdateNote(note) {
    updateNote(note)
      .then(res => {
        loadList();
      })
      .catch(err => {});
  }

  function handleShowMenu(note) {
    let newNote = notes;
    newNote.forEach(element => {
      if (element._id === note._id) {
        element.showMenu = true;
      } else {
        element.showMenu = false;
      }
    });

    setNotes(newNote);
  }

  const [notes, setNotes] = useState([]);
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

  /**
   * loading all notes of logged in user
   */
  function loadList() {
    getAllNotes()
      .then(function (res) {
        setNotes(res.data);
      })
      .catch(err => {});
  }

  useEffect(() => {
    setPageBreakPoints();
    loadList();
  }, []);

  return (
    <div>
      {!sm || user.view === "list" ? (
        <Grid>
          {notes &&
            notes.map((note, index) => (
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
                  <TextareaAutosize
                    className={classes.textareaInput}
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                    type="text"
                    placeholder="Title"
                    value={note.title}
                    disabled={true}
                  />

                  {note.showMenu && (
                    <IconButton
                      className={classes.pinIconCss}
                      onClick={() => {
                        handleUpdateNote({
                          _id: note._id,
                          isPinned: !note.isPinned,
                        });
                      }}
                    >
                      {note?.isPinned ? <FavoriteOutlined /> : <FavoriteIcon />}
                    </IconButton>
                  )}

                  <TextareaAutosize
                    className={classes.textareaInput}
                    style={{ fontSize: "16px" }}
                    type="text"
                    placeholder="Description"
                    disabled={true}
                    value={note.description}
                  />
                  {note.showMenu ? (
                    <Menubar
                      handleNoteColorChange={color => {
                        handleUpdateNote({ _id: note._id, color: color });
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
        <Grid>
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGridColumn}
          >
            {notes &&
              notes.length > 0 &&
              notes.map((note, index) => (
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
                  // onMouseEnter={() => {
                  //   setNotes({
                  //     note,
                  //     type: {
                  //       type: "SHOW_MENU",
                  //     },
                  //   });
                  // }}
                  // onMouseLeave={() => {
                  //   setNotes({
                  //     note,
                  //     type: {
                  //       type: "SHOW_MENU",
                  //     },
                  //   });
                  // }}
                >
                  <TextareaAutosize
                    className={classes.textareaInput}
                    style={{ fontSize: "18px", fontWeight: "bold" }}
                    type="text"
                    placeholder="Title"
                    value={note.title}
                    disabled={true}
                  />

                  {note.showMenu && (
                    <IconButton
                      className={classes.pinIconCss}
                      onClick={() => {
                        setNotes({
                          note,
                          type: {
                            type: "PIN_CHANGE",
                          },
                        });
                      }}
                    >
                      {note?.isPinned ? <FavoriteOutlined /> : <FavoriteIcon />}
                    </IconButton>
                  )}
                  <TextareaAutosize
                    className={classes.textareaInput}
                    style={{ fontSize: "16px" }}
                    type="text"
                    placeholder="Description"
                    disabled={true}
                    value={note.description}
                  />

                  {note.showMenu ? (
                    <Menubar
                      handleNoteColorChange={color => {
                        setNotes({
                          note,
                          type: {
                            type: "COLOR_CHANGE",
                            newColor: color,
                          },
                        });
                      }}
                    />
                  ) : (
                    <div style={{ height: "30px" }}></div>
                  )}
                </Paper>
              ))}
          </Masonry>
        </Grid>
      )}
    </div>
  );
}
