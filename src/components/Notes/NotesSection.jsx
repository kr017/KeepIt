import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import {
  archieveNote,
  deleteNote,
  deletePermanentNote,
  getAllNotes,
  getTrashNotes,
  restoreNote,
  unArchieveNote,
  updateNote,
} from "../../apis/noteServices";
import { useLogin, useNote } from "../../context";
import CreateNote from "./CreateNote";
import NotesGridView from "./NotesGridView";
import NotesListView from "./NotesListView";
// const useStyles = makeStyles(theme => ({
//   root: {
//     //color: theme.primary,
//     //backgroundColor: theme.secondary,
//   },
// }));

export default function NotesSection() {
  const { userState } = useLogin();

  const { notesState, notesDispatch } = useNote();
  const [loading, setLoading] = useState(false);

  /**
   *
   */
  function loadList() {
    if (userState?.sidebar === "Archive") {
      setLoading(true);
      getAllNotes({ isArchieved: true })
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
          setLoading(false);
        })
        .catch(err => {});
    } else if (userState?.sidebar === "Trash") {
      setLoading(true);
      getTrashNotes().then(function (res) {
        notesDispatch({ type: "GET_NOTES", payload: res.data.data });
        setLoading(false);
      });
    } else {
      setLoading(true);
      getAllNotes({ isArchieved: false })
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
          setLoading(false);
        })
        .catch(err => {});
    }
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line
  }, []);

  /**
   *
   */
  function handleUpdateNote(note) {
    updateNote(note)
      .then(res => {
        notesDispatch({ type: "UPDATE_NOTE", payload: res.data.data });
      })
      .catch(err => {});
  }

  /**
   *
   */
  function handleArchieveNote(note) {
    archieveNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "ARCHIEVE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }
  function handleUnArchieveNote(note) {
    unArchieveNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "UNARCHIEVE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }

  /**
   *
   */
  function handleDeleteNote(note) {
    deleteNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "DELETE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }
  function handlePermanentDeleteNote(note) {
    deletePermanentNote({ note_id: note._id })
      .then(res => {
        notesDispatch({
          type: "DELETE_NOTE_PERMANENT",
          payload: { _id: note._id },
        });
      })
      .catch(err => {});
  }

  function handleRestoreNote(note) {
    restoreNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "RESTORE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }

  return (
    <div style={{ marginTop: "82px" }}>
      {userState?.sidebar && userState?.sidebar !== "Notes" ? null : (
        <CreateNote
          loadDetails={() => {
            loadList();
          }}
        />
      )}
      <Grid
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <PulseLoader
          color="#F9C342"
          loading={loading}
          width={440} //"auto"
        />
      </Grid>
      {userState.view === "list" ? (
        <NotesListView
          sidebar={userState.sidebar ? userState.sidebar : "Notes"}
          list={notesState.notes}
          handleArchieveNote={handleArchieveNote}
          handleUnArchieveNote={handleUnArchieveNote}
          handleDeleteNote={handleDeleteNote}
          handlePermanentDeleteNote={handlePermanentDeleteNote}
          handleRestoreNote={handleRestoreNote}
          handleUpdateNote={handleUpdateNote}
        />
      ) : (
        <NotesGridView
          sidebar={userState.sidebar ? userState.sidebar : "Notes"}
          list={notesState.notes}
          handleArchieveNote={handleArchieveNote}
          handleUnArchieveNote={handleUnArchieveNote}
          handleDeleteNote={handleDeleteNote}
          handlePermanentDeleteNote={handlePermanentDeleteNote}
          handleRestoreNote={handleRestoreNote}
          handleUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
}
