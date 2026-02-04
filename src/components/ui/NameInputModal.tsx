import { useState } from 'react';
import styles from './NameInputModal.module.css';

interface NameInputModalProps {
  isOpen: boolean;
  onSubmit: (name: string) => void;
}

export function NameInputModal({ isOpen, onSubmit }: NameInputModalProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <label className={styles.label}>What is your name?</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          maxLength={20}
        />
        <button type="submit" className={styles.button} disabled={!name.trim()}>
          Confirm
        </button>
      </form>
    </div>
  );
}
