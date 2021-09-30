import Layout from "components/layout";
import Home from "components/home";
import { withLoginUser, withLoginUserRedux } from "../lib";
import { ssrNextApi } from "services/nextApi";

export default withLoginUserRedux(({ spaces }) => {
  return (
    <Layout bgHeight="183px">
      <Home spaces={spaces} />
    </Layout>
  );
});

export const getServerSideProps = withLoginUser(async (context) => {
  const { result: spaces } = await ssrNextApi.fetch("spaces");
  return {
    props: {
      spaces: spaces || {},
    },
  };
});
