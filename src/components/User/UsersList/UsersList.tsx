import { Image } from "semantic-ui-react";
import { User } from "../../../__generated__/graphql";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./UsersList.scss";

interface UserListProps {
  users: Pick<User, "id" | "username" | "name" | "avatar">[];
  setShowModal: (v: boolean) => void;
}

const UsersList = ({ users, setShowModal }: UserListProps) => {
  return (
    <div className="users-list">
      {users.length === 0 ? (
        <p className="users-list__not-users">No se han encontrado usuarios</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="users-list__user">
            <Image src={user.avatar ?? ImageNoFound} avatar />
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UsersList;
