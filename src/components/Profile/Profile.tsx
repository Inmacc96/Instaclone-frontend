import { Grid, Image, Modal } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import UserNotFound from "../UserNotFound";
import AvatarForm from "../User/AvatarForm";
import ModalBasic from "../Modal/ModalBasic";
import ImageNoFound from "../../assets/png/avatar.png";
import "./Profile.scss";
import { useState } from "react";

interface IProfileProps {
  username?: string;
}

const Profile = ({ username }: IProfileProps) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState<JSX.Element | null>(null);
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <UserNotFound />;

  const { getUser } = data!;

  console.log(getUser);

  const handlerModal = (type: string) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(<AvatarForm />);
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid className="profile">
        <Grid.Column width={5} className="profile__left">
          <Image src={ImageNoFound} avatar onClick={() => handlerModal("avatar")} />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <div>HeaderProfile</div>
          <div>Followers</div>
          <div className="other">
            <p className="name">{getUser!.name}</p>
            {getUser?.siteWeb && (
              <a href={getUser?.siteWeb} className="siteWeb" target="_blank">
                {getUser?.siteWeb}
              </a>
            )}
            {getUser?.description && (
              <p className="description">{getUser.description}</p>
            )}
          </div>
        </Grid.Column>
      </Grid>

      <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
        {childrenModal}
      </ModalBasic>
    </>
  );
};

export default Profile;
