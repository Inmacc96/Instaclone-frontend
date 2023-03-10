import { Form, Button } from "semantic-ui-react";
import "./SignUpForm.scss";

const SignUpForm = () => {
  const handleSubmit = () => {
    console.log("form submitted");
  };

  return (
    <>
      <h2 className="signup-form-title">
        Sign up to see photos and videos of your friends
      </h2>
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          name="name"
          placeholder="Name and surname"
          autoComplete="name"
        />
        <Form.Input
          type="text"
          name="username"
          placeholder="User name"
          autoComplete="username"
        />
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
          autoComplete="new-password"
        />
        <Form.Input
          type="password"
          name="repeatpassword"
          placeholder="Repeat Password"
          autoComplete="new-password"
        />
        <Button type="submit" className="btn-submit">
          Sign up
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
