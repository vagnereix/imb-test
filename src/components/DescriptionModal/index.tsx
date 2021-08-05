import Modal from 'react-modal'

import { Close } from '../../assets/icons/js/close'

interface DescriptionModalProps {
    isOpen: boolean;
    description: string;
    onRequestClose: () => void;
}

export function DescriptionModal({ isOpen, onRequestClose, description }: DescriptionModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose}
                className="react-modal-close"
            >
              <Close />
            </button>
            
            <p>
              { description }
            </p>
        </Modal>
    )
}