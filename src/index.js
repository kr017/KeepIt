import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider, NotesProvider } from "./context";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
