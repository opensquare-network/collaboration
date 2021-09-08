import Head from "next/head";
import { Provider } from "react-redux";

import { store } from "../store";
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Opensquare - voting</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
