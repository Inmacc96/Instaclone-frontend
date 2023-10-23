import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchSU, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../../../gql/user";
import ImageNoFound from "../../../assets/png/avatar.png";
import "./Search.scss";

interface UserResult {
  key: string;
  title: string;
  username: string;
  avatar?: string | null;
}

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<UserResult[]>([]);
  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: { search: search },
  });

  useEffect(() => {
    if (data?.searchUsers && data?.searchUsers.length > 0) {
      const users = data.searchUsers.map((user) => ({
        key: user.id,
        title: user.name,
        username: user.username,
        avatar: user?.avatar,
      }));
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const cleanResultSelect = () => {
    setSearch("");
    setResults([]);
  };

  return (
    <SearchSU
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      value={search}
      onSearchChange={(e, data) => {
        setSearch(data.value ?? "");
      }}
      loading={loading}
      results={results}
      resultRenderer={(item) => <ResultSearch data={item as UserResult} />}
      onResultSelect={cleanResultSelect}
    />
  );
};

export default Search;

function ResultSearch({ data }: { data: UserResult }) {
  return (
    <Link className="search-users__item" to={`/${data.username}`}>
      <Image src={data.avatar ?? ImageNoFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}
