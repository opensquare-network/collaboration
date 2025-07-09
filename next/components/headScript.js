import { useEffect } from "react";

const HeadScript = ({ id, src, async = true, defer = true }) => {
  useEffect(() => {
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = async;
    script.defer = defer;

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [id, src, async, defer]);

  return null;
};

export default HeadScript;
