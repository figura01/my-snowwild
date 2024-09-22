import LayoutAdmin from "@/admin/components/LayoutAdmin";
import LayoutClient from "@/components/layout-elements/LayoutClient";
import { AuthProvider } from "@/contexts/authContext";
import { CartProvider } from "@/contexts/CartContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({ addTypename: false }),
  credentials: "include",
});

export default function App(
  { Component, pageProps, router }: AppProps
) {
  if (router.pathname.startsWith("/admin")) {
    return (
      <ApolloProvider client={client}>
        <AuthProvider>
          <LayoutAdmin>
            <Component {...pageProps} />
          </LayoutAdmin>
        </AuthProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <LayoutClient>
            <Component {...pageProps} />
          </LayoutClient>
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  )
};
