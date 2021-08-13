import React, { useState } from "react";
import { useEffect } from "react";
import {
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

  // const [notes, setNotes] = useState([]);
  const { notesState, notesDispatch } = useNote();
  /**
   *
   */
  function loadList() {
    // getTrashNotes()
    //   .then(function (res) {
    //     notesDispatch({ type: "GET_NOTES", payload: res.data.data });
    //   })
    //   .catch(err => {});
    getAllNotes()
      .then(function (res) {
        notesDispatch({ type: "GET_NOTES", payload: res.data.data });
      })
      .catch(err => {});
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

  return (
    <div>
      <CreateNote
        loadDetails={() => {
          loadList();
        }}
      />
      {userState.view === "list" ? (
        <NotesListView
          list={notesState.notes}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      ) : (
        <NotesGridView
          list={notesState.notes}
          handleDeleteNote={handleDeleteNote}
          handleUpdateNote={handleUpdateNote}
        />
      )}
    </div>
  );
}
