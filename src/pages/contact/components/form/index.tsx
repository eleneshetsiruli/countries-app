import { useReducer } from "react";
import { InputLabelBox } from "../inputLabel";
import styles from "./form.module.css";
import { Action, Errors, FormValues, State } from "./interfaces";
import { useParams } from "react-router-dom";
import { formTranslate } from "./translations";

const initialState = {
  formValues: {
    სახელი: "",
    გვარი: "",
    email: "",
    შეტყობინება: "",
  },
  errors: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.payload.name]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.name]: "",
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

export const FormContent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { lang } = useParams<string>();

  const currentLang: keyof typeof formTranslate = (
    lang === "en" || lang === "ka" ? lang : "en"
  ) as keyof typeof formTranslate;

  const content = formTranslate[currentLang];

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    dispatch({ type: "SET_VALUE", payload: { name, value } });
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    const { formValues } = state;

    for (const key in formValues) {
      if (!formValues[key as keyof FormValues]) {
        newErrors[key] = content.errorMess;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formValues.email && !emailRegex.test(formValues.email)) {
      newErrors.email = "ბრძანების ფორმატში უნდა იყოს";
    }

    return newErrors;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: validationErrors });
      return;
    }

    dispatch({ type: "RESET_FORM" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <InputLabelBox
        value={state.formValues.სახელი}
        label={content.name}
        type="text"
        onchange={handleChange}
      />
      {state.errors.სახელი && (
        <p className={styles.errorMessages}>{state.errors.სახელი}</p>
      )}

      <InputLabelBox
        value={state.formValues.გვარი}
        label={content.lastName}
        type="text"
        onchange={handleChange}
      />
      {state.errors.გვარი && (
        <p className={styles.errorMessages}>{state.errors.გვარი}</p>
      )}

      <InputLabelBox
        label={content.email}
        type="email"
        value={state.formValues.email}
        onchange={handleChange}
      />
      {state.errors.email && (
        <p className={styles.errorMessages}>{state.errors.email}</p>
      )}

      <label htmlFor="textar">{content.textAr}</label>
      <textarea
        value={state.formValues.შეტყობინება}
        onChange={handleChange}
        name="შეტყობინება"
        id="textar"
      ></textarea>
      {state.errors.შეტყობინება && (
        <p className={styles.errorMessages}>{state.errors.შეტყობინება}</p>
      )}

      <button className={styles.submitBtn} type="submit">
        {content.send}
      </button>
    </form>
  );
};
