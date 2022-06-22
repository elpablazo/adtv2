import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from "next/app";
import Header from "$components/layout/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
