import { Search as SearchSU } from "semantic-ui-react";
import "./Search.scss";

const Search = () => {
  return (
    <SearchSU
      className="search-users"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
    />
  );
};

export default Search;
