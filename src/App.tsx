import { Widget } from "@components/Widget";

import "./App.scss";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import classNames from "classnames";

export function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>
            <a href="/">Placeholder Site</a>
          </h1>
          <nav>
            <a href="/welcome">Welcome</a>
            <a href="/features">Features</a>
            <a href="/gallery">Gallery</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Welcome to the Placeholder Site</h1>
            <p>Your one-stop demo site with random images and sections</p>
            <a href="/welcome" className="cta">
              Get Started
            </a>
          </div>
        </section>

        <Placeholder style={{ width: "100%", height: "50px" }} />

        <Section title="Welcome" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." imgId={881} />
        <Section
          title="Features"
          text="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices."
          imgId={866}
          reverse
        />
        <Section title="Gallery" text="Aliquam erat volutpat. Praesent tincidunt arcu in neque." imgId={908} />
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2025 Placeholder Site. <b>All rights reserved.</b>
          </p>
        </div>
      </footer>
      <Widget
        paths={["/", "gallery"]}
        brand="SKEY"
        customPosition={{
          horizontal: "1em",
          horizontalPos: "right",
          vertical: "5em",
          verticalPos: "bottom",
          verticalFlip: true
        }}
      />
    </div>
  );
}

const Section = ({
  title,
  text,
  imgId,
  reverse
}: {
  title: string;
  text: string;
  imgId: number;
  reverse?: boolean;
}) => (
  <section className={`section ${reverse ? "reverse" : ""}`}>
    <div className="container">
      <div className="text">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="image">
        <img src={`https://picsum.photos/id/${imgId}/600/400.webp`} alt={title} />
      </div>
    </div>
  </section>
);

const Placeholder = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const mainClass = classNames("loader", props.className);
  return (
    <div {...props} className={mainClass}>
      <div className="moving" />
    </div>
  );
};
