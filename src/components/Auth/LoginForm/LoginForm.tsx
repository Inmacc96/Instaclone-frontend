import { useFormik } from "formik";
import { Button, Form } from "semantic-ui-react";
import { AuthInput } from "../../../__generated__/graphql";
import "./LoginForm.scss";

const LoginForm = () => {
  const initialValues: AuthInput = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: null,
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button type="submit" className="btn-submit">
          Log In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
