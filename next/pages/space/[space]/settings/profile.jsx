import { ssrNextApi } from "services/nextApi";
import { to404 } from "frontedUtils/serverSideUtil";
import { useDispatch } from "react-redux";
import { setAvailableNetworks } from "store/reducers/accountSlice";
import { useEffect } from "react";
import { getSpaceNetwork } from "frontedUtils/space";
import pick from "lodash-es/pick";
import SettingLayout from "@/components/postSettings/settingLayout";
import SpaceProfile from "@/components/postSettings/spaceProfile";

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
    <SettingLayout space={space} activeTab="profile">
      <SpaceProfile space={space} settings={settings} />
    </SettingLayout>
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
