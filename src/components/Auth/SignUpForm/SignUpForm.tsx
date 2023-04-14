import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Icon } from "semantic-ui-react";
import { ApolloError, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import IconPopup from "../../IconPopup";
import { NewUser } from "../../../types/auth";
import { SIGNUP_USER } from "../../../gql/user";
import "./SignUpForm.scss";

type SignUpProp = {
  handleShowLogin: (isShow: boolean) => void;
};

const SignUpForm = ({ handleShowLogin }: SignUpProp) => {
  const [newUser] = useMutation(SIGNUP_USER);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const initialValues: NewUser = {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Your name is required"),
      username: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, "The username cannot contain spaces")
        .required("Username is required"),
      email: Yup.string()
        .email("This email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("repeatpassword")], "Passwords are not equal"),
      repeatpassword: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password")], "Passwords are not equal"),
    }),
    onSubmit: async (values) => {
      const { name, username, email, password } = values;
      try {
        await newUser({
          variables: {
            input: { name, username, email, password },
          },
        });
        toast.success("Successfully registered user");
        handleShowLogin(true);
      } catch (error) {
        const err = error as ApolloError;
        toast.error(err.message);
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <>
      <h2 className="signup-form-title">
        Sign up to see photos and videos of your friends
      </h2>
      <Form
        data-testid="signup-form"
        className="signup-form"
        onSubmit={formik.handleSubmit}
      >
        <Form.Input
          type="text"
          name="name"
          placeholder="Name and surname"
          autoComplete="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && !!formik.errors.name}
          icon={
            formik.touched.name &&
            !!formik.errors.name && <IconPopup message={formik.errors.name} />
          }
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="User name"
          autoComplete="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && !!formik.errors.username}
          icon={
            formik.touched.username &&
            !!formik.errors.username && (
              <IconPopup message={formik.errors.username} />
            )
          }
        />
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
          autoComplete="new-password"
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
                data-testid="eye-icon-password"
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
          autoComplete="new-password"
          value={formik.values.repeatpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatpassword && !!formik.errors.repeatpassword
          }
          icon={
            <div className="container-icon-password">
              {formik.touched.repeatpassword &&
                !!formik.errors.repeatpassword && (
                  <IconPopup message={formik.errors.repeatpassword} />
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
