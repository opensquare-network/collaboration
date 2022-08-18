import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import nextApi from "services/nextApi";
import debounce from "lodash.debounce";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  });
}

export function useIsMounted() {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

export function useIsMountedBool() {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}

export function useSpace() {
  const router = useRouter();
  const { space } = router.query;
  return space;
}

export function useViewfunc() {
  const [viewFunc, setViewFunc] = useState();
  useEffect(() => {
    import("frontedUtils/viewfunc").then((viewFunc) => {
      setViewFunc(viewFunc);
    });
  }, []);
  return viewFunc;
}

export function useNetwork() {
  const [network, setNetwork] = useState();
  const space = useSpace();
  useEffect(() => {
    nextApi.fetch(`spaces/${space}`).then((response) => {
      if (response?.result?.network) {
        setNetwork(response.result);
      }
    });
  }, [space]);
  return network;
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useOffset(ref) {
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setOffset({ left: rect.left, top: rect.top });
      }
    };
    window.addEventListener("scroll", debounce(updatePosition, 100));
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [ref]);
  return offset;
}
