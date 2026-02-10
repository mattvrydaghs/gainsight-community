import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

function renderWidget(container: HTMLElement) {
    console.log("Rendering React Tile Navigation Widget...");
  if (container.hasAttribute("react-nav-widget-initialized")) return;
  container.setAttribute("react-nav-widget-initialized", "true");

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

class ReactNavWidgetElement extends HTMLElement {
  connectedCallback() {
    renderWidget(this);
  }
}

if (!customElements.get("react-nav-widget")) {
  console.log("Defining custom element for React Tile Navigation Widget...");
  customElements.define("react-nav-widget", ReactNavWidgetElement);
}
