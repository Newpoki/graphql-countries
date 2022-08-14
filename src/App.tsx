import { ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import relayEnvironment from "./relay/relay-environment";
import { theme } from "./ui/theme";
import { CssBaseline } from "@mui/material";

const Countries = lazy(() => import("./countries"));
const Country = lazy(() => import("./country"));

const App = () => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Suspense fallback="loading...">
            <Routes>
              <Route path="/" element={<Countries />} />
              <Route path="/countries/:countryId" element={<Country />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </RelayEnvironmentProvider>
  );
};

export default App;
