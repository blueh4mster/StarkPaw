import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
