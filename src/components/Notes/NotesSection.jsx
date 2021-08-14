import React, { useState } from "react";
import { useEffect } from "react";
import {
  archieveNote,
  deleteNote,
  getAllNotes,
  getTrashNotes,
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
      getAllNotes()
        .then(function (res) {
          notesDispatch({ type: "GET_NOTES", payload: res.data.data });
        })
        .catch(err => {});
    }
  }

  useEffect(() => {
    loadList();
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
  function handleDeleteNote(note) {
    deleteNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "DELETE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }

  /**
   *
   */
  function handleArchieveNote(note) {
    archieveNote({ note_id: note._id })
      .then(res => {
        notesDispatch({ type: "UPDATE_NOTE", payload: { _id: note._id } });
      })
      .catch(err => {});
  }

  return (
    <div>
      {userState.sidebar === "Notes" && (
        <CreateNote
          loadDetails={() => {
            loadList();
          }}
        />
      )}
      {userState.view === "list" ? (
        <NotesListView
          sidebar={userState.sidebar ? userState.sidebar : "Notes"}
          list={notesState.notes}
          handleArchieveNote={handleArchieveNote}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      ) : (
        <NotesGridView
          sidebar={userState.sidebar ? userState.sidebar : "Notes"}
          list={notesState.notes}
          handleArchieveNote={handleArchieveNote}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
}
