import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import WbSunnySharpIcon from "@material-ui/icons/WbSunnySharp";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ListViewIcon from "@material-ui/icons/ViewAgendaOutlined";
import GridViewIcon from "@material-ui/icons/ViewQuiltOutlined";
import { useState } from "react";
import UserInfoMenu from "../Dashboard/UserInfoMenu";
import logo from "../../logo.png";
import MenuDrawer from "./MenuDrawer";
import { setStorage } from "../../utils/Theme/utilities.js/storageUtil";
import { useLogin, useNote } from "../../context";
import { getAllNotes } from "../../apis/noteServices";
const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    margin: 0,
  },
  appBarCss: {
    // zIndex: theme.zIndex.drawer + 1,
    borderBottom: `1px solid ${theme.palette.outline}`,
    boxShadow: "none",
  },
  inputRoot: {
    color: "inherit",

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + 18px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  search: {
    position: "relative",
    borderRadius: "8px",
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.dark, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.secondary.dark,
  },
  toggleViewCss: {
    // display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  viewIconCss: {
    color: theme.palette.secondary.dark,
  },
}));
export function Header() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const { userState, userDispatch } = useLogin();

  const { notesDispatch } = useNote();

  function handleUserChoice(key) {
    let choice = {
      theme: userState?.theme,
      view: userState?.view,
      sidebar: userState?.sidebar,
    };

    if (key === "theme") {
      choice = {
        view: userState?.view,
        theme: userState?.theme === "light" ? "dark" : "light",
        sidebar: userState?.sidebar,
      };
    }
    if (key === "view") {
      choice = {
        view: userState?.view === "grid" ? "list" : "grid",
        theme: userState?.theme,
        sidebar: userState?.sidebar,
      };
    }
    setStorage("choice", choice);
    userDispatch({ type: "SETCHOICE", payload: choice });
  }

  function toggleOpenProfile(e) {
    setOpenProfile(!openProfile);
    setAnchorEl(e.currentTarget);
  }

  function toggleMenu(e) {
    setOpenMenu(!openMenu);
    setMenuAnchorEl(e.currentTarget);
  }

  const handleSearch = e => {
    let search = e.target.value;
    let isArchieved = userState?.sidebar === "Archive" ? true : false;

    getAllNotes({ search: search, isArchieved: isArchieved })
      .then(function (res) {
        notesDispatch({ type: "GET_NOTES", payload: res.data.data });
      })
      .catch(err => {});
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBarCss}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="app-logo" height="40px" width="40px" />
            <Typography variant="h6" noWrap style={{ marginLeft: "8px" }}>
              Keep It
            </Typography>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: "4px",
            }}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search???"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyPress={e => {
                  handleSearch(e);
                }}
                onChange={e => {
                  handleSearch(e);
                }}
              />
            </div>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: "8px",
            }}
          >
            <IconButton
              edge="start"
              //   className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                handleUserChoice("theme");
              }}
              style={{ marginRight: "4px" }}
            >
              {userState.theme === "dark" ? (
                <WbSunnySharpIcon style={{ color: "#ecd215" }} />
              ) : (
                <WbSunnyOutlinedIcon style={{ color: "#424040" }} />
              )}
            </IconButton>

            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => {
                handleUserChoice("view");
              }}
              style={{ marginRight: "4px" }}
              className={classes.toggleViewCss}
            >
              {userState.view === "list" ? (
                <GridViewIcon
                  fontSize="large"
                  className={classes.viewIconCss}
                />
              ) : (
                <ListViewIcon
                  fontSize="medium"
                  className={classes.viewIconCss}
                />
              )}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="menu"
              onClick={toggleOpenProfile}
            >
              <Avatar alt="Profile Picture" src={null} />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>

      <Popover
        open={openProfile ? openProfile : false}
        anchorEl={anchorEl}
        onClose={toggleOpenProfile}
        anchorOrigin={{
          vertical: 70,
          horizontal: 0,
        }}
      >
        <UserInfoMenu />
      </Popover>

      <Popover
        open={openMenu ? openMenu : false}
        anchorEl={menuAnchorEl}
        onClose={toggleMenu}
        elevation={0}
        PaperProps={{
          style: {
            left: "10px",
            transform: "translateX(-14px) translateY(51px)",
            border: "none",
            height: "100%",
          },
        }}
      >
        <MenuDrawer />
      </Popover>
    </div>
  );
}
