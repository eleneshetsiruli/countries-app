export interface Errors {
    [key: string]: string;
}

export interface FormValues {
    სახელი: string;
    გვარი: string;
    email: string;
    შეტყობინება: string;
}

export interface State {
    formValues: FormValues;
    errors: Errors;
}

export type Action =
    | { type: 'SET_VALUE'; payload: { name: string; value: string } }
    | { type: 'SET_ERRORS'; payload: Errors }
    | { type: 'RESET_FORM' };
