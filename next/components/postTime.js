import TimeDuration from "./duration";

export default function PostTime({ post }) {
  return (
    <div>
      {post.status === "pending" ? (
        <>
          Start&nbsp;
          <TimeDuration time={post.startDate} />
        </>
      ) : post.status === "active" ? (
        <>
          End&nbsp;
          <TimeDuration time={post.endDate} />
        </>
      ) : post.status === "closed" ? (
        <>
          Ended&nbsp;
          <TimeDuration time={post.endDate} />
        </>
      ) : post.status === "terminated" ? (
        <>
          Terminated&nbsp;
          <TimeDuration time={post.terminated} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
