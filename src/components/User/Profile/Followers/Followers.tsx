import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import "./Followers.scss";

interface FollowersProps {
  username: string;
}

const Followers = ({ username }: FollowersProps) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState<JSX.Element | null>(null);
  const { data: dataFollowers, loading: loadingFollowers } = useQuery(
    GET_FOLLOWERS,
    {
      variables: { username },
    }
  );

  const openFollowers = () => {
    setTitleModal("Followers");
    setShowModal(true);
    setChildrenModal(
      <div>
        <h3>Lista de seguidore</h3>
      </div>
    );
  };

  if (loadingFollowers) return null;

  const { getFollowers } = dataFollowers!;
  return (
    <>
      <div className="followers">
        <p>
          <span>50</span> posts
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{getFollowers.length}</span> followers
        </p>
        <p className="link">
          <span>240</span> followings
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Followers;
