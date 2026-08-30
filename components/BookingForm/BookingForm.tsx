"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { sendBookingRequest } from "@/lib/api/clientApi";
import styles from "./BookingForm.module.css";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

interface BookingFormProps {
  camperId: string;
}

interface BookingFormValues {
  name: string;
  email: string;
}

export function BookingForm({ camperId }: BookingFormProps) {
  const initialValues: BookingFormValues = {
    name: "",
    email: "",
  };

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>
        Stay connected, we are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await sendBookingRequest(camperId, {
              name: values.name,
              email: values.email,
            });

            toast.success(
              response.message || "Booking request sent successfully!",
            );
            resetForm();
          } catch {
            toast.error("Failed to send booking request. Please try again.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.inputField}>
              <div
                className={`${styles.inputWrapper} ${
                  errors.name && touched.name ? styles.inputError : ""
                }`}
              >
                <Field
                  type="text"
                  name="name"
                  placeholder="Name*"
                  className={styles.input}
                />
                {errors.name && touched.name && (
                  <span className={styles.errorIcon}>!</span>
                )}
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className={styles.errorMessage}
              />
            </div>

            <div className={styles.inputField}>
              <div
                className={`${styles.inputWrapper} ${
                  errors.email && touched.email ? styles.inputError : ""
                }`}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className={styles.input}
                />
                {errors.email && touched.email && (
                  <span className={styles.errorIcon}>!</span>
                )}
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={styles.errorMessage}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
