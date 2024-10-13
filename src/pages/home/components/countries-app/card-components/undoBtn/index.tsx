import styles from "./undoBtn.module.css";

interface UndoButtonProps {
  handleUndo: (event: React.MouseEvent<HTMLButtonElement>) => void; // Ensure this matches the expected function signature
}

export const UndoBtn: React.FC<UndoButtonProps> = ({ handleUndo }) => {
  return (
    <button className={styles.undoBtn} onClick={handleUndo}>
      undo
    </button>
  );
};
