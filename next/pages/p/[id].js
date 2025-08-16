import { ssrNextApi } from "../../services/nextApi";

export default function Proposal() {
  return null;
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const { result: detail } = await ssrNextApi.fetch(`proposal/${id}`);

    if (!detail.space || !detail.cid) {
      return {
        notFound: true,
      };
    }

    const { result: space } = await ssrNextApi.fetch(`spaces/${detail.space}`);

    if (!space) {
      return {
        notFound: true,
      };
    }

    return {
      redirect: {
        permanent: true,
        destination: `/space/${detail.space}/proposal/${detail.cid}`,
      },
    };
  } catch (error) {
    console.error("Error searching for proposal:", error);

    return {
      notFound: true,
    };
  }
}
