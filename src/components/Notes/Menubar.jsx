import React, { useState } from "react";
import { List, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreIcon from "@material-ui/icons/RestoreFromTrashOutlined";
import ColorPallete from "./ColorPallete";

const useStyles = makeStyles(theme => ({
  listItemCss: {
    display: "inline-flex",
    margin: "1px 4px",
    width: "32px",
    [theme.breakpoints.down("xs")]: {
      margin: "1px 4px 1px 2px",
    },
    height: "20px",
    cursor: "pointer",
  },
  ".MuiIconButton-root": {
    padding: "0px 12px",
  },

  closeButtonCss: {
    padding: "4px 4px 4px 6px",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: theme.palette.backCover,
    },
    cursor: "pointer",
  },
  iconCss: {
    marginRight: "12px",
  },
}));

export default function Menubar(props) {
  const classes = useStyles();
  const [showColorPallete, setShowColorPallete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    colorPallete,
    addImage,
    archiveNote,
    unArchiveNote,
    deleteNote,
    closeNote,
    handleCloseNote,
    permanentDeleteNote,
    restoreNote,
    handleArchieveNote,
    handleNoteUnArchive,
    handleDeleteNote,
    handleNoteColorChange,
    handlePermanentDeleteNote,
    handleRestoreNote,
  } = props;

  const handlePalleteClose = () => {
    setAnchorEl(null);
    setShowColorPallete(!showColorPallete);
  };
  // const handleNoteColorChange = color => {
  //   props.handleNoteColorChange(color);
  // };

  // const handleNoteDelete = () => {
  //   props.handleDeleteNote();
  // };

  return (
    <div>
      <List>
        <div className={classes.listItemCss}>
          {/* color palllete */}
          {colorPallete && (
            <span className={classes.iconCss}>
              <Tooltip key={"color"} title={"Color Palette"}>
                <span
                  onClick={e => {
                    setAnchorEl(e.currentTarget);
                    setShowColorPallete(!showColorPallete);
                  }}
                  onMouseOver={e => {
                    setAnchorEl(e.currentTarget);
                    setShowColorPallete(!showColorPallete);
                  }}
                  onBlur={e => {
                    setAnchorEl(null);
                    setShowColorPallete(!showColorPallete);
                  }}
                >
                  <PaletteIcon />
                </span>
              </Tooltip>
            </span>
          )}

          {/* add image */}
          {addImage && (
            <span className={classes.iconCss}>
              <Tooltip key={"image"} title={"Color Palette"}>
                <span>
                  <label for="file-input">
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      id="file-input"
                      // onClick={e => {
                      //   null; // handleImageUpload;
                      // }}
                      // onChange={e => {
                      //   null;
                      // }}
                    />
                    <ImageIcon />
                  </label>
                </span>
              </Tooltip>
            </span>
          )}

          {/* archieve note */}
          {archiveNote && (
            <span className={classes.iconCss}>
              <Tooltip key={"archieve"} title={"archive"}>
                <span onClick={handleArchieveNote}>
                  <ArchiveIcon />
                </span>
              </Tooltip>
            </span>
          )}

          {/* unarchieve note */}
          {unArchiveNote && (
            <span className={classes.iconCss}>
              <Tooltip key={"archieve"} title={"unarchive"}>
                <span onClick={handleNoteUnArchive}>
                  <UnarchiveIcon />
                </span>
              </Tooltip>
            </span>
          )}

          {/* delete note */}
          {deleteNote && (
            <span
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                position: "absolute",
                right: "0px",
                cursor: "pointer",
              }}
              onClick={handleDeleteNote}
            >
              <Tooltip key={"delete"} title={"delete"}>
                <DeleteOutlinedIcon />
              </Tooltip>
            </span>
          )}

          {/* close note */}
          {closeNote && (
            <span
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                position: "absolute",
                right: "0px",
              }}
              className={classes.closeButtonCss}
              onClick={handleCloseNote}
            >
              close
            </span>
          )}

          {/* permanent delete */}
          {permanentDeleteNote && (
            <span className={classes.iconCss}>
              <Tooltip key={"permanentDelete"} title={"Delete forever"}>
                <span onClick={handlePermanentDeleteNote}>
                  <DeleteForeverIcon />
                </span>
              </Tooltip>
            </span>
          )}

          {/* restore delete */}
          {restoreNote && (
            <span className={classes.iconCss}>
              <Tooltip key={"restore"} title={"Restore"}>
                <span onClick={handleRestoreNote}>
                  <RestoreIcon />
                </span>
              </Tooltip>
            </span>
          )}
        </div>
      </List>
      <ColorPallete
        open={showColorPallete} //(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePalleteClose}
        handleNoteColorChange={handleNoteColorChange}
      />
    </div>
  );
}
