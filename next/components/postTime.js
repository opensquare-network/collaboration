import { timeDuration } from "frontedUtils";

export default function PostTime({ post }) {
  return (
    <div>
      {post.status === "pending"
        ? "Start " + timeDuration(post.startDate)
        : post.status === "active"
        ? "End " + timeDuration(post.endDate)
        : post.status === "closed"
        ? "Ended " + timeDuration(post.endDate)
        : post.status === "terminated"
        ? "Terminated " + timeDuration(post.terminated.terminatedAt)
        : ""}
    </div>
  );
}
