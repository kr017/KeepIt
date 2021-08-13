import React, { useState } from "react";
import { Button, IconButton, List, ListItem, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotesIcon from "@material-ui/icons/AccountBalanceWalletSharp";
import PaletteIcon from "@material-ui/icons/PaletteOutlined";
import ReminderIcon from "@material-ui/icons/AddAlertOutlined";
import AddPersonIcon from "@material-ui/icons/PersonAddOutlined";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import ArchiveIcon from "@material-ui/icons/ArchiveOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import UndoIcon from "@material-ui/icons/UndoOutlined";
import RedoIcon from "@material-ui/icons/RedoOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
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
}));

export default function Menubar(props) {
  const classes = useStyles();
  const [showColorPallete, setShowColorPallete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleItemHover = (e, itemId, action) => {
    if (action === "COLOR_CHANGE") {
      setAnchorEl(e.currentTarget);
      setShowColorPallete(!showColorPallete);
    } else {
      return;
    }
  };
  const handleUploadClick = event => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
  };
  const handleItemMouseOut = (e, itemId, action) => {
    if (action === "COLOR_CHANGE") {
      setAnchorEl(!anchorEl);
      setShowColorPallete(!showColorPallete);
    } else {
      setAnchorEl(e.currentTarget);
      setShowColorPallete(false);
    }
  };

  const handleItemClick = (e, itemId, action) => {
    if (action === "ADD_IMAGE") {
      console.log(e.target.files);
    } else {
      return;
    }
  };
  const handlePalleteClose = () => {
    setAnchorEl(null);
    setShowColorPallete(!showColorPallete);
  };
  const handleNoteColorChange = color => {
    props.handleNoteColorChange(color);
  };

  const handleNoteDelete = () => {
    props.handleDeleteNote();
  };
  let list = [
    // { icon: <ReminderIcon />, label: "Remind me", action: "REMIND" },
    // { icon: <AddPersonIcon />, label: "Collaborator" },
    {
      icon: <PaletteIcon />,
      label: "Remind me",
      action: "COLOR_CHANGE",
    },
    {
      icon: (
        <span>
          <label for="file-input">
            <input
              type="file"
              accept="image/*"
              style={
                {
                  // opacity: 0,
                  // display: "none",
                }
              }
              hidden
              id="file-input"
              onClick={handleItemClick}
              onChange={handleUploadClick}
            />
            <ImageIcon />
          </label>
        </span>
      ),
      label: "Add Image",
      action: "ADD_IMAGE",
    },
    { icon: <ArchiveIcon />, label: "Archive", action: "ARCHIVE" },

    // { icon: <MoreIcon />, label: "More", action: "MORE" },
    // {
    //   icon: (
    //     <IconButton disabled>
    //       <UndoIcon />
    //     </IconButton>
    //   ),
    //   label: "Undo",
    // },
    // {
    //   icon: (
    //     <IconButton disabled>
    //       <RedoIcon />
    //     </IconButton>
    //   ),
    //   label: "Redo",
    // },
  ];
  if (props?.isCreateOrUpdate) {
    list.push({
      icon: (
        <span
          style={{
            fontSize: "16px",
            textTransform: "capitalize",
            position: "absolute",
            right: "0px",
          }}
          className={classes.closeButtonCss}
        >
          close
        </span>
      ),
      // label: "Close",
      action: "CLOSE",
    });
  } else {
    list.push({
      icon: (
        <span
          style={{
            fontSize: "16px",
            textTransform: "capitalize",
            position: "absolute",
            right: "0px",
            cursor: "pointer",
          }}
          onClick={handleNoteDelete}
        >
          <DeleteOutlinedIcon />
        </span>
      ),
      label: "Delete",
      action: "DELETE",
    });
  }

  return (
    <div>
      <List>
        {list.map((item, index) => (
          <div
            key={index}
            className={classes.listItemCss}
            onMouseOver={e => {
              handleItemHover(e, index, item.action);
            }}
            // onClick={e => {
            //   handleItemClick(e, index, item.action);
            // }}
            // onMouseOut={e => {
            //   handleItemMouseOut(e, index, item.action);
            // }}
          >
            <span className={classes.iconCss}>
              {item?.label ? (
                <Tooltip
                  key={index}
                  title={item.label}
                  // style={{
                  //   position: "absolute",
                  // }}
                >
                  {item.icon}
                </Tooltip>
              ) : (
                <>{item.icon}</>
              )}
            </span>
          </div>
        ))}
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
