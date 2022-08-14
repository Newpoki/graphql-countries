import "./App.css";
import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from "react-relay/hooks";
import relayEnvironment from "./relay-environment";
import { Countries } from "./countries";

const App = () => {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Countries />
    </RelayEnvironmentProvider>
  );
};

export default App;
