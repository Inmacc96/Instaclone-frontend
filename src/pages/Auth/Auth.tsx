import { Container, Image } from "semantic-ui-react";
import SignUpForm from "../../components/Auth/SignUpForm";
import instaclone from "../../assets/png/instaclone.png";
import "./Auth.scss";
import { useState } from "react";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = (isShow: boolean) => {
    setShowLogin(isShow);
  };

  return (
    <Container fluid className="auth">
      <Image src={instaclone} />

      <div className="container-form">
        {showLogin ? (
          <p>Login form</p>
        ) : (
          <SignUpForm handleShowLogin={handleShowLogin} />
        )}
      </div>

      <div className="change-form">
        {showLogin ? (
          <p>
            Don't have an account?
            <span onClick={() => handleShowLogin(!showLogin)}>Sign up</span>
          </p>
        ) : (
          <p>
            Log in with your account!
            <span onClick={() => handleShowLogin(!showLogin)}>Log in</span>
          </p>
        )}
      </div>
    </Container>
  );
};

export default Auth;
