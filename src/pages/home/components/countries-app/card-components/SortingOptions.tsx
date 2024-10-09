import { ChangeEvent } from "react";
import styles from "../CountriesCard.module.css";

interface SortingOptionsProps {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SortingOptions: React.FC<SortingOptionsProps> = ({ onChange }) => {
  return (
    <select className={styles.selectContainer} onChange={onChange}>
      <option value="low">low to higth</option>
      <option value="hight">hight to low</option>
    </select>
  );
};
