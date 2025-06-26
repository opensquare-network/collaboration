import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import PostSettings from "../../../components/postSettings";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { pick } from "lodash-es";
import { useEffect } from "react";

export default function Settings({ space, settings, allNetworks }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        space?.networks?.map((item) => pick(item, ["network", "ss58Format"])) ||
          allNetworks,
      ),
    );
  }, [allNetworks, dispatch, space]);
  return (
    <Layout bgHeight="183px" networks={space.networks || allNetworks}>
      <Breadcrumb
        routes={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}` },
          { name: "Settings" },
        ]}
      />
      <PostSettings space={space} settings={settings} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { space: spaceId } = context.params;

  const [{ result: allNetworks }, { result: space }, { result: settings }] =
    await Promise.all([
      ssrNextApi.fetch("networks"),
      ssrNextApi.fetch(`spaces/${spaceId}`),
      ssrNextApi.fetch(`${spaceId}/proposals/settings`),
    ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      allNetworks,
      space: space ?? null,
      settings: settings ?? {},
    },
  };
}
