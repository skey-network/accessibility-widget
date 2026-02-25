import type { Position } from "@utils/positioner";
import type { Brands } from "@src/types/global";
import type { Colors } from "@components/Widget/Widget";

export const FONT_SCALING = 0.3;
export const LINE_SCALING = 0.3;
export const CHAR_SCALING = 1.5;
export const MULTI_SELECT_COUNT = 3;
export const SINGLE_SELECT_COUNT = 2;
export const BORDER = `thick solid #ff0000ff`;

export const DEFAULT_POSITION: Position = {
  horizontalPos: "left",
  horizontal: "1em",
  verticalPos: "bottom",
  vertical: "2em",
  horizontalFlip: "auto",
  verticalFlip: "auto"
};

export const BRAND_INFO: { [K in Brands]: { icon: string; url: string; colors: Colors } } = {
  CARUMA: {
    icon: "https://caruma.io/images/brand/logo.svg",
    url: "https://caruma.io/",
    colors: {
      bg: "#F1EFED",
      fg: "#F5F5F5",
      font: "#282C3E",
      theme: "#0033FF"
    }
  },
  GO2NFT: {
    icon: "https://go2nft.io/images/page-logo.svg",
    url: "https://go2nft.io/",
    colors: {
      bg: "#FFFFFF",
      fg: "#f6f6f6",
      font: "#1b1a17",
      theme: "#ffa800"
    }
  },
  SKEY: {
    icon: "https://skey.network/images/skey-logo-basic.svg",
    url: "https://skey.network/",
    colors: {
      bg: "#FAFAFC",
      fg: "#F5F5F5",
      font: "#120E2F",
      theme: "#5C44EC"
    }
  }
};
