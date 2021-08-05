//Pastel Candy theme
/*
import { createMuiTheme } from "@material-ui/core/styles";
export const selectedTheme = createMuiTheme({
  palette: {
    type: theme ? "light" : "dark",
    primary: {
      main: theme ? "#fff" : "#202124", //lightBlue[500],
    },
    secondary: {
      main: theme
        ? "#202124" //deepOrange[900]
        : "#fff", //deepPurple[500],
    },
  },
});

*/

const light = {
  palette: {
    type: "light",
    background: {
      default: "#fff",
    },
    secondary: {
      main: "#fff",
      dark: "#5f6368",
    },
    primary: {
      main: "#fff",
      dark: "#202124",
    },
    default: "#FFFFFF",
    red: "#f28983",
    orange: "#fbbc04",
    yellow: "#FFF475",
    green: "#CCFF90",
    teal: "#CBF0F8",
    blue: "#A7FFEB",
    darkblue: "#AECBFA",
    purple: "#D7AEFB",
    pink: "#FDCFE8",
    brown: "#E6C9A8",
    gray: "#E8EAED",

    hover: "#feefc3",
    transparent: "#ece9e9",

    outline: "#e0e0e0",
    overrides: {
      MuiAppBar: {
        root: {
          // "box-shadow": "none",
        },
      },
    },
  },
};

const dark = {
  palette: {
    type: "dark",
    background: {
      default: "#202124",
      paper: "#202124",
    },
    secondary: {
      main: "#202124",
      dark: "#ffffffde",
    },
    primary: {
      main: "#202124", //"#202124",
      dark: "#fff",
    },

    default: "#202124",
    red: "#5c2b29",
    orange: "#614a19",
    yellow: "#635d19",
    green: "#345920",
    teal: "#16504b",
    blue: "#2d555e",
    darkblue: "#1e3a5f",
    purple: "#42275e",
    pink: "#5b2245",
    brown: "#442f19",
    gray: "#3c3f43",

    hover: "#41331c",
    transparent: "#757575",
    outline: "#5f6368",
    overrides: {
      MuiAppBar: {
        root: {
          // "box-shadow": "none",
        },
      },
    },
  },
};

export const themes = { light, dark };
