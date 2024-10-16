import styles from "./inputLabel.module.css";
interface InputLabelBoxProps {
  label: string;
  type: string;
  value: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputLabelBox = ({
  label,
  type,
  onchange,
  value,
}: InputLabelBoxProps) => {
  return (
    <div className={styles.box}>
      <label htmlFor={label}>{label}</label>
      <input
        onChange={onchange}
        type={type}
        name={label}
        id={label}
        value={value || ""}
      />
    </div>
  );
};
