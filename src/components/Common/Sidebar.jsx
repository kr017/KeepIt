import React, { useState } from "react";
import { ClickAwayListener, Drawer, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotesIcon from "@material-ui/icons/AccountBalanceWalletSharp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ArchiveIcon from "@material-ui/icons/Archive";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import { useLogin, useNote } from "../../context";
import { setStorage } from "../../utils/Theme/utilities.js/storageUtil";
import { getAllNotes, getTrashNotes } from "../../apis/noteServices";

const useStyles = makeStyles(theme => ({
  root: {
    //color: theme.primary,
    //backgroundColor: theme.secondary,
  },
  drawerCss: {
    marginTop: "65px",
  },
  drawer: {
    zIndex: 0,
  },
  drawerPaper: {
    marginTop: "70px", // equal to AppBar height
    border: "none",
    width: "280px",
    [theme.breakpoints.down("xs")]: {
      width: "180px",
    },
  },

  drawerListItemCss: {
    height: "48px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: "12px",
    // paddingRight: "24px",
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
  drawerIconCss: {
    padding: "0 12px",
  },
  drawerLabelCss: {
    overflow: "hidden",
    textOverflow: "hidden",
    whiteSpace: "nowrap",
    marginLeft: "20px",
  },
  ListItemCss: {
    width: "48px",
    height: "48px",
    textAlign: "center",
    marginLeft: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    ":hover": {
      backgroundColor: theme.palette.hover,
      color: theme.palette.primary.dark,
    },
  },
  ListItemCss_Active: {
    width: "48px",
    height: "48px",
    marginLeft: "12px",
    backgroundColor: theme.palette.hover,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    color: theme.palette.primary.dark,
  },
}));

export default function Sidebar() {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(false);
  const { userState, userDispatch } = useLogin();
  const { notesState, notesDispatch } = useNote();

  const [options, setOptions] = useState([
    {
      label: "Notes",
      isActive: true,
      icon: (
        <WbIncandescentOutlinedIcon style={{ transform: "rotateX(180deg)" }} />
      ),
    },
    // { label: "Remainders", icon: <NotificationsNoneOutlinedIcon /> },
    // { label: "Edit Labels", icon: <EditOutlinedIcon /> },
    { label: "Archive", icon: <ArchiveIcon /> },
    { label: "Trash", icon: <DeleteForeverIcon /> },
  ]);

  const toggleDrawer = () => {
    setOpenMenu(!openMenu);
  };
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
    <div className={classes.root}>
      {openMenu ? (
        <ClickAwayListener
          onClickAway={() => {
            setOpenMenu(false);
          }}
        >
          <Drawer
            anchor="left"
            open={true} //{openMenu}
            variant="permanent"
            onClose={() => {
              toggleDrawer();
            }}
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            // onMouseLeave={() => {
            //   setOpenMenu(false);
            // }}
          >
            {options?.length > 0 &&
              options.map((anchor, index) => (
                <List
                  className={
                    anchor.isActive
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
          </Drawer>
        </ClickAwayListener>
      ) : (
        <div style={{ paddingTop: "8px" }}>
          {options?.length > 0 &&
            options.map((anchor, index) => (
              <List disablePadding key={index}>
                <span
                  onMouseOver={e => {
                    toggleDrawer();
                  }}
                  className={
                    anchor?.isActive
                      ? classes.ListItemCss_Active
                      : classes.ListItemCss
                  }
                  onClick={() => handleSidebarClick(anchor.label)}
                >
                  <span>{anchor.icon}</span>
                </span>
              </List>
            ))}
        </div>
      )}
    </div>
  );
}
