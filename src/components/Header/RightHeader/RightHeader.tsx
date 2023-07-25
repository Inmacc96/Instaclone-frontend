import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";

const RightHeader = () => {
  return (
    <div className="right-header">
      <Link to="/">
        <Icon name="home" />
      </Link>
      <Icon name="plus" />
      <Link to="/">
        <Image src={ImageNoFound} avatar />
      </Link>
    </div>
  );
};

export default RightHeader;
