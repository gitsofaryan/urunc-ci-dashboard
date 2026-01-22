import React from 'react';
import Modal from 'react-modal';

interface TestDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  testResult: {
    id: string;
    name: string;
    status: string;
    duration: number;
    logs: string;
  } | null;
}

const TestDetailModal: React.FC<TestDetailModalProps> = ({ isOpen, onRequestClose, testResult }) => {
  if (!testResult) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Test Detail">
      <h2>{testResult.name}</h2>
      <p>Status: {testResult.status}</p>
      <p>Duration: {testResult.duration} ms</p>
      <h3>Logs</h3>
      <pre>{testResult.logs}</pre>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default TestDetailModal;