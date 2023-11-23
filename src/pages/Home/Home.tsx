import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed";
import UsersNotFollowings from "../../components/Home/UsersNotFollowings";
import "./Home.scss";

const Home = () => {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <UsersNotFollowings />
      </Grid.Column>
    </Grid>
  );
};

export default Home;
