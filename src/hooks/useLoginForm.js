import { useState } from "react";
import * as Yup from "yup";

const useLoginForm = () => {
  // State untuk menyimpan nilai input email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State untuk menyimpan error validasi
  const [errors, setErrors] = useState({});

  // Skema validasi menggunakan Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  // Fungsi untuk memvalidasi input form
  const validate = async () => {
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  // Mengembalikan nilai dan fungsi yang diperlukan untuk mengelola form login
  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  };
};

export default useLoginForm;
