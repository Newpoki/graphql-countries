import { useState, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { graphql } from "relay-runtime";
import { RelayEnvironmentProvider, loadQuery, usePreloadedQuery } from "react-relay/hooks";
import relayEnvironment from "./relay-environment";
import { Countries } from "./countries";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Suspense fallback="Loading...">
        <Countries />
        <div className="App">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </div>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default App;
