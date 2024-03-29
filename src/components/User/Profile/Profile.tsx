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
import Followers from "./Followers";
import { UploadType } from "../../../__generated__/graphql";

interface IProfileProps {
  username?: string;
  totalPosts: number;
}
const folder = "avatar";

const Profile = ({ username, totalPosts }: IProfileProps) => {
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
  } = useQuery(GENERATE_UPLOAD_URL, {
    variables: { folder, uploadType: UploadType.Avatar },
  });

  if (userLoading || uploadUrlLoading) return null;
  if (userError || uploadUrlError) return <UserNotFound />;

  const { getUser } = userData!;
  const { generateUploadUrl } = uploadUrlData!;

  const handlerModal = (type: string) => {
    switch (type) {
      case "avatar":
        setTitleModal("Change profile image");
        setChildrenModal(
          <AvatarForm
            setShowModal={setShowModal}
            generateUploadUrl={generateUploadUrl}
          />
        );
        setShowModal(true);
        break;
      case "settings":
        setTitleModal("");
        setChildrenModal(
          <SettingsForm
            setShowModal={setShowModal}
            setTitleModal={setTitleModal}
            setChildrenModal={setChildrenModal}
            user={getUser}
          />
        );
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
          <HeaderProfile
            username={getUser.username}
            handlerModal={handlerModal}
          />
          <Followers username={getUser.username} totalPosts={totalPosts} />
          <div className="other">
            <p className="name">{getUser.name}</p>
            {getUser?.website && (
              <a href={getUser?.website} className="webSite" target="_blank">
                {getUser?.website}
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
