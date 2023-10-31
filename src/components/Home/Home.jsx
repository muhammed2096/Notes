import React, { useContext, useEffect, useState } from "react";
import { noteContext } from "../../context/NoteContext";
import { authContext } from "../../context/AuthContext";

function Home() {
  
  let { getAllNotes, Notes, getDeleteModal, showUpdatemodal } =
    useContext(noteContext);
  let { token } = useContext(authContext);

  useEffect(() => {
    getAllNotes(token);
  }, []);

  return (
    <div className="container vh-100 my-5">
      {Notes === null ? (
        <button className="btn bg-main text-white">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </button>
      ) : Notes?.length === 0 ? (
        <h2>No Notes here yet :D</h2>
      ) : (
        <div className="row g-5 ">
          {Notes?.map((note) => (
            <div key={note._id} className="col-md-4">
              <div className="card shadow">
                <i className="fa-solid fa-thumbtack text-center mt-2 text-main "></i>
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>
                  <p className="card-text">{note.content}</p>
                  <div className="note-footer">
                    <i
                      className="fa-solid text-main fa-pen-to-square pointer me-2"
                      onClick={() =>
                        showUpdatemodal({
                          prevContent: note.content,
                          prevTitle: note.title,
                          noteID: note._id,
                          token,
                        })
                      }
                    ></i>
                    <i
                      className="fa-solid  fa-trash text-danger pointer"
                      onClick={() =>
                        getDeleteModal({ token, noteID: note._id })
                      }
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
