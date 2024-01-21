import Flashcards from './flashcards';
import './notesmodal.scss';
import { Modal } from 'flowbite-react';

export default function NotesModal({openNoteModal, setOpenNoteModal}) {
    return (
        <Modal show={openNoteModal} size="md" onClose={() => setOpenNoteModal(false)}>
            <div class="modal1">
                <div class="title">Flashcards</div>
                <Flashcards />
                <div class="title">Quizzes</div>
                <div onClick={() => setOpenNoteModal(false)}>close modal</div>
            </div>
        </Modal>
    );
}