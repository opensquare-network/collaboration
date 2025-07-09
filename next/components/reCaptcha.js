import { useEffect } from "react";
import HeadScript from "./headScript";

export async function executeRecaptcha() {
  return await new Promise((resolve, reject) => {
    if (typeof window.grecaptcha === "undefined" || !window.grecaptcha.ready) {
      reject(new Error("ReCaptcha is not ready"));
      return;
    }

    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY, {
          action: "submit",
        })
        .then(function (token) {
          resolve(token);
        })
        .catch((error) => {
          console.error("ReCaptcha execution failed:", error);
          reject(error);
        });
    });
  });
}

export function ReCaptcha() {
  useEffect(() => {
    return () => {
      // Remove UI elements created by reCAPTCHA
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge && badge.parentNode) {
        badge.parentNode.removeChild(badge);
      }
      window.grecaptcha = undefined;
    };
  }, []);

  return (
    <HeadScript
      id="recaptcha-script"
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}`}
      async
      defer
    />
  );
}
