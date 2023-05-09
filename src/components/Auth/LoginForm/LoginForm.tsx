import { Button, Form, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../../../gql/user";
import useForm from "../../../hooks/useForm";
import useTogglePassword from "../../../hooks/useTogglePassword";
import useAuth from "../../../hooks/useAuth";
import IconPopup from "../../IconPopup/IconPopup";
import { decodeToken, setToken } from "../../../utils/token";
import {
  LogInFormData,
  LogInFormTouched,
  ValidateLogInForm,
} from "../../../types/auth";
import {
  INITIAL_ERRORS_LOGIN,
  INITIAL_TOUCHED_FIELDS_LOGIN,
  INITIAL_VALUES_LOGIN,
  VALIDATIONS_LOGIN,
} from "../../../utils/constants";
import "./LoginForm.scss";

const LoginForm = () => {
  const {
    formData,
    errorsForm,
    handleBlur,
    handleChange,
    onSubmit,
    resetForm,
  } = useForm<LogInFormData, LogInFormTouched, ValidateLogInForm>(
    INITIAL_VALUES_LOGIN,
    INITIAL_ERRORS_LOGIN,
    INITIAL_TOUCHED_FIELDS_LOGIN,
    VALIDATIONS_LOGIN,
    handleSubmit
  );
  const { showPassword, toggleShowPassword } = useTogglePassword();
  const [authUser] = useMutation(AUTH_USER);
  const { setUser } = useAuth();

  async function handleSubmit() {
    try {
      const { data } = await authUser({
        variables: {
          input: formData,
        },
      });

      resetForm();
      if (data?.authUser?.token) {
        const token = data.authUser.token;
        setToken(token);
        setUser(decodeToken(token));
      } else {
        throw new Error("Mutation did not return a valid token");
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  }

  return (
    <>
      <h2 className="login-form-title">
        Log in to see photos and videos of your friends
      </h2>

      <Form data-testid="login-form" className="login-form" onSubmit={onSubmit}>
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
          autoComplete="password"
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
        <Button type="submit" className="btn-submit">
          Log In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
