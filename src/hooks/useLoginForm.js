import { useState } from "react";
import * as Yup from "yup";

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

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
