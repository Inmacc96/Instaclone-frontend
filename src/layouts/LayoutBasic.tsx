import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";

interface ILayoutBasicProps {
  children?: JSX.Element;
}

const LayoutBasic = ({ children }: ILayoutBasicProps) => {
  return (
    <>
      <Header />

      <Container className="layout-basic">{children ?? <Outlet />}</Container>
    </>
  );
};

export default LayoutBasic;
