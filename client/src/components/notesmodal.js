import React from 'react';
import Flashcards from './flashcards';
import QuizSelectionMenu from './quiz.js'; // Corrected import statement
import './notesmodal.scss';
import { Modal } from 'flowbite-react';

export default function NotesModal({ openNoteModal, setOpenNoteModal }) {
  const handleCloseModal = () => {
    setOpenNoteModal(false);
  };

  return (
    <Modal show={openNoteModal} size="md" onClose={handleCloseModal}>
      <div className="modal1">
        <div className="close-button" onClick={handleCloseModal}>
          Close
        </div>
        <div className="title">Flashcards</div>
        <Flashcards />
        <div className="title">Quizzes</div>
        <QuizSelectionMenu />
      </div>
    </Modal>
  );
}
