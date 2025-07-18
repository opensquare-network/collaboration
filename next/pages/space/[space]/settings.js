import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "frontedUtils/serverSideUtil";
import PostSettings from "components/postSettings";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { useEffect } from "react";
import { getSpaceNetwork } from "frontedUtils/space";
import pick from "lodash-es/pick";

export default function Settings({ space, settings }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setAvailableNetworks(
        getSpaceNetwork(space)?.map((item) =>
          pick(item, ["network", "ss58Format"]),
        ),
      ),
    );
  }, [dispatch, space]);

  return (
    <Layout bgHeight="183px" networks={getSpaceNetwork(space)}>
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

  const [{ result: space }, { result: settings }] = await Promise.all([
    ssrNextApi.fetch(`spaces/${spaceId}`),
    ssrNextApi.fetch(`${spaceId}/proposals/settings`),
  ]);

  if (!space) {
    to404(context);
  }

  return {
    props: {
      space: space ?? null,
      settings: settings ?? {},
    },
  };
}
