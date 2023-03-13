import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import IconPopup from "../../IconPopup";
import { newUser } from "../../../types/auth";
import { SIGNUP_USER } from "../../../gql/user";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const [newUser] = useMutation(SIGNUP_USER);

  const initialValues: newUser = {
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
        const { data } = await newUser({
          variables: {
            input: { name, username, email, password },
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <h2 className="signup-form-title">
        Sign up to see photos and videos of your friends
      </h2>
      <Form className="signup-form" onSubmit={formik.handleSubmit}>
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
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && !!formik.errors.password}
          icon={
            formik.touched.password &&
            !!formik.errors.password && (
              <IconPopup message={formik.errors.password} />
            )
          }
        />
        <Form.Input
          type="password"
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
            formik.touched.repeatpassword &&
            !!formik.errors.repeatpassword && (
              <IconPopup message={formik.errors.repeatpassword} />
            )
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
