import { timeDuration } from "frontedUtils";
import { useEffect, useState } from "react";

export default function TimeDuration({ time }) {
  const [duration, setDuration] = useState("");
  useEffect(() => {
    setDuration(timeDuration(time));
  }, [time]);
  return duration;
}
