import Layout from "components/layout";
import Home from "components/home";
import { withLoginUser, withLoginUserRedux } from "../lib";

export default withLoginUserRedux(({ account }) => {
  return (
    <Layout bgHeight="183px">
      <Home />
    </Layout>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  return {
    props: {},
  };
});
