import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { PinIcon } from "../Common/Icons";
import CreateNote from "./CreateNote";
import NotesListView from "./NotesListView";
// const useStyles = makeStyles(theme => ({
//   root: {
//     //color: theme.primary,
//     //backgroundColor: theme.secondary,
//   },
// }));

export default function NotesSection() {
  // const classes = useStyles();
  const view = "LIST";
  return (
    <div>
      <CreateNote />
      {view === "LIST" && <NotesListView />}
    </div>
  );
}
