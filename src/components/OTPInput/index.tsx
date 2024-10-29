import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './otpStyle.module.css';

interface OTPIndexProps {
    quantity: number;
}

export const OTPIndex = ({ quantity }: OTPIndexProps) => {
    const [inputs, setInputs] = useState(
        Array.from({ length: quantity }, () => ({ value: '' })),
    );

    const [error, setError] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChangeInputs = (ev: ChangeEvent<HTMLInputElement>) => {
        const index = ev.target.dataset.index;

        if (index !== undefined) {
            const idx = +index;
            const newInputs = [...inputs];
            const inputValue = ev.target.value;

            if (/^\d*$/.test(inputValue)) {
                newInputs[idx].value = inputValue;
                setError(false);
                setInputs(newInputs);

                if (idx === inputs.length - 1 && inputValue) {
                    inputRefs.current[idx]?.blur();
                } else if (inputValue && idx < inputs.length - 1) {
                    inputRefs.current[idx + 1]?.focus();
                }
            } else {
                setError(true);
            }
        }
    };

    const handleClick = () => {
        const firstEmptyIndex = inputs.findIndex((input) => input.value === '');
        if (firstEmptyIndex !== -1) {
            inputRefs.current[firstEmptyIndex]?.focus();
        }
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        const index = ev.currentTarget.dataset.index;
        if (index !== undefined) {
            const idx = +index;

            if (ev.key === 'Backspace' && inputs[idx].value === '') {
                if (idx > 0) {
                    inputRefs.current[idx - 1]?.focus();
                }
            }
        }
    };

    const handlePaste = (ev: React.ClipboardEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const index = ev.currentTarget.dataset.index;

        if (index !== undefined) {
            const idx = +index;
            const pastedData = ev.clipboardData.getData('text');
            const numericData = pastedData.replace(/\D/g, '');
            const newInputs = [...inputs];

            for (
                let i = 0;
                i < numericData.length && idx + i < inputs.length;
                i++
            ) {
                newInputs[idx + i].value = numericData[i];
            }

            setInputs(newInputs);

            for (let i = idx; i < inputs.length; i++) {
                if (newInputs[i].value === '') {
                    inputRefs.current[i]?.focus();
                    break;
                }
            }
        }
    };

    return (
        <>
            <button onClick={handleClick}>OTP code</button>
            <div className={styles.inputBox}>
                {inputs.map((inpElement, i) => (
                    <input
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        onChange={handleChangeInputs}
                        key={i}
                        value={inpElement.value}
                        data-index={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                    />
                ))}
            </div>
            <p className={styles.error}>{error ? 'only Numbers' : ''}</p>
        </>
    );
};
