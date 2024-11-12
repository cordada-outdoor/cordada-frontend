import "./index.css";
import "./i18n";

import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { config } from "config";
import App from "./pages/App";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120 * 2 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {config.reactQuery.devTools && (
        <ReactQueryDevtools
          initialIsOpen={false}
          client={queryClient}
          position="right"
        />
      )}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);

reportWebVitals();
