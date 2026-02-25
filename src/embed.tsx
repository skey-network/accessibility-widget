import Widget, { type WidgetProps } from "@components/Widget/Widget";
import { createRoot } from "react-dom/client";

declare global {
  interface Window {
    AccessibilityButton?: {
      mount: (el: HTMLElement, props: WidgetProps) => void;
    };
  }
}

function mount(el: HTMLElement, props: WidgetProps) {
  const root = createRoot(el);
  root.render(<Widget {...props} />);
}

window.AccessibilityButton = { mount };
