import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import "./Profile.scss";

interface IProfileProps {
  username?: string;
}

const Profile = ({ username }: IProfileProps) => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });

  if (loading) return null;
  if (error) return <h1>Usuario no encontrado</h1>;

  const { getUser } = data!;

  console.log(getUser);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
