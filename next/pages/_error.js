import { reportClientError } from "services/reportClientError";
import { IS_PRODUCTION } from "frontedUtils/constants";
import ErrorContent from "@/components/errorContent";

function getErrorReason(statusCode) {
  const reasons = {
    500: {
      title: "500",
      subTitle: "Internal Server Error",
      description:
        "The server encountered an internal error or misconfiguration and was unable to complete your request.",
    },
  };

  return (
    reasons[statusCode] || {
      title: "Sorry",
      subTitle: "Application Error",
      description:
        "A client-side exception has occurred (see the browser console for more information).",
    }
  );
}

function ErrorPage({ statusCode }) {
  const { title, subTitle, description } = getErrorReason(statusCode);

  return (
    <ErrorContent title={title} subTitle={subTitle} description={description} />
  );
}

ErrorPage.getInitialProps = async ({ req, res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || "";

  const isServerError = !!req;

  let errorData = {
    url: req?.url || window?.location?.href,
    code: statusCode,
    source: isServerError ? "server" : "client",
    userAgent: isServerError ? "" : window?.navigator?.userAgent,
    error: err.message,
    stack: err.stack,
  };
  IS_PRODUCTION && reportClientError(errorData);

  return {
    err,
    errorData,
    statusCode,
  };
};

export default ErrorPage;
