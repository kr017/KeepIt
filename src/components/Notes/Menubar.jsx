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
import ColorPallete from "./ColorPallete";

const useStyles = makeStyles(theme => ({
  root: {
    //color: theme.primary,
    //backgroundColor: theme.secondary,
  },
  listItemCss: {
    display: "inline-flex",
    margin: "1px 8px",
    width: "32px",
  },
  iconButtonCss: {
    padding: "0px",
  },
}));

export default function Menubar(props) {
  const classes = useStyles();
  const [showColorPallete, setShowColorPallete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleItemHover = (e, itemId) => {
    if (itemId === 2) {
      setAnchorEl(e.currentTarget);
      setShowColorPallete(!showColorPallete);
    } else {
      setAnchorEl(e.currentTarget);
      setShowColorPallete(false);
    }
  };

  const handleItemMouseOut = (e, itemId) => {
    if (itemId === 2) {
      setAnchorEl(!anchorEl);
      setShowColorPallete(!showColorPallete);
    }
  };

  const handleItemClick = (e, itemId) => {
    if (itemId === 2) {
    }
  };
  const handlePalleteClose = () => {
    setAnchorEl(null);
    setShowColorPallete(!showColorPallete);
  };

  const handleNoteColorChange = color => {
    props.handleNoteColorChange(color);
  };
  const list = [
    { icon: <ReminderIcon />, label: "Remind me" },
    { icon: <AddPersonIcon />, label: "Remind me" },
    {
      icon: <PaletteIcon />,
      label: "Remind me",
    },
    { icon: <ImageIcon />, label: "Remind me" },
    { icon: <ArchiveIcon />, label: "Remind me" },
    { icon: <MoreIcon />, label: "Remind me" },
    {
      icon: (
        <IconButton disabled className={classes.iconButtonCss}>
          <UndoIcon />
        </IconButton>
      ),
      label: "Remind me",
    },
    {
      icon: (
        <IconButton disabled className={classes.iconButtonCss}>
          <RedoIcon />
        </IconButton>
      ),
      label: "Remind me",
    },
    {
      icon: <Button size="small">close</Button>,
      label: "Remind me",
    },
  ];

  return (
    <div>
      <List>
        {list.map((item, index) => (
          <ListItem key={index} className={classes.listItemCss}>
            <IconButton
              onMouseOver={e => {
                handleItemHover(e, index);
              }}
              onClick={e => {
                handleItemClick(e, index);
              }}
              // onMouseLeave={e => {
              //   handleItemMouseOut(e, index);
              // }}
            >
              <Tooltip
                key={index}
                title={item.label}
                // style={{
                //   position: "absolute",
                // }}
              >
                {item.icon}
              </Tooltip>
            </IconButton>
          </ListItem>
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
