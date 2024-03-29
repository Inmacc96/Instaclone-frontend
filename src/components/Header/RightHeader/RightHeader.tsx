import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ModalUpload from "../../Modal/ModalUpload";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./RightHeader.scss";

const RightHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username: auth?.username },
  });

  if (loading || error) {
    return null;
  }
  const { getUser } = data!;

  return (
    <>
      <div className="right-header">
        <Link to="/">
          <Icon name="home" />
        </Link>
        <Icon
          name="plus"
          onClick={() => {
            setShowModal(true);
          }}
        />
        <Link to={`/${auth?.username}`}>
          <Image src={getUser?.avatar || ImageNoFound} avatar />
        </Link>
      </div>
      <ModalUpload show={showModal} setShow={setShowModal} />
    </>
  );
};

export default RightHeader;
