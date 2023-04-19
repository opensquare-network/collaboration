import { useEffect, useState } from "react";

export default function useStateChanged(value) {
  const [state, setState] = useState(value);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (state !== value) {
      setState(value);
      setChanged(true);
    } else {
      setChanged(false);
    }
  });

  return changed;
}
