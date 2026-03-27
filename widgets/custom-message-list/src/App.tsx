import { useState, useEffect, useMemo } from "react";
import type { WidgetSDK, WidgetProps } from "./types";
import { GainsightCommunityAPI } from "./apiConnector";
import { MessageList } from "./MessageList";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Stable API instance — recreated only if credentials change
  const api = useMemo(
    () =>
      new GainsightCommunityAPI({
        baseUrl: "https://api2-us-west-2.insided.com/",
        clientId: "ce9f904c-02bf-41a4-8706-19c24b9752d8",
        clientSecret: "61e3aed3d08d50709faa9e11da4856a8ac6d33b41d2a65af16c90c93d4b11f55",
      }),
    []
  );

  useEffect(() => sdk.on("propsChanged", setProps), [sdk]);

  useEffect(() => {
    setAuthenticated(false);
    setAuthError(null);
    api
      .authenticate()
      .then(() => setAuthenticated(true))
      .catch((err: unknown) => {
        console.error("Gainsight Community API auth failed:", err);
        setAuthError(err instanceof Error ? err.message : "Authentication failed.");
      });
  }, [api]);

  const updateProps = () => {
    const newTitle = prompt("Enter new title:", props.title as string);
    const newDescription = prompt("Enter new description:", props.description as string);
    setProps({ title: newTitle as string, description: newDescription as string });
  };

  return (
    <section className="react-widget-section">
      <h3 className="react-widget-title">{props.title}</h3>
      {props.description && (
        <p className="react-widget-description">{props.description}</p>
      )}
      <button onClick={updateProps}>Update Props</button>

      {authError ? (
        <p style={{ marginTop: "1rem", fontSize: "0.875rem", opacity: 0.9 }}>
          ⚠️ {authError}
        </p>
      ) : authenticated ? (
        <MessageList
          api={api}
          pageSize={8}
          title={props.title as string | undefined}
        />
      ) : (
        <p style={{ marginTop: "1rem", fontSize: "0.875rem", opacity: 0.75 }}>
          Connecting…
        </p>
      )}
    </section>
  );
}
