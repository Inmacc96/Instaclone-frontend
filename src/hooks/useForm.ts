import { useEffect, useState } from "react";

const useForm = <
  T extends Record<keyof T, string>,
  U extends Record<keyof T, boolean>,
  V extends Record<keyof T, any>
>(
  initialValues: T,
  initialErrors: T,
  initialTouched: U,
  validations: V,
  handleSubmit: () => void
) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errorsForm, setErrorsForm] = useState<T>(initialErrors);
  const [touchedFields, setTouchedFields] = useState<U>(initialTouched);
  const [submitForm, setSubmitForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields({ ...touchedFields, [fieldName]: true });
  };

  const validateFields = () => {
    const errors: T = {} as T;

    for (const fieldName in formData) {
      if (touchedFields[fieldName]) {
        const validationFn = validations[fieldName];

        errors[fieldName] = validationFn(formData);
      }
    }

    return errors;
  };

  useEffect(() => {
    const newErrors = validateFields();
    setErrorsForm(newErrors);
  }, [formData, touchedFields]);

  useEffect(() => {
    if (submitForm) {
      if (Object.values(errorsForm).every((value) => value === "")) {
        handleSubmit();
      }

      setSubmitForm(false);
    }
  }, [errorsForm]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const touchedFieldsUpdated = Object.fromEntries(
      Object.keys(touchedFields).map((key) => [key, true])
    ) as U;
    setTouchedFields(touchedFieldsUpdated);

    setSubmitForm(true);
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrorsForm(initialErrors);
    setTouchedFields(initialTouched);
  };

  return {
    formData,
    errorsForm,
    handleChange,
    handleBlur,
    onSubmit,
    resetForm,
  };
};

export default useForm;
