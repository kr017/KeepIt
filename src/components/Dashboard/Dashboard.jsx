import { CssBaseline, Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { themes } from "../../utils/Theme/Theme";
import { Header } from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import NotesSection from "../Notes/NotesSection";
import { getStorage } from "../../utils/Theme/utilities.js/storageUtil";

export function Dashboard() {
  const userChoice = getStorage("choice");

  const preferredTheme = userChoice?.theme ? userChoice?.theme : "light"; //"light"; //user.theme;
  const theme = createTheme(themes[preferredTheme]);
  return (
    <div>
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
    </div>
  );
}
