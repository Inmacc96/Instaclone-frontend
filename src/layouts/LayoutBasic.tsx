import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";

interface ILayoutBasicProps {
  children?: JSX.Element;
}

const LayoutBasic = ({ children }: ILayoutBasicProps) => {
  return (
    <>
      <h1>MENU LAYOUT</h1>

      <Container className="layout-basic">
        {children ?? <Outlet />}
      </Container>
    </>
  );
};

export default LayoutBasic;
