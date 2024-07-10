import * as yup from 'yup';

export const validateRegister = (data:any) => {
  const schema = yup.object().shape({
    username: yup.string().min(3).max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(50).required(),
  });

  return schema.validate(data);
};

export const validateLogin = (data:any) => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(50).required(),
  });

  return schema.validate(data);
};
