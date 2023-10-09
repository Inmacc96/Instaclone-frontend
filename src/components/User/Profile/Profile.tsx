import { useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GENERATE_UPLOAD_URL, GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import UserNotFound from "../../UserNotFound";
import AvatarForm from "../AvatarForm";
import ModalBasic from "../../Modal/ModalBasic";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./Profile.scss";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";

interface IProfileProps {
  username?: string;
}
const folder = "avatar";

const Profile = ({ username }: IProfileProps) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [childrenModal, setChildrenModal] = useState<JSX.Element | null>(null);
  const { auth } = useAuth();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER, {
    variables: { username },
  });
  const {
    data: uploadUrlData,
    loading: uploadUrlLoading,
    error: uploadUrlError,
  } = useQuery(GENERATE_UPLOAD_URL, { variables: { folder } });

  if (userLoading || uploadUrlLoading) return null;
  if (userError || uploadUrlError) return <UserNotFound />;

  const { getUser } = userData!;
  const { generateUploadUrl } = uploadUrlData!;

  const handlerModal = (type: string) => {
    switch (type) {
      case "avatar":
        setTitleModal("Cambiar foto de perfil");
        setChildrenModal(
          <AvatarForm
            setShowModal={setShowModal}
            generateUploadUrl={generateUploadUrl}
            userId={getUser?.id!}
          />
        );
        setShowModal(true);
        break;
      case "settings":
        setTitleModal("");
        setChildrenModal(<SettingsForm setShowModal={setShowModal} />);
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
          <Image
            src={getUser?.avatar || ImageNoFound}
            avatar
            onClick={() =>
              username === auth?.username && handlerModal("avatar")
            }
          />
        </Grid.Column>
        <Grid.Column width={11} className="profile__right">
          <HeaderProfile username={username} handlerModal={handlerModal} />
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
