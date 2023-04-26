import "./Home.scss";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  console.log(auth);
  return <h1>Home</h1>;
};

export default Home;
