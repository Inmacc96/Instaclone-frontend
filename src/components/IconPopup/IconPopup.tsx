import { useEffect, useRef, useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import "./IconPopup.scss";

type CustomIconProps = {
  message: string;
};

const IconPopup = ({ message }: CustomIconProps) => {
  const [isOpenPopUp, setIsOpenPopUp] = useState(true);
  const popupTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsOpenPopUp(true);

    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }

    popupTimeoutRef.current = setTimeout(() => {
      setIsOpenPopUp(false);
    }, 3000);
  }, [message]);

  const handleMouseEnter = () => {
    setIsOpenPopUp(true);
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = undefined;
    }
  };

  const handleMouseLeave = () => {
    setIsOpenPopUp(false);
  };

  return (
    <Popup
      trigger={
        <Icon
          className="warning-icon"
          name="warning circle"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      }
      content={message}
      size="tiny"
      position="left center"
      inverted
      open={isOpenPopUp}
    />
  );
};

export default IconPopup;
