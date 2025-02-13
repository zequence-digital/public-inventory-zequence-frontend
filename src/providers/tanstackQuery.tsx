// In Next.js, this file would be called: app/providers.jsx
"use client";

import { googleClientId } from "@/utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

// In Next.js, this file would be called: app/providers.jsx

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function TanstackQueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  //  write the full implementation of gapi here

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = () => {
      // This function is called after the script is loaded
      // You can now use gapi
      gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId: googleClientId,
          scope: "",
        });
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GoogleOAuthProvider clientId={`${googleClientId}`}>
        <ToastContainer />
        {children}
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
