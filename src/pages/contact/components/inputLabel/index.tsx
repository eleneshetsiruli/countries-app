import styles from "./inputLabel.module.css";
interface InputLabelBoxProps {
  label: string;
  type: string;
}

export const InputLabelBox = ({ label, type }: InputLabelBoxProps) => {
  return (
    <div className={styles.box}>
      <label htmlFor={label}>{label}</label>
      <input type={type} name={label} id={label} />
    </div>
  );
};
