import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
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
import userContext from "../User/User";
import { useContext, useState } from "react";
import UserInfoMenu from "../Dashboard/UserInfoMenu";
import logo from "../../logo.png";
const useStyles = makeStyles(theme => ({
  root: {
    // zIndex: theme.zIndex.drawer + 1,
    border: `1px solid ${theme.palette.outline}`,
    boxShadow: "none",
  },
  inputRoot: {
    color: "inherit",
    width: "50vw",
    padding: "5px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
      // color: "Red",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + 18px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
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
}));
export function Header() {
  const classes = useStyles();
  const { user, setUser } = useContext(userContext);
  const [openProfile, setOpenProfile] = useState(false);

  function handleThemeChange() {
    setUser({
      name: user.name,
      theme: user.theme === "light" ? "dark" : "light",
      view: user.view,
    });
  }

  function handleViewChange() {
    setUser({
      name: user.name,
      theme: user.theme,
      view: user.view === "grid" ? "list" : "grid",
    });
  }

  function handleProfileClick() {
    debugger;
    setOpenProfile(!openProfile);
  }
  // function toggleMenu() {
  //   setUser({
  //     name: user.name,
  //     theme: user.theme,
  //     openMenu: !user.openMenu,
  //   });
  // }
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              // onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} alt="app-logo" height="40px" width="40px" />
            {/* <WbIncandescentIcon style={{ transform: "rotateX(180deg)" }} /> */}
            <Typography variant="h6" noWrap style={{ marginLeft: "8px" }}>
              Keep It
            </Typography>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
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
              onClick={handleThemeChange}
              style={{ marginRight: "4px" }}
            >
              {user.theme === "dark" ? (
                <WbSunnySharpIcon style={{ color: "#ecd215" }} />
              ) : (
                <WbSunnyOutlinedIcon style={{ color: "#424040" }} />
              )}
            </IconButton>

            <IconButton
              edge="start"
              //   className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleViewChange}
              style={{ marginRight: "4px" }}
            >
              {user.view === "grid" ? (
                <ListViewIcon fontSize="30" />
              ) : (
                <GridViewIcon fontSize="30" />
              )}
            </IconButton>
            <IconButton
              edge="end"
              //   className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleProfileClick}
            >
              <Avatar alt="Profile Picture" src={null} />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>

      <UserInfoMenu open={openProfile} />
    </div>
  );
}
