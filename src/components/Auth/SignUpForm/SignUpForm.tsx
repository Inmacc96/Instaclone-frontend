import { Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { ApolloError, useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../../gql/user";
import useForm from "../../../hooks/useForm";
import useTogglePassword from "../../../hooks/useTogglePassword";
import IconPopup from "../../IconPopup";
import {
  SignUpFormData,
  SignUpFormTouched,
  ValidateSignUpForm,
} from "../../../types/auth";
import {
  INITIAL_ERRORS_SIGNUP,
  INITIAL_TOUCHED_FIELDS_SIGNUP,
  INITIAL_VALUES_SIGNUP,
  VALIDATIONS_SIGNUP,
} from "../../../utils/constants";
import "./SignUpForm.scss";

type SignUpProps = {
  handleShowLogin: (isShow: boolean) => void;
};

const SignUpForm = ({ handleShowLogin }: SignUpProps) => {
  const {
    formData,
    errorsForm,
    handleChange,
    handleBlur,
    onSubmit,
    resetForm,
  } = useForm<SignUpFormData, SignUpFormTouched, ValidateSignUpForm>(
    INITIAL_VALUES_SIGNUP,
    INITIAL_ERRORS_SIGNUP,
    INITIAL_TOUCHED_FIELDS_SIGNUP,
    VALIDATIONS_SIGNUP,
    handleSubmit
  );
  const [newUser] = useMutation(SIGNUP_USER);
  const { showPassword, toggleShowPassword } = useTogglePassword();
  const {
    showPassword: showRepeatPassword,
    toggleShowPassword: toggleShowRepeatPassword,
  } = useTogglePassword();

  async function handleSubmit() {
    // Enviar los datos al backend
    const { name, username, email, password } = formData;
    try {
      await newUser({
        variables: {
          input: { name, username, email, password },
        },
      });
      toast.success("Successfully registered user");
      resetForm();
      handleShowLogin(true);
    } catch (error) {
      const err = error as ApolloError;
      toast.error(err.message);
    }
  }

  return (
    <>
      <h2 className="signup-form-title">
        Sign up to see photos and videos of your friends
      </h2>
      <Form className="signup-form" onSubmit={onSubmit}>
        <Form.Input
          type="text"
          name="name"
          placeholder="Name and surname"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          error={!!errorsForm.name}
          icon={!!errorsForm.name && <IconPopup message={errorsForm.name} />}
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={() => handleBlur("username")}
          error={!!errorsForm.username}
          icon={
            !!errorsForm.username && <IconPopup message={errorsForm.username} />
          }
        />
        <Form.Input
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          error={!!errorsForm.email}
          icon={!!errorsForm.email && <IconPopup message={errorsForm.email} />}
        />
        <Form.Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={!!errorsForm.password}
          icon={
            <div className="container-icon-password">
              {!!errorsForm.password && (
                <IconPopup message={errorsForm.password} />
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
          type={showRepeatPassword ? "text" : "password"}
          name="repeatpassword"
          placeholder="Repeat Password"
          autoComplete="repeat-password"
          value={formData.repeatpassword}
          onChange={handleChange}
          onBlur={() => handleBlur("repeatpassword")}
          error={!!errorsForm.repeatpassword}
          icon={
            <div className="container-icon-password">
              {!!errorsForm.repeatpassword && (
                <IconPopup message={errorsForm.repeatpassword} />
              )}
              <Icon
                aria-label="Toggle password visibility"
                name={showRepeatPassword ? "eye slash" : "eye"}
                link
                onClick={toggleShowRepeatPassword}
              />
            </div>
          }
        />
        <Button type="submit" className="btn-submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
