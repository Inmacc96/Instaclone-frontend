import { Search as SearchSU } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../../../gql/user";
import "./Search.scss";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { data, loading } = useQuery(SEARCH_USERS, { variables: { search } });

  console.log(data);
  return (
    <SearchSU
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      value={search}
      onSearchChange={(e, data) => setSearch(data.value || undefined)}
      loading={loading}
    />
  );
};

export default Search;
