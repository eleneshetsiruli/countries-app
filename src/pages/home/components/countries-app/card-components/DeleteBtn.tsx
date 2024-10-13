import styles from "../CountriesCard.module.css";
interface DeleteBtnProps {
  removeCountry: () => void;
}

export const DeleteBtn = ({ removeCountry }: DeleteBtnProps) => {
  return (
    <button onClick={removeCountry} className={styles.deleteBtn}>
      DELETE
    </button>
  );
};
