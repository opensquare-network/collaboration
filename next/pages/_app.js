import App from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import NProgress from "nprogress";
import Router from "next/router";

import "nprogress/nprogress.css";
import { store } from "../store";
import "../styles/globals.css";
import "react-mde/lib/styles/css/react-mde-all.css";
import "@osn/common-ui/styles/index.css";
import "@osn/previewer/styles.css";
import { cn } from "@osn/common-ui";
import { Inter, Montserrat } from "next/font/google";
import { ConfigProvider } from "@osn/common-ui";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on(
  "routeChangeStart",
  (url, { shallow }) => !shallow && NProgress.start(),
);
Router.events.on(
  "routeChangeComplete",
  (url, { shallow }) => !shallow && NProgress.done(),
);
Router.events.on(
  "routeChangeError",
  (url, { shallow }) => !shallow && NProgress.done(),
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function MyApp({ Component, pageProps, themeMode }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>

      <Provider store={store}>
        <ConfigProvider themeMode={themeMode}>
          <Head>
            <title>OpenSquare Network Off-chain Voting</title>
            <meta
              name="viewport"
              content="width=device-width, user-scalable=no"
            />
          </Head>
          <main
            className={cn(inter.className, inter.variable, montserrat.variable)}
          >
            <Component {...pageProps} />
          </main>
        </ConfigProvider>
      </Provider>
    </>
  );
}

// https://nextjs.org/docs/pages/building-your-application/routing/custom-app#getinitialprops-with-app
MyApp.getInitialProps = async (context) => {
  const ctx = await App.getInitialProps(context);

  const themeMode = context.ctx.req?.cookies?.["theme-mode"];

  return {
    ...ctx,
    themeMode,
  };
};

export default MyApp;
