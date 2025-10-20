import { useEffect, useState } from "react";
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

export const useJumpToAnchor = () => {
  const router = useRouter();
  const anchorId = router.query.anchor;
  const [isMounted, setIsMounted] = useState();
  useMount(() => setIsMounted(true));

  useEffect(() => {
    if (anchorId && isMounted) {
      setTimeout(() => {
        jumpToAnchor(anchorId);
      }, 500);
    }
  }, [anchorId, isMounted]);
};

export const useActiveAnchor = (anchor) => {
  const router = useRouter();
  const anchorId = router.query.anchor;

  return {
    id: anchor,
    active: anchor === anchorId,
  };
};
