import * as Yup from "yup";

const createValidationSchema = (fields) => {
  const shape = fields.reduce((acc, field) => {
    let validator = Yup.string();
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
