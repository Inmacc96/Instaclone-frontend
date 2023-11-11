import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWINGS } from "../../../../gql/follow";
import ModalBasic from "../../../Modal/ModalBasic";
import "./Followers.scss";
import UsersList from "../../UsersList";

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
  const { data: dataFollowings, loading: loadingFollowings } = useQuery(
    GET_FOLLOWINGS,
    {
      variables: { username },
    }
  );

  if (loadingFollowers || loadingFollowings) return null;

  const { getFollowers } = dataFollowers!;
  const { getFollowings } = dataFollowings!;

  const openFollowers = () => {
    setTitleModal("Followers");
    setChildrenModal(
      <UsersList users={getFollowers} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  const openFollowings = () => {
    setTitleModal("Followings");
    setChildrenModal(
      <UsersList users={getFollowings} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <>
      <div className="followers">
        <p>
          <span>50</span> posts
        </p>
        <p className="link" onClick={openFollowers}>
          <span>{getFollowers.length}</span> followers
        </p>
        <p className="link" onClick={openFollowings}>
          <span>{getFollowings.length}</span> followings
        </p>
      </div>
      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Followers;
