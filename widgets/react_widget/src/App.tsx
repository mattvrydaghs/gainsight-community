import { useState, useEffect } from "react";
import type { WidgetSDK, WidgetProps } from "./types";

export function App({ sdk }: { sdk: WidgetSDK }) {
  const [props, setProps] = useState<WidgetProps>(sdk.getProps());

  useEffect(() => sdk.on("propsChanged", setProps), [sdk]);

  return (
    <section className="react-widget-section">
      <h3 className="react-widget-title">{props.title}</h3>
      <h3 className="react-widget-title">{props.custom_title}</h3>
      {props.subtitle && (
        <h4 className="react-widget-subtitle">{props.subtitle}</h4>
      )}
      {props.custom_description && (
        <p className="react-widget-description">{props.custom_description}</p>
      )}
    </section>
  );
}
