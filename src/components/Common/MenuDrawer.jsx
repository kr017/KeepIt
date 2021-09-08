import React from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

const useStyles = makeStyles(theme => ({
  drawerCss: {
    zIndex: 0,
    border: "none",

    width: "280px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },
  drawerIconCss: {
    padding: "0 12px",
  },
  drawerLabelCss: {
    overflow: "hidden",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
    marginLeft: "20px",
  },
  drawerListItemCss: {
    height: "48px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: "12px",
    width: "280px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
    borderRadius: "0px 25px 25px 0px",
    "&:hover": {
      backgroundColor: theme.palette.transparent, //transparent,
    },
  },
  drawerListItemCss_Active: {
    height: "48px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: "12px",
    width: "280px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
    borderRadius: "0px 25px 25px 0px",
    backgroundColor: theme.palette.hover,
    color: theme.palette.primary.dark,
  },
}));

export default function MenuDrawer() {
  const classes = useStyles();
  const options = [
    {
      label: "Notes",
      isActive: true,
      icon: (
        <WbIncandescentOutlinedIcon style={{ transform: "rotateX(180deg)" }} />
      ),
    },
    { label: "Remainders", icon: <NotificationsNoneOutlinedIcon /> },
    { label: "Edit Labels", icon: <EditOutlinedIcon /> },
    { label: "Archive", icon: <ArchiveIcon /> },
    { label: "Trash", icon: <DeleteForeverIcon /> },
  ];

  return (
    <div className={classes.drawerCss}>
      {options?.length > 0 &&
        options.map((anchor, index) => (
          <List
            className={
              anchor.isActive
                ? classes.drawerListItemCss_Active
                : classes.drawerListItemCss
            }
            key={index}
          >
            <span className={classes.drawerIconCss}>{anchor.icon}</span>
            <span className={classes.drawerLabelCss}>{anchor.label}</span>
          </List>
        ))}
    </div>
  );
}
