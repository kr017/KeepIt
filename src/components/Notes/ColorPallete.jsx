import React, { useState } from "react";
import { Menu, MenuItem, Tooltip } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
const useStyles = makeStyles(theme => ({
  listItemCss: {
    display: "inline-flex",
    margin: "1px 8px",
    width: "32px",
  },
  iconButtonCss: {
    padding: "0px",
  },
  paletteContainer: {
    display: "grid",
    gridTemplateColumns: "28px 28px 28px 28px",
    gridTemplateRows: "28px 28px 28px",
    backgroundColor: theme.palette.primary.default,
  },
  paletteColorCss: {
    height: "26px",
    width: "26px",
    borderRadius: "50%",
    "&:hover": {
      border: "2px solid ",
    },
  },
  doneIconCss: {
    color: theme.palette.primary.dark,
  },
}));

export default function ColorPallete({
  open,
  anchorEl,
  onClose,
  handleNoteColorChange,
}) {
  const classes = useStyles();
  const themeColor = useTheme();
  const colorList = [
    {
      id: 1,
      name: "default",
      label: "Default",
      shade: themeColor.palette.default,
    },
    { id: 2, name: "red", label: "Red", shade: themeColor.palette.red },
    {
      id: 3,
      name: "orange",
      label: "Orange",
      shade: themeColor.palette.orange,
    },
    {
      id: 4,
      name: "yellow",
      label: "Yellow",
      shade: themeColor.palette.yellow,
    },
    { id: 5, name: "green", label: "Green", shade: themeColor.palette.green },
    { id: 6, name: "teal", label: "Teal", shade: themeColor.palette.teal },
    { id: 7, name: "blue", label: "Blue", shade: themeColor.palette.blue },
    {
      id: 8,
      name: "darkblue",
      label: "Dark Blue",
      shade: themeColor.palette.darkblue,
    },
    {
      id: 9,
      name: "purple",
      label: "Purple",
      shade: themeColor.palette.purple,
    },
    { id: 10, name: "pink", label: "Pink", shade: themeColor.palette.pink },
    { id: 11, name: "brown", label: "Brown", shade: themeColor.palette.brown },
    { id: 12, name: "gray", label: "Gray", shade: themeColor.palette.gray },
  ];

  const [noteColor, setNoteColor] = useState(null);
  const handleColorChange = color => {
    handleNoteColorChange(color);
    setNoteColor(color);
  };
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoFocus={false}
      >
        <MenuItem>
          <div className={classes.paletteContainer}>
            {colorList.map((color, id) => {
              return (
                <Tooltip key={id} title={color.label}>
                  <div
                    style={{
                      backgroundColor: color.shade,
                    }}
                    className={classes.paletteColorCss}
                    onClick={() => {
                      handleColorChange(color.name);
                    }}
                  >
                    {noteColor === color.name ? (
                      <DoneIcon className={classes.doneIconCss} />
                    ) : (
                      ""
                    )}
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
