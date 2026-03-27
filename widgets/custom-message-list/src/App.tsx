import { useState, useEffect } from "react";
import type { WidgetSDK, WidgetProps } from "./types";
import { GainsightCommunityAPI } from "./apiConnector";

export function App({ sdk }: { sdk: WidgetSDK }) {
  
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());
  const [authenticated, setAuthenticated] = useState(false);
  const api = new GainsightCommunityAPI({
    baseUrl: "https://api2-us-west-2.insided.com/",
    clientId: "ce9f904c-02bf-41a4-8706-19c24b9752d8",
    clientSecret: "61e3aed3d08d50709faa9e11da4856a8ac6d33b41d2a65af16c90c93d4b11f55",
  });

  useEffect(() => sdk.on("propsChanged", setProps), [sdk]);
  useEffect(() => {
    api.authenticate().then(() => {
      console.log("Authenticated with Gainsight Community API");
      setAuthenticated(true);
      // You can now make API calls using the `api` instance
    }).catch((error) => {
      console.error("Failed to authenticate with Gainsight Community API:", error);
    });  
  }, [api]);

  const updateProps = () => {
    const newTitle = prompt("Enter new title:", props.title as string);
    const newDescription = prompt("Enter new description:", props.description as string);
    setProps({title: newTitle as string, description: newDescription as string}); // Update local state immediately for better UX
    // sdk.emit("updateProps", { title: newTitle, description: newDescription });
  };

  return (
    <section className="react-widget-section">
      <h3 className="react-widget-title">{props.title}</h3>
      {props.description && (
        <p className="react-widget-description">{props.description}</p>
      )}
      <button onClick={updateProps}>Update Props</button>
      {authenticated ? (
        <p>Authenticated with Gainsight Community API. You can now make API calls.</p>
      ) : (
        <p>Authenticating with Gainsight Community API...</p>
      )}
    </section>
  );
}
