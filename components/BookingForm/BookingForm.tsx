"use client";

import { Form, Formik, type FormikHelpers } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Button } from "@/components/Button/Button";
import { TextField } from "@/components/TextField/TextField";
import { sendBookingRequest } from "@/lib/api/campers";
import type { BookingRequest } from "@/types/camper";
import styles from "./BookingForm.module.css";

const schema = Yup.object({
  name: Yup.string().trim().min(2, "Name is too short.").required("Please enter your name."),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email, e.g. john@example.com.")
    .required("Please enter your email."),
});

const initialValues: BookingRequest = { name: "", email: "" };

interface BookingFormProps {
  camperId: string;
  camperName: string;
}

export function BookingForm({ camperId, camperName }: BookingFormProps) {
  const handleSubmit = async (
    values: BookingRequest,
    { resetForm }: FormikHelpers<BookingRequest>,
  ) => {
    try {
      await sendBookingRequest(camperId, {
        name: values.name.trim(),
        email: values.email.trim(),
      });
      toast.success(`Thanks, ${values.name.trim()}! Your request for ${camperName} has been sent.`);
      resetForm();
    } catch {
      toast.error("We couldn't send your request. Please try again.");
    }
  };

  return (
    <section className={styles.card} aria-labelledby="booking-title">
      <div className={styles.heading}>
        <h2 id="booking-title" className={styles.title}>
          Book your campervan now
        </h2>
        <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={styles.form} noValidate>
            <div className={styles.fields}>
              <TextField name="name" label="Name*" autoComplete="name" />
              <TextField name="email" label="Email*" type="email" autoComplete="email" />
            </div>
            <Button type="submit" block disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
