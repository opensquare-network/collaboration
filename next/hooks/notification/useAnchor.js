import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useMount } from "react-use";

function jumpToAnchor(anchorId) {
  const anchorElement = document.getElementById(anchorId);
  if (!anchorElement) {
    return;
  }
  const bodyRect = document.body.getBoundingClientRect();
  const elementRect = anchorElement.getBoundingClientRect();
  const offset = elementRect.top - bodyRect.top;
  const scrollPosition = offset - window.innerHeight / 2;
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth",
  });
}

export const useAnchor = () => {
  const router = useRouter();
  const anchorId = useMemo(() => {
    return router.asPath.split("#")[1];
  }, [router.asPath]);

  return anchorId;
};

export const useJumpToAnchor = () => {
  const [isMounted, setIsMounted] = useState();
  useMount(() => setIsMounted(true));
  const anchorId = useAnchor();
  useEffect(() => {
    if (anchorId && isMounted) {
      setTimeout(() => {
        jumpToAnchor(anchorId);
      }, 500);
    }
  }, [anchorId, isMounted]);
};

export const useActiveAnchor = (anchor) => {
  const [id, setId] = useState("");
  const anchorId = useAnchor();

  useEffect(() => {
    setTimeout(() => {
      setId(anchor);
    }, 200);
  }, [anchor]);

  return {
    id,
    active: id === anchorId,
  };
};
