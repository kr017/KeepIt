import { CssBaseline, Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useReducer } from "react";
import { themes } from "../../utils/Theme/Theme";
import { Header } from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import NotesSection from "../Notes/NotesSection";
import userContext from "../User/User";

const userDetails = {
  name: "Kiran",
  theme: "light",
  view: "grid",
};
function userReducer(state, item) {
  return item;
}
export function Dashboard() {
  const [user, setUser] = useReducer(userReducer, userDetails);

  const preferredTheme = user.theme;
  const theme = createTheme(themes[preferredTheme]);

  return (
    <div>
      <userContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Grid container>
            <Grid item xs={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={10} style={{ margin: "0 auto" }}>
              <NotesSection />
            </Grid>
          </Grid>
        </ThemeProvider>
      </userContext.Provider>
    </div>
  );
}
