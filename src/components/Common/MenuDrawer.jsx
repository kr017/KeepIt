import React from "react";
import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArchiveIcon from "@material-ui/icons/Archive";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import { getAllNotes, getTrashNotes } from "../../apis/noteServices";
import { useLogin, useNote } from "../../context";
import { setStorage } from "../../utils/Theme/utilities.js/storageUtil";

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
  const { userState, userDispatch } = useLogin();
  // eslint-disable-next-line
  const { notesState, notesDispatch } = useNote();

  const options = [
    {
      label: "Notes",
      icon: (
        <WbIncandescentOutlinedIcon style={{ transform: "rotateX(180deg)" }} />
      ),
    },
    // { label: "Remainders", icon: <NotificationsNoneOutlinedIcon /> },
    // { label: "Edit Labels", icon: <EditOutlinedIcon /> },
    { label: "Archive", icon: <ArchiveIcon /> },
    { label: "Trash", icon: <DeleteForeverIcon /> },
  ];

  const handleSidebarClick = key => {
    if (key === "Archive") {
      getAllNotes({ isArchieved: true })
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
        })
        .catch(err => {});
    } else if (key === "Trash") {
      getTrashNotes().then(function (res) {
        notesDispatch({ type: "GET_NOTES", payload: res.data.data });
      });
    } else {
      getAllNotes()
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
        })
        .catch(err => {});
    }
    let choice = {
      theme: userState?.theme,
      view: userState?.view,
      sidebar: key ? key : userState?.sidebar,
    };

    setStorage("choice", choice);
    userDispatch({ type: "SETCHOICE", payload: choice });
  };
  return (
    <div className={classes.drawerCss}>
      {options?.length > 0 &&
        options.map((anchor, index) => (
          <List
            className={
              anchor.label === userState?.sidebar
                ? classes.drawerListItemCss_Active
                : classes.drawerListItemCss
            }
            key={index}
            onClick={() => handleSidebarClick(anchor.label)}
          >
            <span className={classes.drawerIconCss}>{anchor.icon}</span>
            <span className={classes.drawerLabelCss}>{anchor.label}</span>
          </List>
        ))}
    </div>
  );
}
