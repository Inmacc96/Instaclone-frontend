import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import { newUser } from "../../../types/auth";
import "./SignUpForm.scss";


const SignUpForm = () => {
  const initialValues: newUser = {
    name: "",
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
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
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="User name"
          autoComplete="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
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
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Input
          type="password"
          name="repeatpassword"
          placeholder="Repeat Password"
          autoComplete="new-password"
          value={formik.values.repeatpassword}
          onChange={formik.handleChange}
        />
        <Button type="submit" className="btn-submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
