import { timeDuration } from "frontedUtils";

export default function PostTime({ post }) {
  return (
    <div>{
      post.status === "pending"
      ? "Starting " + timeDuration(post.startDate)
      : post.status === "active"
      ? "Ending " + timeDuration(post.endDate)
      : post.status === "closed"
      ? "Ended " + timeDuration(post.endDate)
      : ""
    }</div>
  );
}
