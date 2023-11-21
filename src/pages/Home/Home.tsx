import { Grid } from "semantic-ui-react";
import "./Home.scss";

const Home = () => {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <h2>Feed</h2>
      </Grid.Column>
      <Grid.Column className="home__right" width={5}>
        <h2>Usuario no seguidos</h2>
      </Grid.Column>
    </Grid>
  );
};

export default Home;

