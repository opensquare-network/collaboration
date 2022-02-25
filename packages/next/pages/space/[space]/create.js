import Layout from "components/layout";
import Nav from "components/nav";
import PostCreate from "@/components/postCreate";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { setAvailableNetworks } from "../../../store/reducers/accountSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import pick from "lodash/pick";

export default function Create({ space }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          []
      )
    );
  }, [dispatch, space]);

  return (
    <Layout bgHeight="183px" space={space}>
      <Nav
        data={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}`, back: true },
          { name: "New Post" },
        ]}
      />
      <PostCreate space={space} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;

  const [{ result: space }] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      space: space ?? null,
    },
  };
}
