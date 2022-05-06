import Layout from "components/layout";
import Breadcrumb from "components/breadcrumb";
import PostCreate from "@/components/postCreate";
import { ssrNextApi } from "services/nextApi";
import { to404 } from "../../../frontedUtils/serverSideUtil";
import { initAccount } from "../../../store/reducers/accountSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Create({ space }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAccount());
  }, [dispatch]);

  return (
    <Layout bgHeight="183px" space={space}>
      <Breadcrumb
        routes={[
          { name: "Home", link: "/" },
          { name: space?.name, link: `/space/${space?.id}` },
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
