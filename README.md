## Getting started

Accessibility widet for react apps. See props section for widget configuration. Install with:

```sh
npm install --save @skeynetwork/accessibility-widget
```

Example usage:

```tsx
import "@skeynetwork/accessibility-widget/css";
import { Widget } from "@skeynetwork/accessibility-widget";

const App = () => {
  return (
    <div className="app">
      <Widget />
    </div>
  );
};
```

## Development

### Available scripts

- `dev` - Start vite development environment
- `build:lib` - Build widget ready for react sites
- `build:embed` - Build widget ready for static sites
- `prepare` - Run `husky` command

### How to run widget in dev mode

1. Set correct node version

```
nvm i
```

2. Install dependencies

```bash
yarn
```

3. Run dev build

```bash
yarn run dev
```

### Building for react pages

1. Set react and react-dom versions to match your project's versions

2. Run build command

```bash
yarn run build:lib
```

You should see this in `dist/lib/`

```
./dist/lib/
├── accessibility.cjs.js
├── accessibility.es.d.ts
├── accessibility.es.js
└── accessibility-widget.css
```

3. Copy `dist/lib/` directory into your project's `src/` and rename it to your liking

4. Import `Widget` and use it!

```tsx
import "src/accessibility/accessibility.css";
import { Widget } from "src/accessibility/accessibility.es";

const App = () => {
  return (
    <div className="app">
      <Widget />
    </div>
  );
};
```

### Building for static pages

1. Run build command

```bash
yarn run build:embed
```

You should see this in `dist/embed/`

```
./dist/embed/
├── accessibility-embed.js
└── accessibility-widget.css
```

2. Copy content of `dist/embed/` into your page location
3. Initalize component

```html
<div class="accessibility"></div>

<script src="accessibility-embed.js"></script>
<script>
  window.addEventListener("DOMContentLoaded", () => {
    window.AccessibilityButton.mount(document.querySelector(".accessibility"), {});
  });
</script>
```

### Props

1. Button props are following this scheme

```tsx
{
  colors?: {
    bg?: string;
    fg?: string;
    theme?: string;
    font?: string;
  };
  brand?: "CARUMA" | "GO2NFT" | "SKEY";
  paths?: string[];
  customPosition?: {
    horizontalPos: "left" | "right";
    verticalPos: "top" | "bottom";
    horizontal: string;
    vertical: string;
    horizontalFlip?: "auto" | boolean;
    verticalFlip?: "auto" | boolean;
  }
}
```

Default params:

```tsx
{
  colors: {
    // Default colors are based on brand
    bg: "#F1EFED";
    fg: "#F5F5F5";
    theme: "#0033FF";
    font: "#282C3E";
  }
  brand: "CARUMA";
  paths: ["*"];
  customPosition: {
    horizontalPos: "left";
    verticalPos: "bottom";
    horizontal: "1em";
    vertical: "2em";
    horizontalFlip: "auto";
    verticalFlip: "auto";
  }
}
```

Paths param accept any of theese formats:

```
/path/
/path
path/
path
```

They will all work for pages like:

```
http://example.com/path
http://example.com/foo/path
```

If you only want this to work for pages like in example 1:

```
:/path/
:/path
```
