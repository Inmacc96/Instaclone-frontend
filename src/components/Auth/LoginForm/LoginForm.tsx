import { Button, Form } from "semantic-ui-react";
import "./LoginForm.scss";

const LoginForm = () => {
  return (
    <>
      <h2 className="login-form-title">
        Log in to see photos and videos of your friends
      </h2>
      <Form className="login-form">
        <Form.Input
          type="text"
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
        />
        <Button type="submit" className="btn-submit">
          Log In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
