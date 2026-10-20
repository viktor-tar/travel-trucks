"use client";

import { useField } from "formik";
import { useId } from "react";
import { Icon } from "@/components/Icon/Icon";
import styles from "./TextField.module.css";

interface TextFieldProps {
  name: string;
  label: string;
  type?: "text" | "email";
  autoComplete?: string;
}

/**
 * Formik-connected input from the design: the label sits inside as a placeholder,
 * and on an error it moves onto the border next to a red message and icon.
 */
export function TextField({ name, label, type = "text", autoComplete }: TextFieldProps) {
  const [field, meta] = useField<string>(name);
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = Boolean(meta.touched && meta.error);

  return (
    <div className={styles.field}>
      <div className={hasError ? `${styles.control} ${styles.invalid}` : styles.control}>
        <input
          {...field}
          id={id}
          type={type}
          placeholder={label}
          autoComplete={autoComplete}
          required
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={styles.input}
        />
        <label htmlFor={id} className={hasError ? styles.chip : "visually-hidden"}>
          {label}
        </label>
        {hasError && <Icon id="error" size={24} className={styles.icon} />}
      </div>
      {hasError && (
        <p id={errorId} className={styles.error}>
          {meta.error}
        </p>
      )}
    </div>
  );
}
