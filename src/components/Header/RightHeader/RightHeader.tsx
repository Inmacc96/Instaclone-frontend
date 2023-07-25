import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";
import useAuth from "../../../hooks/useAuth";

const RightHeader = () => {
  const { auth } = useAuth();
  return (
    <div className="right-header">
      <Link to="/">
        <Icon name="home" />
      </Link>
      <Icon name="plus" />
      <Link to={`/${auth?.username}`}>
        <Image src={ImageNoFound} avatar />
      </Link>
    </div>
  );
};

export default RightHeader;
