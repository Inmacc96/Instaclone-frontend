import { Form, Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation } from "@apollo/client";
import IconPopup from "../../IconPopup";
import useForm from "../../../hooks/useForm";
import useTogglePassword from "../../../hooks/useTogglePassword";
import { UPDATE_USER } from "../../../gql/user";
import {
  INITIAL_ERRORS_CHANGE_PASSWORD,
  INITIAL_TOUCHED_FIELDS_CHANGE_PASSWORD,
  INITIAL_VALUES_CHANGE_PASSWORD,
  VALIDATIONS_CHANGE_PASSWORD,
} from "../../../utils/constants";
import {
  ChangePasswordFormData,
  ChangePasswordFormTouched,
  ValidateChangePassword,
} from "../../../types/forms";
import "./PasswordForm.scss";

interface PasswordFormProps {
  setShowModal: (v: boolean) => void;
}

const PasswordForm = ({ setShowModal }: PasswordFormProps) => {
  const { formData, errorsForm, handleChange, handleBlur, onSubmit } = useForm<
    ChangePasswordFormData,
    ChangePasswordFormTouched,
    ValidateChangePassword
  >(
    INITIAL_VALUES_CHANGE_PASSWORD,
    INITIAL_ERRORS_CHANGE_PASSWORD,
    INITIAL_TOUCHED_FIELDS_CHANGE_PASSWORD,
    VALIDATIONS_CHANGE_PASSWORD,
    handleSubmit
  );
  const { showPassword, toggleShowPassword } = useTogglePassword();
  const {
    showPassword: showNewPassowrd,
    toggleShowPassword: toggleShowNewPassword,
  } = useTogglePassword();
  const {
    showPassword: showRepeatNewPassowrd,
    toggleShowPassword: toggleShowRepeatNewPassword,
  } = useTogglePassword();
  const [updateUser] = useMutation(UPDATE_USER);

  async function handleSubmit() {
    try {
      const { oldPassword, newPassword } = formData;
      await updateUser({ variables: { input: { oldPassword, newPassword } } });
      toast.success("Password successfully updated");
      setShowModal(false);
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  }

  return (
    <Form className="password-form" onSubmit={onSubmit}>
      <Form.Input
        type={showPassword ? "text" : "password"}
        name="oldPassword"
        placeholder="Old Password"
        autoComplete="old-password"
        value={formData.oldPassword}
        onChange={handleChange}
        onBlur={() => handleBlur("oldPassword")}
        error={!!errorsForm.oldPassword}
        icon={
          <div className="container-icon-password">
            {!!errorsForm.oldPassword && (
              <IconPopup message={errorsForm.oldPassword} />
            )}
            <Icon
              aria-label="Toggle password visibility"
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={toggleShowPassword}
            />
          </div>
        }
      />
      <Form.Input
        type={showNewPassowrd ? "text" : "password"}
        name="newPassword"
        placeholder="New password"
        autoComplete="new-password"
        value={formData.newPassword}
        onChange={handleChange}
        onBlur={() => handleBlur("newPassword")}
        error={!!errorsForm.newPassword}
        icon={
          <div className="container-icon-password">
            {!!errorsForm.newPassword && (
              <IconPopup message={errorsForm.newPassword} />
            )}
            <Icon
              aria-label="Toggle password visibility"
              name={showNewPassowrd ? "eye slash" : "eye"}
              link
              onClick={toggleShowNewPassword}
            />
          </div>
        }
      />
      <Form.Input
        type={showRepeatNewPassowrd ? "text" : "password"}
        name="repeatNewPassword"
        placeholder="Repeat new password"
        autoComplete="repeat-new-password"
        value={formData.repeatNewPassword}
        onChange={handleChange}
        onBlur={() => handleBlur("repeatNewPassword")}
        error={!!errorsForm.repeatNewPassword}
        icon={
          <div className="container-icon-password">
            {!!errorsForm.repeatNewPassword && (
              <IconPopup message={errorsForm.repeatNewPassword} />
            )}
            <Icon
              aria-label="Toggle password visibility"
              name={showRepeatNewPassowrd ? "eye slash" : "eye"}
              link
              onClick={toggleShowRepeatNewPassword}
            />
          </div>
        }
      />
      <Button type="submit" className="btn-submit">
        Update
      </Button>
    </Form>
  );
};

export default PasswordForm;
