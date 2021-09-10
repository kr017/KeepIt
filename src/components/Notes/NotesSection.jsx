import React from "react";
import { useEffect } from "react";
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

  /**
   *
   */
  function loadList() {
    if (userState?.sidebar === "Archive") {
      getAllNotes({ isArchieved: true })
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
        })
        .catch(err => {});
    } else if (userState?.sidebar === "Trash") {
      getTrashNotes().then(function (res) {
        notesDispatch({ type: "GET_NOTES", payload: res.data.data });
      });
    } else {
      getAllNotes({ isArchieved: false })
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
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
    <div>
      {userState.sidebar === "Notes" ? (
        <CreateNote
          loadDetails={() => {
            loadList();
          }}
        />
      ) : null}
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
