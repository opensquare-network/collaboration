import Layout from "components/layout";
import Nav from "components/nav";
import PostCreate from "@/components/postCreate";
import { useNode } from "utils/hooks";
import { SPACE_ITEMS } from "utils/constants";

export default function Create() {
  const node = useNode();
  const item = SPACE_ITEMS.find((item) => item.value === node);

  return (
    <Layout bgHeight="183px">
      {item && (
        <Nav
          data={[
            { name: "Space", link: "/" },
            { name: item?.name, link: `/space/${item?.value}`, back: true },
            { name: "New Post" },
          ]}
        />
      )}
      <PostCreate />
    </Layout>
  );
}
