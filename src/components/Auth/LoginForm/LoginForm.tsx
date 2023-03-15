import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Form, Icon } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { AUTH_USER } from "../../../gql/user";
import IconPopup from "../../IconPopup";
import { AuthInput } from "../../../__generated__/graphql";
import { decodeToken, setToken } from "../../../utils/token";
import useAuth from "../../../hooks/useAuth";
import "./LoginForm.scss";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authUser] = useMutation(AUTH_USER);

  const { setUser } = useAuth();

  const initialValues: AuthInput = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("This email is not valid")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await authUser({
          variables: {
            input: values,
          },
        });

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
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <h2 className="login-form-title">
        Log in to see photos and videos of your friends
      </h2>
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && !!formik.errors.email}
          icon={
            formik.touched.email &&
            !!formik.errors.email && <IconPopup message={formik.errors.email} />
          }
        />
        <Form.Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          icon={
            <div className="container-icon-password">
              {formik.touched.password && !!formik.errors.password && (
                <IconPopup message={formik.errors.password} />
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
