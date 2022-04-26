import Tag from "@osn/common-ui/es/Tag";

const statusColors = {
  active: "purple",
  pending: "turquoise",
};

export default function StatusTag({ children }) {
  if (!children) return null;
  return (
    <Tag
      color={statusColors[children] || "gray"}
      style={{ textTransform: "capitalize" }}
    >
      {children}
    </Tag>
  );
}
