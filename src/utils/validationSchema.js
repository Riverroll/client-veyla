import * as Yup from "yup";

const createValidationSchema = (fields) => {
  // Menggunakan reduce untuk membangun objek validasi
  const shape = fields.reduce((acc, field) => {
    let validator = Yup.string();

    // Jika field bersifat wajib, tambahkan aturan required
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }
    return {
      ...acc,
      [field.name]: validator,
    };
  }, {});
  return Yup.object().shape(shape);
};

export default createValidationSchema;
