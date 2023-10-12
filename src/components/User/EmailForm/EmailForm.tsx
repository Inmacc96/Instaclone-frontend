import { Form, Button } from "semantic-ui-react";
import "./EmailForm.scss";
import {
  INITIAL_ERRORS_CHANGE_EMAIL,
  INITIAL_TOUCHED_FIELDS_CHANGE_EMAIL,
  VALIDATIONS_CHANGE_EMAIL,
} from "../../../utils/constants";
import {
  ChangeEmailFormData,
  ChangeEmailFormTouched,
  ValidateChangeEmail,
} from "../../../types/forms";
import useForm from "../../../hooks/useForm";
import IconPopup from "../../IconPopup";

interface EmailFormProps {
  setShowModal: (v: boolean) => void;
  currentEmail: string;
}

const EmailForm = ({ setShowModal, currentEmail }: EmailFormProps) => {
  const { formData, handleChange, errorsForm, handleBlur, onSubmit } = useForm<
    ChangeEmailFormData,
    ChangeEmailFormTouched,
    ValidateChangeEmail
  >(
    { email: currentEmail },
    INITIAL_ERRORS_CHANGE_EMAIL,
    INITIAL_TOUCHED_FIELDS_CHANGE_EMAIL,
    VALIDATIONS_CHANGE_EMAIL,
    handleSubmit
  );

  async function handleSubmit() {}

  return (
    <Form className="email-form" onSubmit={onSubmit}>
      <Form.Input
        type="text"
        name="email"
        placeholder="Write your new email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")}
        error={!!errorsForm.email}
        icon={!!errorsForm.email && <IconPopup message={errorsForm.email} />}
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
};

export default EmailForm;
