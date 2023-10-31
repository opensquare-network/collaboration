import { Breadcrumb as OsnBreadcrumb } from "@osn/common-ui";
import Link from "next/link";

export default function Breadcrumb({ routes }) {
  const backLink = routes[routes.length - 2].link || "/";

  return (
    <OsnBreadcrumb
      backButtonRender={(button) => (
        <Link href={backLink} passHref legacyBehavior>
          {button}
        </Link>
      )}
      routes={routes}
      itemRender={(route, _routeIndex, _routes, isLast) =>
        isLast ? (
          <span>{route.name}</span>
        ) : (
          <Link href={route.link} passHref legacyBehavior>
            {route.name}
          </Link>
        )
      }
    />
  );
}
