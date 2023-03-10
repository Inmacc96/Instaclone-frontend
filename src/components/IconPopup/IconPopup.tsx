import { Icon, Popup } from "semantic-ui-react";
import "./IconPopup.scss";

type CustomIconProps = {
  message: string;
};

const IconPopup = ({ message }: CustomIconProps) => {
  return (
    <Popup
      trigger={<Icon className="warning-icon" name="warning circle" />}
      content={message}
      size="tiny"
      position="left center"
      inverted
    />
  );
};

export default IconPopup;
