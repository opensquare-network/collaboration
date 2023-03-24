import { ssrNextApi } from "../../services/nextApi";

export default function proposal() {
  return null;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { result: detail } = await ssrNextApi.fetch(`proposal/${id}`);

  if (!detail) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }

  return {
    redirect: {
      permanent: true,
      destination: `/space/${detail.space}/proposal/${detail.cid}`,
    },
  };
}
