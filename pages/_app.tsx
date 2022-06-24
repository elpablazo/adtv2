import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import Header from "$components/layout/Header";
import Context from "$components/context/Context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Header />
      <Component {...pageProps} />
    </Context>
  );
}

export default MyApp;
