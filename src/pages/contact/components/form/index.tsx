import { FormEvent, KeyboardEvent } from "react";
import { InputLabelBox } from "../inputLabel";
import styles from "./form.module.css";

function handleChangeForm(ev: FormEvent<HTMLFormElement>) {
  ev.preventDefault();

  const formData = {
    სახელი: (ev.currentTarget["სახელი"] as HTMLInputElement).value,
    გვარი: (ev.currentTarget["გვარი"] as HTMLInputElement).value,
    email: (ev.currentTarget["email"] as HTMLInputElement).value,
    შეტყობინება: (ev.currentTarget["textar"] as HTMLTextAreaElement).value,
  };
  console.log(formData);
}

const handleKeyDown = (ev: KeyboardEvent<HTMLTextAreaElement>) => {
  if (ev.key === "Enter") {
    ev.preventDefault();
    const form = ev.currentTarget.form;

    if (form) {
      handleChangeForm({
        currentTarget: form,
        preventDefault: () => {},
      } as FormEvent<HTMLFormElement>);
    }
  }
};

export const FormContent = () => {
  return (
    <form onSubmit={handleChangeForm} className={styles.formContainer}>
      <InputLabelBox label="სახელი" type="text" />
      <InputLabelBox label="გვარი" type="text" />
      <InputLabelBox label="email" type="email" />
      <label htmlFor="textar">შეტყობინება</label>
      <textarea onKeyDown={handleKeyDown} name="textar" id="textar"></textarea>
      <button className={styles.submitBtn} type="submit">
        გაგზავნა
      </button>
    </form>
  );
};
